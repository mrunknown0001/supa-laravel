@php
    $supabaseService = app(\App\Services\SupabaseService::class);
    $websiteName = $supabaseService->getWebsiteName();
    $companyName = $supabaseService->getCompanyName();
    $faviconUrl = $supabaseService->getFaviconUrl();
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ $websiteName }}</title>

        <!-- SEO Meta Tags -->
        <meta name="description" content="Welcome to {{ $companyName }}">
        <meta name="author" content="{{ $companyName }}">

        @if($faviconUrl)
            <link rel="icon" type="image/x-icon" href="{{ $faviconUrl }}">
        @endif

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="font-sans text-gray-900 antialiased bg-gray-50 dark:bg-gray-900">
        <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <!-- Form Container -->
                <div class="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-700/50 sm:rounded-lg sm:px-10">
                    {{ $slot }}
                </div>
            </div>
        </div>

        @livewireScripts
    </body>
</html>
