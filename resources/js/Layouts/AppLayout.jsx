import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import ApplicationLogo from '../Components/ApplicationLogo';
import Dropdown from '../Components/Dropdown';
import NavLink from '../Components/NavLink';
import FlashMessage from '../Components/FlashMessage';

export default function AppLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const page = usePage();
    const { auth, supabase } = page.props;
    const { url } = page; // ✅ current url/path from Inertia

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const isDark =
            savedTheme === 'dark' ||
            (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDark);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    /**
     * ✅ Reliable active checker for Inertia + Ziggy:
     * checks current URL against the route URL
     */
    const isActiveRoute = (routeName) => {
        try {
            const targetUrl = new URL(route(routeName), window.location.origin);
            return url === targetUrl.pathname || url.startsWith(targetUrl.pathname + '/');
        } catch (e) {
            return false;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex">
                {/* Sidebar Backdrop (Mobile) */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 min-h-screen ${
                        sidebarOpen ? 'block w-64' : 'hidden md:block w-64'
                    }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Sidebar Header */}
                        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 h-16">
                            <div className="flex items-center gap-2">
                                <ApplicationLogo
                                    className={`w-8 h-8 text-gray-800 dark:text-gray-200 ${
                                        sidebarOpen ? 'block' : 'hidden md:block'
                                    }`}
                                />
                                <span className="dark:text-white text-gray-900">
                                    {supabase?.companyName || 'Company'}
                                </span>
                            </div>

                            {/* RIGHT SIDE */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="ml-auto p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            >
                                {sidebarOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                                        />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Sidebar Navigation */}
                        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                            {auth?.user && auth.user.role !== 'admin' && (
                                <>
                                    <NavLink
                                        href={route('dashboard')}
                                        active={isActiveRoute('dashboard')} // ✅ fixed
                                        className={sidebarOpen ? 'justify-start' : 'justify-center md:justify-start'}
                                    >
                                        <svg
                                            className={`w-5 h-5 flex-shrink-0 ${
                                                sidebarOpen ? 'mr-3' : 'mr-0 md:mr-3'
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                                            />
                                        </svg>
                                        <span className={`${sidebarOpen ? 'block' : 'hidden md:block'}`}>
                                            Dashboard
                                        </span>
                                    </NavLink>

                                    <NavLink
                                        href={route('payout')}
                                        active={isActiveRoute('payout')} // ✅ fixed
                                        className={sidebarOpen ? 'justify-start' : 'justify-center md:justify-start'}
                                    >
                                        <svg
                                            className={`w-5 h-5 flex-shrink-0 ${
                                                sidebarOpen ? 'mr-3' : 'mr-0 md:mr-3'
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className={`${sidebarOpen ? 'block' : 'hidden md:block'}`}>
                                            Payout
                                        </span>
                                    </NavLink>
                                </>
                            )}

                            {auth?.user && (
                                <NavLink
                                    href={route('profile.edit')}
                                    active={isActiveRoute('profile.edit')} // ✅ fixed
                                    className={sidebarOpen ? 'justify-start' : 'justify-center md:justify-start'}
                                >
                                    <svg
                                        className={`w-5 h-5 flex-shrink-0 ${
                                            sidebarOpen ? 'mr-3' : 'mr-0 md:mr-3'
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <span className={`${sidebarOpen ? 'block' : 'hidden md:block'}`}>Profile</span>
                                </NavLink>
                            )}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 md:ml-64 pt-16 overflow-y-auto">
                    {/* Navigation Bar */}
                    <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 fixed top-0 left-0 right-0 z-40 md:left-64">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    {/* Sidebar Toggle */}
                                    <div className="flex items-center md:hidden">
                                        <button
                                            onClick={() => setSidebarOpen(!sidebarOpen)}
                                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                        >
                                            {sidebarOpen ? (
                                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                                </svg>
                                            ) : (
                                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Theme Toggle & Settings Dropdown */}
                                <div className="hidden sm:flex sm:items-center sm:ms-6 justify-end">
                                    {/* Dark Mode Toggle */}
                                    <button
                                        onClick={toggleDarkMode}
                                        className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 mr-4"
                                    >
                                        {darkMode ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* KYC Status */}
                                    {auth?.user && auth.user.role !== 'admin' && (
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-4 ${
                                                auth.user.kyc_status === 'approved'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    : auth.user.kyc_status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                                    : auth.user.kyc_status === 'rejected'
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                                            }`}
                                        >
                                            {auth.user.kyc_status === 'approved'
                                                ? 'Verified'
                                                : auth.user.kyc_status === 'pending'
                                                ? 'Pending'
                                                : auth.user.kyc_status === 'rejected'
                                                ? 'Rejected'
                                                : 'Unknown'}
                                        </span>
                                    )}

                                    {auth?.user ? (
                                        <Dropdown align="right" width="48">
                                            <Dropdown.Trigger>
                                                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                                    <div>{auth.user.email}</div>
                                                    <div className="ms-1">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>

                                                <Dropdown.Link onClick={() => router.post(route('logout'))}>
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    ) : (
                                        <div className="flex items-center space-x-4">
                                            <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                                                Login
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Hamburger */}
                                <div className="-me-2 flex items-center sm:hidden">
                                    <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Page Content */}
                    <main>
                        <FlashMessage />
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
