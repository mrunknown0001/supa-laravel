<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SupabaseAuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    protected SupabaseAuthService $supabaseAuth;

    public function __construct(SupabaseAuthService $supabaseAuth)
    {
        $this->supabaseAuth = $supabaseAuth;
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        try {
            $result = $this->supabaseAuth->signIn(
                $request->email,
                $request->password
            );

            return response()->json([
                'message' => 'Login successful',
                'data' => $result,
            ]);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials'],
            ]);
        }
    }

    /**
     * Register user
     */
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'name' => 'required|string|max:255',
        ]);

        try {
            $result = $this->supabaseAuth->signUp(
                $request->email,
                $request->password,
                ['name' => $request->name]
            );

            return response()->json([
                'message' => 'Registration successful',
                'data' => $result,
            ], 201);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'email' => ['Registration failed'],
            ]);
        }
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $token = $request->bearerToken();

        if ($token) {
            $this->supabaseAuth->signOut($token);
        }

        Auth::logout();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }

    /**
     * Refresh token
     */
    public function refresh(Request $request)
    {
        $request->validate([
            'refresh_token' => 'required|string',
        ]);

        try {
            $result = $this->supabaseAuth->refreshToken($request->refresh_token);

            return response()->json([
                'message' => 'Token refreshed',
                'data' => $result,
            ]);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'refresh_token' => ['Invalid refresh token'],
            ]);
        }
    }

    /**
     * Forgot password
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $success = $this->supabaseAuth->resetPassword($request->email);

        if ($success) {
            return response()->json([
                'message' => 'Password reset email sent',
            ]);
        }

        return response()->json([
            'message' => 'Failed to send password reset email',
        ], 500);
    }
}