<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\SupabaseAuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function create()
    {
        \Log::info('LoginController create called');
        \Log::info('User authenticated: ' . (auth()->check() ? 'yes' : 'no'));
        \Log::info('Rendering Auth/Login with Inertia');
        return Inertia::render('Auth/Login', []);
    }

    public function store(LoginRequest $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        try {
            $supabaseAuth = app(SupabaseAuthService::class);
            $result = $supabaseAuth->signIn($request->email, $request->password);

            // Store tokens in session
            Session::put('supabase_access_token', $result['access_token']);
            Session::put('supabase_refresh_token', $result['refresh_token']);

            // Find or create user
            $user = \App\Models\User::where('supabase_id', $result['user']['id'])->first();

            if (!$user) {
                $user = \App\Models\User::create([
                    'name' => $result['user']['user_metadata']['name'] ?? $request->email,
                    'email' => $request->email,
                    'supabase_id' => $result['user']['id'],
                    'password' => bcrypt($request->password), // Store password for Laravel auth
                ]);
            }

            // Load profile to get role
            $user->loadProfileFromSupabase();

            Auth::login($user, $request->boolean('remember'));

            // Redirect based on role
            if ($user->role === 'admin') {
                return redirect()->intended(route('admin.dashboard', absolute: false));
            } else {
                return redirect()->intended(route('dashboard', absolute: false));
            }

        } catch (\Exception $e) {
            return back()->withErrors([
                'email' => 'Invalid credentials',
            ]);
        }
    }
}