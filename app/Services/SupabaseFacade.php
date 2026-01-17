<?php

namespace App\Services;

use Illuminate\Support\Facades\Facade;

/**
 * @method static array getSettings()
 * @method static string|null getSetting(string $key)
 * @method static string getCompanyName()
 * @method static string getWebsiteName()
 * @method static string|null getLogoUrl()
 * @method static string|null getFaviconUrl()
 * @method static void clearSettingsCache()
 * @method static array getSettingsWithFilters(array $filters)
 */
class SupabaseFacade extends Facade
{
    /**
     * Get the registered name of the component.
     */
    protected static function getFacadeAccessor(): string
    {
        return 'supabase';
    }
}