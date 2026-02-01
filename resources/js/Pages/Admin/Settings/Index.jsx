import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminAppLayout from '../../../Layouts/AdminAppLayout';
import TextInput from '../../../Components/TextInput';
import InputError from '../../../Components/InputError';
import PrimaryButton from '../../../Components/PrimaryButton';
import InfoBox from '../../../Components/InfoBox';

export default function Index({ settings, chatSettings, kycStats }) {
    return (
        <AdminAppLayout>
            <Head title="Settings" />
            <SettingsContent settings={settings} chatSettings={chatSettings} kycStats={kycStats} />
        </AdminAppLayout>
    );
}

function SettingsContent({ settings, chatSettings, kycStats }) {
    const [activeTab, setActiveTab] = useState('pursue');

    const { data, setData, post, processing, errors } = useForm({
        // Pursue (General)
        company_name: settings?.company_name || '',
        website_name: settings?.website_name || '',
        website_url: settings?.website_url || '',
        
        // Contact
        contact_email: settings?.contact_email || '',
        contact_phone: settings?.contact_phone || '',
        support_email: settings?.support_email || '',
        support_phone: settings?.support_phone || '',
        company_address: settings?.company_address || '',
        postal_code: settings?.postal_code || '',
        city: settings?.city || '',
        country: settings?.country || '',
        
        // Legal
        registration_number: settings?.registration_number || '',
        euid: settings?.euid || '',
        court_location: settings?.court_location || '',
        managing_director: settings?.managing_director || '',
        responsible_person: settings?.responsible_person || '',
        company_legal_form: settings?.company_legal_form || 'GmbH',
        data_protection_officer: settings?.data_protection_officer || '',
        privacy_contact_email: settings?.privacy_contact_email || '',
        
        // Branding
        primary_color: settings?.primary_color || '#f97316',
        accent_color: settings?.accent_color || '#231f20',
        
        // KYC
        kyc_required_for_tasks: settings?.kyc_required_for_tasks || false,
        kyc_requirement_message: settings?.kyc_requirement_message || '',
        
        // Email
        email_delay_enabled: settings?.email_delay_enabled || false,
        email_delay_hours: settings?.email_delay_hours || 2,
        
        // Live Chat
        chat_enabled: chatSettings?.chat_enabled || false,
        manager_name: chatSettings?.manager_name || '',
        manager_title: chatSettings?.manager_title || '',
        manager_bio: chatSettings?.manager_bio || '',
        manager_avatar_url: chatSettings?.manager_avatar_url || '',
        is_active: chatSettings?.is_active || false,
    });

    const tabs = [
        { id: 'pursue', name: 'Pursue', icon: '🏢' },
        { id: 'contact', name: 'contact', icon: '📞' },
        { id: 'legal', name: 'Legal', icon: '⚖️' },
        { id: 'logo', name: 'Logo & Favicon', icon: '🖼️' },
        { id: 'branding', name: 'Branding', icon: '🎨' },
        { id: 'kyc', name: 'KYC verification', icon: '✅' },
        { id: 'email', name: 'e-mail', icon: '📧' },
        { id: 'contracts', name: 'Contracts', icon: '📄' },
        { id: 'chat', name: 'Live Chat', icon: '💬' },
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                // Flash message will be shown via ToastContainer
            },
            onError: (errors) => {
                console.error('Settings update errors:', errors);
            }
        });
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-8">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-8">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your application settings</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Update
                            </button>
                            <PrimaryButton onClick={submit} disabled={processing}>
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-t-lg mb-0">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex overflow-x-auto px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-6 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                                    activeTab === tab.id
                                        ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <form onSubmit={submit}>
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-b-lg mb-8">
                    <div className="p-6">
                        
                        {/* PURSUE TAB */}
                        {activeTab === 'pursue' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Company information</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company name</label>
                                    <TextInput value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} className="w-full" />
                                    <InputError message={errors.company_name} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website Name</label>
                                    <TextInput value={data.website_name} onChange={(e) => setData('website_name', e.target.value)} className="w-full" />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Used for document titles and headings.</p>
                                    <InputError message={errors.website_name} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website URL</label>
                                    <TextInput value={data.website_url} onChange={(e) => setData('website_url', e.target.value)} className="w-full" placeholder="https://example.com" />
                                    <InputError message={errors.website_url} />
                                </div>
                            </div>
                        )}

                        {/* CONTACT TAB */}
                        {activeTab === 'contact' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Contact information</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main email</label>
                                        <TextInput type="email" value={data.contact_email} onChange={(e) => setData('contact_email', e.target.value)} className="w-full" />
                                        <InputError message={errors.contact_email} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main telephone</label>
                                        <TextInput value={data.contact_phone} onChange={(e) => setData('contact_phone', e.target.value)} className="w-full" />
                                        <InputError message={errors.contact_phone} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Support email</label>
                                        <TextInput type="email" value={data.support_email} onChange={(e) => setData('support_email', e.target.value)} className="w-full" />
                                        <InputError message={errors.support_email} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Support phone</label>
                                        <TextInput value={data.support_phone} onChange={(e) => setData('support_phone', e.target.value)} className="w-full" />
                                        <InputError message={errors.support_phone} />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Company address</h3>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Street and house number</label>
                                            <TextInput value={data.company_address} onChange={(e) => setData('company_address', e.target.value)} className="w-full" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Postcode</label>
                                                <TextInput value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} className="w-full" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                                                <TextInput value={data.city} onChange={(e) => setData('city', e.target.value)} className="w-full" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">country</label>
                                                <TextInput value={data.country} onChange={(e) => setData('country', e.target.value)} className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* LEGAL TAB */}
                        {activeTab === 'legal' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Legal information</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Commercial Register Number</label>
                                        <TextInput value={data.registration_number} onChange={(e) => setData('registration_number', e.target.value)} className="w-full" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Registry Court</label>
                                        <TextInput value={data.court_location} onChange={(e) => setData('court_location', e.target.value)} className="w-full" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">VAT ID</label>
                                        <TextInput value={data.euid} onChange={(e) => setData('euid', e.target.value)} className="w-full" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Managing Director</label>
                                        <TextInput value={data.managing_director} onChange={(e) => setData('managing_director', e.target.value)} className="w-full" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Responsible for the content</label>
                                    <TextInput value={data.responsible_person} onChange={(e) => setData('responsible_person', e.target.value)} className="w-full" />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">According to § 55 para. 2 RStV</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Legal form</label>
                                        <select
                                            value={data.company_legal_form}
                                            onChange={(e) => setData('company_legal_form', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="GmbH">GmbH</option>
                                            <option value="AG">AG</option>
                                            <option value="UG">UG (haftungsbeschränkt)</option>
                                            <option value="e.V.">e.V.</option>
                                            <option value="KG">KG</option>
                                            <option value="OHG">OHG</option>
                                            <option value="GbR">GbR</option>
                                            <option value="Einzelunternehmen">Einzelunternehmen</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Protection Officer</label>
                                        <TextInput value={data.data_protection_officer} onChange={(e) => setData('data_protection_officer', e.target.value)} className="w-full" placeholder="[Optional for GDPR compliance]" />
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Optional: For GDPR compliance</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data protection contact email</label>
                                    <TextInput type="email" value={data.privacy_contact_email} onChange={(e) => setData('privacy_contact_email', e.target.value)} className="w-full" />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Separate email address for data protection inquiries (if different from main email address)</p>
                                </div>
                            </div>
                        )}

                        {/* LOGO & FAVICON TAB */}
                        {activeTab === 'logo' && (
                            <div className="space-y-8">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Logo & Favicon</h2>
                                
                                {/* Logo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">logo</label>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Upload Logo</p>
                                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                                                <input type="file" accept="image/*" className="hidden" id="logo-upload" />
                                                <label htmlFor="logo-upload" className="cursor-pointer">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, SVG up to 2MB</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Current Logo</p>
                                            {settings?.logo_url ? (
                                                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                                                    <img src={settings.logo_url} alt="Logo" className="max-h-24 w-auto" />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg p-8 bg-gray-50 dark:bg-gray-900">
                                                    <p className="text-sm text-gray-500">No logo uploaded</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Favicon */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Favicon</label>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Upload Favicon</p>
                                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                                                <input type="file" accept="image/*" className="hidden" id="favicon-upload" />
                                                <label htmlFor="favicon-upload" className="cursor-pointer">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">ICO, PNG (32x32 or 64x64)</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Current Favicon</p>
                                            {settings?.favicon_url ? (
                                                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                                                    <img src={settings.favicon_url} alt="Favicon" className="h-16 w-16" />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg p-8 bg-gray-50 dark:bg-gray-900">
                                                    <p className="text-sm text-gray-500">No favicon uploaded</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BRANDING TAB */}
                        {activeTab === 'branding' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Brand colors</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary color</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={data.primary_color}
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                            className="h-12 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                                        />
                                        <TextInput value={data.primary_color} onChange={(e) => setData('primary_color', e.target.value)} className="flex-1" />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Used for buttons, links, and primary elements.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">accent color</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={data.accent_color}
                                            onChange={(e) => setData('accent_color', e.target.value)}
                                            className="h-12 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                                        />
                                        <TextInput value={data.accent_color} onChange={(e) => setData('accent_color', e.target.value)} className="flex-1" />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Used for highlights, success states, and secondary actions.</p>
                                </div>

                                {/* Color Preview */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Color preview</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Primary color</p>
                                            <button style={{ backgroundColor: data.primary_color }} className="w-full py-3 text-white font-medium rounded-md mb-3">
                                                Primary Button
                                            </button>
                                            <div className="flex gap-3">
                                                <button style={{ backgroundColor: data.primary_color }} className="flex-1 py-2 text-white text-sm rounded-md">
                                                    Normal
                                                </button>
                                                <button style={{ backgroundColor: data.primary_color, opacity: 0.5 }} className="flex-1 py-2 text-white text-sm rounded-md">
                                                    Transparent
                                                </button>
                                                <button style={{ backgroundColor: data.primary_color, filter: 'brightness(1.2)' }} className="flex-1 py-2 text-white text-sm rounded-md">
                                                    Very bright
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">accent color</p>
                                            <button style={{ backgroundColor: data.accent_color }} className="w-full py-3 text-white font-medium rounded-md mb-3">
                                                Accent Button
                                            </button>
                                            <div className="flex gap-3">
                                                <button style={{ backgroundColor: data.accent_color }} className="flex-1 py-2 text-white text-sm rounded-md">
                                                    Normal
                                                </button>
                                                <button style={{ backgroundColor: data.accent_color, opacity: 0.5 }} className="flex-1 py-2 text-white text-sm rounded-md">
                                                    Transparent
                                                </button>
                                                <button style={{ backgroundColor: data.accent_color, filter: 'brightness(1.2)' }} className="flex-1 py-2 text-white text-sm rounded-md">
                                                    Very bright
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* KYC VERIFICATION TAB */}
                        {activeTab === 'kyc' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">KYC verification settings</h2>
                                
                                <InfoBox type="info" message="These settings control whether employees must complete their KYC verification before they can access tasks. For security reasons, this is enabled by default." />

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            checked={data.kyc_required_for_tasks}
                                            onChange={(e) => setData('kyc_required_for_tasks', e.target.checked)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label className="font-medium text-gray-900 dark:text-gray-100">KYC verification required for task access</label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">When enabled, employees can only access tasks after successful KYC approval. Admin users are exempt from this restriction.</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom KYC message</label>
                                    <textarea
                                        value={data.kyc_requirement_message}
                                        onChange={(e) => setData('kyc_requirement_message', e.target.value)}
                                        rows="3"
                                        placeholder="Enter a custom message that will be displayed to users when their KYC verification is required..."
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Optional: A personalized message displayed to employees when they need to complete their KYC verification. If left blank, a default message will be used.</p>
                                </div>

                                {/* KYC Statistics */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Current KYC statistics</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Status is updated upon saving.</p>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {data.kyc_required_for_tasks ? 'Activated' : 'Deactivated'}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Status</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {kycStats?.approved || 0}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Approved users</div>
                                            <div className="text-xs text-gray-400 mt-1">Calculated automatically</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                                {(kycStats?.pending || 0) + (kycStats?.under_review || 0)}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pending review</div>
                                            <div className="text-xs text-gray-400 mt-1">Calculated automatically</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                                {kycStats?.rejected || 0}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Blocked users</div>
                                            <div className="text-xs text-gray-400 mt-1">Calculated automatically</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* EMAIL TAB */}
                        {activeTab === 'email' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Email settings</h2>
                                
                                <InfoBox type="info">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">Email delay</p>
                                            <p className="text-sm">Configure automatic delay when sending emails. This can be helpful to avoid accidental sending.</p>
                                        </div>
                                    </div>
                                </InfoBox>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            checked={data.email_delay_enabled}
                                            onChange={(e) => setData('email_delay_enabled', e.target.checked)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label className="font-medium text-gray-900 dark:text-gray-100">Enable email delay</label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">When activated, emails are not sent immediately, but after the configured waiting period.</p>
                                    </div>
                                </div>

                                {data.email_delay_enabled && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delay in hours</label>
                                        <TextInput
                                            type="number"
                                            value={data.email_delay_hours}
                                            onChange={(e) => setData('email_delay_hours', parseInt(e.target.value))}
                                            min="1"
                                            max="168"
                                            className="w-32"
                                        />
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Number of hours to delay emails (1-168 hours / max. 7 days).</p>
                                    </div>
                                )}

                                <InfoBox type="warning" message="This setting affects automatically generated emails such as notifications and confirmations. Critical emails, such as password resets, will still be sent immediately." />
                            </div>
                        )}

                        {/* CONTRACTS TAB */}
                        {activeTab === 'contracts' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Contract templates</h2>
                                
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No contract templates found</p>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Create a new contract template to get started.</p>
                                    <button
                                        type="button"
                                        className="mt-6 inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Create first template
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* LIVE CHAT TAB */}
                        {activeTab === 'chat' && (
                            <div className="space-y-8">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Chat Manager Profile</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {/* Avatar */}
                                    <div className="md:col-span-1">
                                        <div className="flex flex-col items-center">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                                                {data.manager_avatar_url ? (
                                                    <img src={data.manager_avatar_url} alt="Manager" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <button type="button" className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800">
                                                Remove image
                                            </button>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="md:col-span-3 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chat Manager Name</label>
                                            <TextInput value={data.manager_name} onChange={(e) => setData('manager_name', e.target.value)} className="w-full" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position/Title</label>
                                            <TextInput value={data.manager_title} onChange={(e) => setData('manager_title', e.target.value)} className="w-full" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brief description</label>
                                            <textarea
                                                value={data.manager_bio}
                                                onChange={(e) => setData('manager_bio', e.target.value)}
                                                rows="3"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Status */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Chat status</h3>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                {data.chat_enabled ? 'Live Chat Enabled' : 'Live Chat Disabled'}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {data.chat_enabled ? 'Chat widget is visible to users' : 'Chat widget is hidden and unavailable'}
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.chat_enabled}
                                                onChange={(e) => setData('chat_enabled', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview in chat</h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">● {data.chat_enabled ? 'Enabled' : 'Disabled'}</span>
                                    </div>
                                    
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                        {data.chat_enabled ? (
                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600">
                                                        {data.manager_avatar_url ? (
                                                            <img src={data.manager_avatar_url} alt="Manager" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                                        {data.manager_name || 'Manager Name'}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {data.manager_title || 'Position/Title'}
                                                    </div>
                                                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                                        {data.manager_bio || 'Hallo! This is the chat manager. How can I help you today?'}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium">Chat disabled</p>
                                                <p className="text-sm text-gray-400">Not visible to users</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Instructions for Chat Manager Configuration</h3>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li><span className="text-blue-500">•</span> <strong>Chat Status:</strong> Enables/Disables the chat widget for all users</li>
                                        <li><span className="text-blue-500">•</span> The profile picture should be professional and friendly.</li>
                                        <li><span className="text-blue-500">•</span> The name will be used in all chat messages.</li>
                                        <li><span className="text-blue-500">•</span> The title appears below the name in the chat header.</li>
                                        <li><span className="text-blue-500">•</span> <strong>Recommended image size:</strong> 200x200 pixels, max. 5MB</li>
                                        <li><span className="text-blue-500">•</span> <strong>Supported formats:</strong> JPG, PNG, WebP</li>
                                        <li><span className="text-blue-500">•</span> <strong>Disabled:</strong> Chat widget is not displayed; existing conversations are retained</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Saving...' : 'Save Settings'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
