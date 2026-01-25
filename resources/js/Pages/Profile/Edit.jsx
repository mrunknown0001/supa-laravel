import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Edit({ user }) {
    return (
        <AppLayout>
            <ProfileEditContent user={user} />
        </AppLayout>
    );
}

function ProfileEditContent({ user }) {
    const { flash } = usePage().props;
    const status = flash?.status;
    const [activeTab, setActiveTab] = useState('profile');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        date_of_birth: user.date_of_birth ? new Date(user.date_of_birth).toISOString().split('T')[0] : '',
        nationality: user.nationality || '',
        street: user.street || '',
        postal_code: user.postal_code || '',
        city: user.city || '',
        recipient_name: user.recipient_name || '',
        iban: user.iban || '',
        bic: user.bic || '',
        tax_number: user.tax_number || '',
        social_security_number: user.social_security_number || '',
        health_insurance: user.health_insurance || '',
    });

    const passwordForm = useForm({
        password: '',
        password_confirmation: '',
    });

    const deleteForm = useForm({
        password: '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'), {
            onSuccess: () => {
                // Handle success
            },
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    const submitDelete = (e) => {
        e.preventDefault();
        deleteForm.delete(route('profile.destroy'), {
            onSuccess: () => {
                // Handle success - user will be logged out
            },
        });
    };

    const tabs = [
        { id: 'profile', label: 'Profile Information', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'password', label: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
        { id: 'delete', label: 'Danger Zone', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' },
    ];

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-2xl overflow-hidden">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <nav className="flex space-x-8 px-6" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`tab-button py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path>
                                    </svg>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 sm:p-8">
                        {/* Profile Information Tab */}
                        {activeTab === 'profile' && (
                            <section>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            Profile Information
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Update your account's profile information and email address.
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={submitProfile} className="space-y-8">
                                    {/* Basic Information */}
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex-shrink-0 w-5 h-5 rounded bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic Information</h3>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="md:col-span-2">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        value={profileForm.data.name}
                                                        onChange={(e) => profileForm.setData('name', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        required
                                                        autoFocus
                                                        autoComplete="name"
                                                    />
                                                    {profileForm.errors.name && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {profileForm.errors.name}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Email
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={profileForm.data.email}
                                                        onChange={(e) => profileForm.setData('email', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        required
                                                        autoComplete="username"
                                                    />
                                                    {profileForm.errors.email && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {profileForm.errors.email}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Personal Information */}
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex-shrink-0 w-5 h-5 rounded bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6"></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Personal Information</h3>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        First Name
                                                    </label>
                                                    <input
                                                        id="first_name"
                                                        type="text"
                                                        value={profileForm.data.first_name}
                                                        onChange={(e) => profileForm.setData('first_name', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        autoComplete="given-name"
                                                    />
                                                    {profileForm.errors.first_name && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {profileForm.errors.first_name}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        id="last_name"
                                                        type="text"
                                                        value={profileForm.data.last_name}
                                                        onChange={(e) => profileForm.setData('last_name', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        autoComplete="family-name"
                                                    />
                                                    {profileForm.errors.last_name && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {profileForm.errors.last_name}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Date of Birth
                                                    </label>
                                                    <input
                                                        id="date_of_birth"
                                                        type="date"
                                                        value={profileForm.data.date_of_birth}
                                                        onChange={(e) => profileForm.setData('date_of_birth', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                    {profileForm.errors.date_of_birth && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {profileForm.errors.date_of_birth}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Nationality
                                                    </label>
                                                    <input
                                                        id="nationality"
                                                        type="text"
                                                        value={profileForm.data.nationality}
                                                        onChange={(e) => profileForm.setData('nationality', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                    {profileForm.errors.nationality && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {profileForm.errors.nationality}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex-shrink-0 w-5 h-5 rounded bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Address</h3>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="md:col-span-2">
                                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Street
                                                    </label>
                                                    <input
                                                        id="street"
                                                        type="text"
                                                        value={profileForm.data.street}
                                                        onChange={(e) => profileForm.setData('street', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        autoComplete="address-line1"
                                                    />
                                                    {profileForm.errors.street && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {profileForm.errors.street}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Postal Code
                                                    </label>
                                                    <input
                                                        id="postal_code"
                                                        type="text"
                                                        value={profileForm.data.postal_code}
                                                        onChange={(e) => profileForm.setData('postal_code', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        autoComplete="postal-code"
                                                    />
                                                    {profileForm.errors.postal_code && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {profileForm.errors.postal_code}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        City
                                                    </label>
                                                    <input
                                                        id="city"
                                                        type="text"
                                                        value={profileForm.data.city}
                                                        onChange={(e) => profileForm.setData('city', e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        autoComplete="address-level2"
                                                    />
                                                    {profileForm.errors.city && (
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                            {profileForm.errors.city}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Financial Data - Only for non-admin users */}
                                    {user.role !== 'admin' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex-shrink-0 w-5 h-5 rounded bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Financial Data</h3>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="md:col-span-2">
                                                        <label htmlFor="recipient_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Recipient Name
                                                        </label>
                                                        <input
                                                            id="recipient_name"
                                                            type="text"
                                                            value={profileForm.data.recipient_name}
                                                            onChange={(e) => profileForm.setData('recipient_name', e.target.value)}
                                                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                        {profileForm.errors.recipient_name && (
                                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                                {profileForm.errors.recipient_name}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="iban" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            IBAN
                                                        </label>
                                                        <input
                                                            id="iban"
                                                            type="text"
                                                            value={profileForm.data.iban}
                                                            onChange={(e) => profileForm.setData('iban', e.target.value)}
                                                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                        {profileForm.errors.iban && (
                                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                                {profileForm.errors.iban}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="bic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            BIC
                                                        </label>
                                                        <input
                                                            id="bic"
                                                            type="text"
                                                            value={profileForm.data.bic}
                                                            onChange={(e) => profileForm.setData('bic', e.target.value)}
                                                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                        {profileForm.errors.bic && (
                                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                                {profileForm.errors.bic}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Payroll - Only for non-admin users */}
                                    {user.role !== 'admin' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex-shrink-0 w-5 h-5 rounded bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Payroll</h3>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label htmlFor="tax_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Tax Number
                                                        </label>
                                                        <input
                                                            id="tax_number"
                                                            type="text"
                                                            value={profileForm.data.tax_number}
                                                            onChange={(e) => profileForm.setData('tax_number', e.target.value)}
                                                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                        {profileForm.errors.tax_number && (
                                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                                {profileForm.errors.tax_number}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="social_security_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Social Security Number
                                                        </label>
                                                        <input
                                                            id="social_security_number"
                                                            type="text"
                                                            value={profileForm.data.social_security_number}
                                                            onChange={(e) => profileForm.setData('social_security_number', e.target.value)}
                                                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                        {profileForm.errors.social_security_number && (
                                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                                {profileForm.errors.social_security_number}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label htmlFor="health_insurance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Health Insurance
                                                        </label>
                                                        <input
                                                            id="health_insurance"
                                                            type="text"
                                                            value={profileForm.data.health_insurance}
                                                            onChange={(e) => profileForm.setData('health_insurance', e.target.value)}
                                                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                        {profileForm.errors.health_insurance && (
                                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                                {profileForm.errors.health_insurance}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <button
                                            type="submit"
                                            disabled={profileForm.processing}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 disabled:opacity-50"
                                        >
                                            {profileForm.processing ? 'Saving...' : 'Save'}
                                        </button>

                                        {status === 'profile-updated' && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Saved.
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </section>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'password' && (
                            <section>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            Change Password
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Keep your account secure with a strong password.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                                    <form onSubmit={submitPassword} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    New Password
                                                </label>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    value={passwordForm.data.password}
                                                    onChange={(e) => passwordForm.setData('password', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    autoComplete="new-password"
                                                />
                                                {passwordForm.errors.password && (
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                        {passwordForm.errors.password}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    id="password_confirmation"
                                                    type="password"
                                                    value={passwordForm.data.password_confirmation}
                                                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    autoComplete="new-password"
                                                />
                                                {passwordForm.errors.password_confirmation && (
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                        {passwordForm.errors.password_confirmation}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Password must be at least 8 characters long.
                                            </p>

                                            <div className="flex items-center space-x-4">
                                                <button
                                                    type="submit"
                                                    disabled={passwordForm.processing}
                                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 disabled:opacity-50"
                                                >
                                                    {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                                </button>

                                                {status === 'password-updated' && (
                                                    <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                        <span>Password updated successfully!</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        )}

                        {/* Danger Zone Tab */}
                        {activeTab === 'delete' && (
                            <section>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            Delete Account
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Permanently delete your account and all associated data.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                                This action cannot be undone
                                            </h3>
                                            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                                                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={() => setShowDeleteModal(true)}
                                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                        >
                                            <div className="flex items-center justify-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                                <span>Delete Account</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Delete Confirmation Modal */}
                                {showDeleteModal && (
                                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowDeleteModal(false)}></div>

                                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                                            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                <form onSubmit={submitDelete} className="p-6">
                                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                                                        Are you sure you want to delete your account?
                                                    </h2>

                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                                        Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                                                    </p>

                                                    <div className="mb-6">
                                                        <label htmlFor="delete_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Password
                                                        </label>
                                                        <input
                                                            id="delete_password"
                                                            type="password"
                                                            value={deleteForm.data.password}
                                                            onChange={(e) => deleteForm.setData('password', e.target.value)}
                                                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                            placeholder="Enter your password"
                                                        />
                                                        {deleteForm.errors.password && (
                                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                                {deleteForm.errors.password}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex justify-end space-x-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowDeleteModal(false)}
                                                            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                                        >
                                                            Cancel
                                                        </button>

                                                        <button
                                                            type="submit"
                                                            disabled={deleteForm.processing}
                                                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 disabled:opacity-50"
                                                        >
                                                            {deleteForm.processing ? 'Deleting...' : 'Delete Account'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}