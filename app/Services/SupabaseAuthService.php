<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class SupabaseAuthService
{
    protected Client $client;
    protected string $baseUrl;
    protected string $anonKey;
    protected string $serviceKey;

    public function __construct()
    {
        $this->baseUrl = config('services.supabase.url');
        $this->anonKey = config('services.supabase.anon_key');
        $this->serviceKey = config('services.supabase.service_key');

        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'headers' => [
                'apikey' => $this->anonKey,
                'Authorization' => 'Bearer ' . $this->anonKey,
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    /**
     * Sign up a new user
     */
    public function signUp(string $email, string $password, array $metadata = []): array
    {
        try {
            $response = $this->client->post('/auth/v1/signup', [
                'json' => [
                    'email' => $email,
                    'password' => $password,
                    'data' => $metadata,
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            Log::error('Supabase signup error', [
                'email' => $email,
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);

            throw $e;
        }
    }

    /**
     * Sign in a user
     */
    public function signIn(string $email, string $password): array
    {
        try {
            $response = $this->client->post('/auth/v1/token?grant_type=password', [
                'json' => [
                    'email' => $email,
                    'password' => $password,
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            Log::error('Supabase signin error', [
                'email' => $email,
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);

            throw $e;
        }
    }

    /**
     * Sign out a user
     */
    public function signOut(string $accessToken): bool
    {
        try {
            $this->client->post('/auth/v1/logout', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken,
                ],
            ]);

            return true;
        } catch (RequestException $e) {
            Log::error('Supabase signout error', [
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);

            return false;
        }
    }

    /**
     * Get user profile
     */
    public function getUser(string $accessToken): array
    {
        try {
            $response = $this->client->get('/auth/v1/user', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken,
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            Log::error('Supabase get user error', [
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);

            throw $e;
        }
    }

    /**
     * Refresh access token
     */
    public function refreshToken(string $refreshToken): array
    {
        try {
            $response = $this->client->post('/auth/v1/token?grant_type=refresh_token', [
                'json' => [
                    'refresh_token' => $refreshToken,
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            Log::error('Supabase refresh token error', [
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);

            throw $e;
        }
    }

    /**
     * Reset password
     */
    public function resetPassword(string $email): bool
    {
        try {
            $this->client->post('/auth/v1/recover', [
                'json' => [
                    'email' => $email,
                ],
            ]);

            return true;
        } catch (RequestException $e) {
            Log::error('Supabase reset password error', [
                'email' => $email,
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);

            return false;
        }
    }

    /**
     * Change password
     */
    public function changePassword(string $accessToken, string $newPassword): array
    {
        try {
            $response = $this->client->put('/auth/v1/user', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken,
                ],
                'json' => [
                    'password' => $newPassword,
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            Log::error('Supabase change password error', [
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);

            throw $e;
        }
    }
}