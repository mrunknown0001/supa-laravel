<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSettingsController extends Controller
{
    public function index()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $supabase = app(SupabaseService::class);
        $settings = $supabase->getSettings();
        
        // Get the first settings record (should only be one)
        $settingsData = $settings[0] ?? [];

        // Get chat manager settings
        $chatSettings = $supabase->getChatManagerSettings();

        // Get KYC statistics
        $kycStats = $supabase->getKycStatistics();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settingsData,
            'chatSettings' => $chatSettings,
            'kycStats' => $kycStats
        ]);
    }

    public function update(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        // Validate the request
        $validated = $request->validate([
            // General
            'company_name' => 'nullable|string|max:255',
            'website_name' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:255',
            'company_legal_form' => 'nullable|string|max:255',
            'primary_color' => 'nullable|string|max:7',
            'accent_color' => 'nullable|string|max:7',
            
            // Contact
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'support_email' => 'nullable|email|max:255',
            'support_phone' => 'nullable|string|max:50',
            'privacy_contact_email' => 'nullable|email|max:255',
            'data_protection_officer' => 'nullable|string|max:255',
            
            // Legal
            'registration_number' => 'nullable|string|max:255',
            'euid' => 'nullable|string|max:255',
            'court_location' => 'nullable|string|max:255',
            'managing_director' => 'nullable|string|max:255',
            'responsible_person' => 'nullable|string|max:255',
            'company_address' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            
            // Files
            'logo' => 'nullable|image|max:2048',
            'favicon' => 'nullable|image|max:1024',
            
            // KYC
            'kyc_required_for_tasks' => 'boolean',
            'kyc_requirement_message' => 'nullable|string',
            
            // Email
            'email_delay_enabled' => 'boolean',
            'email_delay_hours' => 'nullable|integer|min:1|max:72',
            
            // Chat
            'chat_enabled' => 'boolean',
            'manager_name' => 'nullable|string|max:255',
            'manager_title' => 'nullable|string|max:255',
            'manager_bio' => 'nullable|string',
            'manager_avatar_url' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        $supabase = app(SupabaseService::class);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $logoUrl = $this->uploadToSupabase($request->file('logo'), 'logo');
            if ($logoUrl) {
                $validated['logo_url'] = $logoUrl;
            }
        }

        // Handle favicon upload
        if ($request->hasFile('favicon')) {
            $faviconUrl = $this->uploadToSupabase($request->file('favicon'), 'favicon');
            if ($faviconUrl) {
                $validated['favicon_url'] = $faviconUrl;
            }
        }

        // Update settings
        $settingsUpdated = $supabase->updateSettings($validated);

        // Update chat settings separately
        $chatData = [
            'chat_enabled' => $validated['chat_enabled'] ?? false,
            'manager_name' => $validated['manager_name'] ?? '',
            'manager_title' => $validated['manager_title'] ?? '',
            'manager_bio' => $validated['manager_bio'] ?? '',
            'manager_avatar_url' => $validated['manager_avatar_url'] ?? '',
            'is_active' => $validated['is_active'] ?? false,
        ];
        $chatUpdated = $supabase->updateChatManagerSettings($chatData);

        if ($settingsUpdated || $chatUpdated) {
            return back()->with('success', 'Settings updated successfully! ✓');
        } else {
            return back()->with('error', 'Failed to update settings. Please try again.');
        }
    }

    private function uploadToSupabase($file, $type)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $supabaseUrl = config('services.supabase.url');
            $serviceKey = config('services.supabase.service_key');
            
            // Generate unique filename
            $filename = $type . '_' . time() . '.' . $file->getClientOriginalExtension();
            $bucket = 'company-assets';
            $folder = $type; // 'logo' or 'favicon'
            
            // Upload to Supabase Storage
            $response = $client->post("{$supabaseUrl}/storage/v1/object/{$bucket}/{$folder}/{$filename}", [
                'headers' => [
                    'Authorization' => 'Bearer ' . $serviceKey,
                    'Content-Type' => $file->getMimeType(),
                ],
                'body' => file_get_contents($file->getRealPath()),
            ]);

            if ($response->getStatusCode() === 200) {
                // Return public URL
                return "{$supabaseUrl}/storage/v1/object/public/{$bucket}/{$folder}/{$filename}";
            }

            return null;
        } catch (\Exception $e) {
            \Log::error('Supabase file upload error', [
                'type' => $type,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }
}
