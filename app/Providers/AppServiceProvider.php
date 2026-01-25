<?php

namespace App\Providers;

use App\Services\SupabaseService;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Tighten\Ziggy\Ziggy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('supabase', function ($app) {
            return new SupabaseService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::version(fn () => md5_file(public_path('build/manifest.json')));

        Inertia::share([
            'auth' => function () {
                return [
                    'user' => auth()->user(),
                ];
            },
            'supabase' => function () {
                $supabase = app('supabase');
                return [
                    'companyName' => $supabase->getCompanyName(),
                    'websiteName' => $supabase->getWebsiteName(),
                    'logoUrl' => $supabase->getLogoUrl(),
                    'faviconUrl' => $supabase->getFaviconUrl(),
                ];
            },
            'flash' => function () {
                return [
                    'message' => session('message'),
                    'error' => session('error'),
                ];
            },
            'ziggy' => function () {
                return (new Ziggy)->toArray();
            },
        ]);
    }
}
