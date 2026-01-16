<?php

namespace App\Livewire\Auth;

use App\Services\SupabaseAuthService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Livewire\Component;

class Login extends Component
{
    public string $email = '';
    public string $password = '';
    public bool $remember = false;
    public bool $loading = false;

    protected $rules = [
        'email' => 'required|email',
        'password' => 'required|string|min:8',
    ];

    public function login()
    {
        $this->validate();

        $this->loading = true;

        try {
            $supabaseAuth = app(SupabaseAuthService::class);
            $result = $supabaseAuth->signIn($this->email, $this->password);

            // Store tokens in session
            Session::put('supabase_access_token', $result['access_token']);
            Session::put('supabase_refresh_token', $result['refresh_token']);

            // Find or create user
            $user = \App\Models\User::where('supabase_id', $result['user']['id'])->first();

            if (!$user) {
                $user = \App\Models\User::create([
                    'name' => $result['user']['user_metadata']['name'] ?? $this->email,
                    'email' => $this->email,
                    'supabase_id' => $result['user']['id'],
                    'password' => bcrypt($this->password), // Store password for Laravel auth
                ]);
            }

            Auth::login($user, $this->remember);

            return redirect()->intended(route('dashboard', absolute: false));

        } catch (\Exception $e) {
            $this->addError('login', 'Invalid credentials');
        } finally {
            $this->loading = false;
        }
    }

    public function render()
    {
        return view('livewire.auth.login')->layout('layouts.guest');
    }
}