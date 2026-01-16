@php
    $websiteName = Supabase::getWebsiteName();
    $companyName = Supabase::getCompanyName();
    $faviconUrl = Supabase::getFaviconUrl();
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
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @livewireStyles
    </head>
    <body class="font-sans antialiased" x-data="{ sidebarOpen: true }">
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            

            <div class="flex">
                <!-- Sidebar Backdrop (Mobile) -->
                <div :class="sidebarOpen ? 'block' : 'hidden'" class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" @click="sidebarOpen = false"></div>

                <!-- Sidebar -->
                <aside :class="sidebarOpen ? 'w-1/6 max-w-xs min-w-[240px]' : 'w-12'" class="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 min-h-screen md:relative md:translate-x-0">
                    <div class="flex flex-col h-full">
                        <!-- Sidebar Header -->
                        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 h-16">
                            <x-application-logo :class="sidebarOpen ? 'block' : 'hidden'" class="w-8 h-8 text-gray-800 dark:text-gray-200" />
                            <button @click="sidebarOpen = !sidebarOpen" class="p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <svg :class="sidebarOpen ? 'block' : 'hidden'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                                </svg>
                                <svg :class="!sidebarOpen ? 'block' : 'hidden'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Sidebar Navigation -->
                        <nav class="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                            @auth
                                <a href="{{ route('dashboard') }}" :class="sidebarOpen ? 'justify-start' : 'justify-center'" class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <svg class="w-5 h-5 flex-shrink-0" :class="sidebarOpen ? 'mr-3' : 'mr-0'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                                    </svg>
                                    <span :class="sidebarOpen ? 'block' : 'hidden'">Dashboard</span>
                                </a>
                                <a href="{{ route('profile.edit') }}" :class="sidebarOpen ? 'justify-start' : 'justify-center'" class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <svg class="w-5 h-5 flex-shrink-0" :class="sidebarOpen ? 'mr-3' : 'mr-0'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <span :class="sidebarOpen ? 'block' : 'hidden'">Profile</span>
                                </a>
                            @endauth
                        </nav>
                    </div>
                </aside>

                <!-- Main Content -->
                <div class="flex-1">
                    <!-- Page Content -->
                    <main>
                        @include('layouts.navigation')
                        {{ $slot }}
                    </main>
                </div>
            </div>
        </div>

        @livewireScripts
    </body>
</html>
