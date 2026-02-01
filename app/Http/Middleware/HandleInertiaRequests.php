<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],

            // Flash messages for toast notifications
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'info' => fn () => $request->session()->get('info'),
                'warning' => fn () => $request->session()->get('warning'),
            ],

            // Supabase settings for layouts
            'supabase' => fn () => [
                'companyName' => app(\App\Services\SupabaseService::class)->getCompanyName(),
                'websiteName' => app(\App\Services\SupabaseService::class)->getWebsiteName(),
                'logoUrl' => app(\App\Services\SupabaseService::class)->getLogoUrl(),
            ],

            // ✅ Ziggy injected here
            'ziggy' => fn () => array_merge((new Ziggy)->toArray(), [
                'location' => $request->url(),
            ]),
        ]);
    }
}
