<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SupabaseService
{
    protected Client $client;
    protected string $baseUrl;
    protected string $anonKey;
    protected int $cacheTtl = 3600; // 1 hour

    public function __construct()
    {
        $this->baseUrl = config('services.supabase.url');
        $this->anonKey = config('services.supabase.anon_key');

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
     * Get all settings records with caching
     */
    public function getSettings(): array
    {
        Log::info('Fetching settings from Supabase');
        return Cache::remember('supabase_settings', $this->cacheTtl, function () {
            try {
                $response = $this->client->get('/rest/v1/settings');
                $data = json_decode($response->getBody()->getContents(), true);
                Log::info('Supabase get settings response', ['data' => $data]);
                return $data ?? [];
            } catch (RequestException $e) {
                Log::error('Supabase get settings error', [
                    'error' => $e->getMessage(),
                    'response' => $e->getResponse()?->getBody()->getContents(),
                ]);
                return []; // Return empty array instead of throwing
            }
        }) ?? [];
    }

    /**
     * Get a specific setting by key with caching
     */
    public function getSetting(string $key): ?string
    {
        $settings = $this->getSettings();

        // If settings is empty, return null
        if (empty($settings)) {
            return null;
        }

        // Get the first (and likely only) settings record
        $settingRecord = $settings[0];

        // Return the value directly from the column
        return $settingRecord[$key] ?? null;
    }

    /**
     * Get company name from settings
     */
    public function getCompanyName(): string
    {
        return $this->getSetting('company_name') ?? config('app.name', 'Laravel');
    }

    /**
     * Get website name from settings
     */
    public function getWebsiteName(): string
    {
        return $this->getSetting('website_name') ?? config('app.name', 'Laravel');
    }

    /**
     * Get logo URL from settings
     */
    public function getLogoUrl(): ?string
    {
        return $this->getSetting('logo_url');
    }

    /**
     * Get favicon URL from settings
     */
    public function getFaviconUrl(): ?string
    {
        return $this->getSetting('favicon_url');
    }

    /**
     * Clear settings cache
     */
    public function clearSettingsCache(): void
    {
        Cache::forget('supabase_settings');
    }

    /**
     * Get settings with filters (bypasses cache)
     */
    public function getSettingsWithFilters(array $filters): array
    {
        try {
            $queryParams = http_build_query($filters);
            $response = $this->client->get("/rest/v1/settings?{$queryParams}");
            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            Log::error('Supabase get settings with filters error', [
                'filters' => $filters,
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);
            throw $e;
        }
    }

    /**
     * Get user profile from profiles table
     */
    public function getUserProfile(string $userId): ?array
    {
        try {
            $response = $this->client->get("/rest/v1/profiles?id=eq.{$userId}");
            $data = json_decode($response->getBody()->getContents(), true);
            return $data[0] ?? null;
        } catch (RequestException $e) {
            Log::error('Supabase get user profile error', [
                'user_id' => $userId,
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);
            return null;
        }
    }

    /**
     * Update user profile in profiles table
     */
    public function updateUserProfile(string $userId, array $profileData): bool
    {
        try {
            $response = $this->client->patch("/rest/v1/profiles?id=eq.{$userId}", [
                'json' => $profileData,
            ]);
            return $response->getStatusCode() === 204;
        } catch (RequestException $e) {
            Log::error('Supabase update user profile error', [
                'user_id' => $userId,
                'profile_data' => $profileData,
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);
            return false;
        }
    }

    /**
     * Create user profile in profiles table
     */
    public function createUserProfile(array $profileData): bool
    {
        try {
            $response = $this->client->post('/rest/v1/profiles', [
                'json' => $profileData,
            ]);
            return $response->getStatusCode() === 201;
        } catch (RequestException $e) {
            Log::error('Supabase create user profile error', [
                'profile_data' => $profileData,
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);
            return false;
        }
    }

    /**
     * Get worker balance from worker_balances table
     */
    public function getWorkerBalance(string $workerId): ?array
    {
        try {
            $response = $this->client->get("/rest/v1/worker_balances?worker_id=eq.{$workerId}");
            $data = json_decode($response->getBody()->getContents(), true);
            return $data[0] ?? null;
        } catch (RequestException $e) {
            Log::error('Supabase get worker balance error', [
                'worker_id' => $workerId,
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);
            return null;
        }
    }

    /**
     * Get payout requests for a worker
     */
    public function getPayoutRequests(string $workerId): array
    {
        try {
            $response = $this->client->get("/rest/v1/payout_requests?worker_id=eq.{$workerId}&order=requested_at.desc");
            $data = json_decode($response->getBody()->getContents(), true);
            return $data ?? [];
        } catch (RequestException $e) {
            Log::error('Supabase get payout requests error', [
                'worker_id' => $workerId,
                'error' => $e->getMessage(),
                'response' => $e->getResponse()?->getBody()->getContents(),
            ]);
            return [];
        }
    }
}