import React from 'react';
import { usePage } from '@inertiajs/react';

export default function ApplicationLogo({ className = '' }) {
    const { supabase } = usePage().props;

    if (supabase?.logoUrl) {
        return (
            <div className={`shrink-0 flex items-center ${className}`}>
                <a href={route('dashboard')}>
                    <img src={supabase.logoUrl} alt={supabase.companyName || 'Company'} className="block h-9 w-auto" />
                </a>
            </div>
        );
    }

    // Default Laravel logo SVG
    return (
        <div className={`shrink-0 flex items-center ${className}`}>
            <a href={route('dashboard')}>
                <svg className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" viewBox="0 0 95 69" xmlns="http://www.w3.org/2000/svg">
                    <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69L48.854 59.649 63.646 95.31c19.413-6.517 33.406-24.933 33.406-46.69C97.707 22 75.868 0 48.854 0zM26.908 60.127c-2.505 0-4.539-2.046-4.539-4.561V25.697c0-2.515 2.034-4.561 4.539-4.561h9.747c2.505 0 4.539 2.046 4.539 4.561v29.869c0 2.515-2.034 4.561-4.539 4.561H26.908zm22.991 0c-2.505 0-4.539-2.046-4.539-4.561V25.697c0-2.515 2.034-4.561 4.539-4.561h9.747c2.505 0 4.539 2.046 4.539 4.561v29.869c0 2.515-2.034 4.561-4.539 4.561H49.899z" />
                </svg>
            </a>
        </div>
    );
}