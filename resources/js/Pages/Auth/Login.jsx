import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import GuestLayout from '../../Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    try {
        console.log('Login component rendered', { status, canResetPassword });
        return (
            <GuestLayout>
                <LoginForm status={status} canResetPassword={canResetPassword} />
            </GuestLayout>
        );
    } catch (error) {
        console.error('Error in Login component:', error);
        return <div>Error loading login page</div>;
    }
}

function LoginForm({ status, canResetPassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post('/login', { email, password, remember }, {
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
            onSuccess: () => setProcessing(false),
        });
    };

    return (
        <div className="w-full max-w-md mx-auto px-4 sm:px-0">
            {/* Card */}
            {/* <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-6 sm:p-8"> */}
            <div>
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Company Name
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sign in to your account
                    </p>
                </div>

                {/* Session Status */}
                {status && (
                    <div className="mb-6 rounded-lg bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700/50 p-4">
                        <p className="text-sm text-green-700 dark:text-green-200">
                            {status}
                        </p>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={submit} className="space-y-6">

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                            placeholder-gray-400 dark:placeholder-gray-500
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
                            placeholder="Enter your email"
                            required
                            autoFocus
                            autoComplete="username"
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                            placeholder-gray-400 dark:placeholder-gray-500
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
                            placeholder="Enter your password"
                            required
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                id="remember_me"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600
                                text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    {/* Error Block */}
                    {errors.email && !errors.password && !String(errors.email).includes('required') && (
                        <div className="rounded-lg bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700/50 p-4">
                            <p className="text-sm text-red-700 dark:text-red-200">
                                {errors.email}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center gap-2
                        py-2 px-4 rounded-lg shadow-sm text-sm font-semibold
                        text-white bg-blue-600 hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800
                        disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {processing ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Optional secondary action (UX improvement) */}
                    {/* <Link
                        href="/register"
                        className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg
                        text-sm font-semibold border border-gray-300 dark:border-gray-600
                        text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                        Create Account
                    </Link> */}
                </form>
            </div>
        </div>
    );
}
