<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\JWK;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SupabaseAuth
{
    public function handle(Request $request, Closure $next)
    {
        $header = $request->header('Authorization');

        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token = str_replace('Bearer ', '', $header);

        try {
            $jwks = json_decode(
                file_get_contents(config('services.supabase.url') . '/auth/v1/.well-known/jwks.json'),
                true
            );

            $decoded = JWT::decode($token, JWK::parseKeySet($jwks));

            // Find or create user from Supabase data
            $user = User::findOrCreateFromSupabase((array) $decoded);

            // Authenticate the user in Laravel
            Auth::login($user);

            // Attach user to request
            $request->attributes->set('supabase_user', $decoded);

        } catch (\Throwable $e) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        return $next($request);
    }
}
