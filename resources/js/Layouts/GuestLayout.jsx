import React from 'react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-gray-800">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Form Container */}
                <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-700/50 sm:rounded-lg sm:px-10">
                    {children}
                </div>
            </div>
        </div>
    );
}