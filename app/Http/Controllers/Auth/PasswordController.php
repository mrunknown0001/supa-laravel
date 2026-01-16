<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\SupabaseAuthService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validateWithBag('updatePassword', [
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $accessToken = Session::get('supabase_access_token');

        if (!$accessToken) {
            return back()->withErrors(['password' => 'Authentication token not found. Please log in again.']);
        }

        try {
            $supabaseAuth = app(SupabaseAuthService::class);
            $supabaseAuth->changePassword($accessToken, $validated['password']);

            // Update the local user password as well for consistency
            $request->user()->update([
                'password' => bcrypt($validated['password']),
            ]);

            return back()->with('status', 'password-updated');
        } catch (\Exception $e) {
            return back()->withErrors(['password' => 'Failed to update password. Please try again.']);
        }
    }
}
