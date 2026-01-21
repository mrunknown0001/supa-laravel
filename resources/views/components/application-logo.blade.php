@php
    $logoUrl = Supabase::getLogoUrl();
@endphp<!-- Logo -->
<div class="shrink-0 flex items-center">
    <a href="{{ route('dashboard') }}" wire:navigate wire:navigate.hover>
        @if($logoUrl)
            <img src="{{ $logoUrl }}" alt="{{ Supabase::getCompanyName() }}" class="block h-9 w-auto">
        @else
            <x-application-logo class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
        @endif
    </a>
</div>