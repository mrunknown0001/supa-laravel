import React from 'react';
import AdminAppLayout from '@/Layouts/AdminAppLayout';
import { Link } from '@inertiajs/react';

export default function Index({ applications, employees, video_requests, active_orders, kyc_checks, total_balance, outstanding_payments, latest_applications }) {
    return (
        <AdminAppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                        Admin Dashboard
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Link
                                href={route('admin.applications')}
                            >
                                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border">
                                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                                    Applications
                                    </h3>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                                    {applications}
                                    </p>
                                </div>
                            </Link>

                        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                            Employees
                            </h3>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                            {employees}
                            </p>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border">
                            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                            KYC Checks
                            </h3>
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
                            {kyc_checks}
                            </p>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-400">
                            Total Balance
                            </h3>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                            ${total_balance}
                            </p>
                        </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            Latest Applications
                        </h2>

                        {latest_applications && latest_applications.length > 0 ? (
                            <ul className="space-y-2">
                            {latest_applications.map((app, index) => (
                                <li
                                key={index}
                                className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded shadow-sm border border-gray-200 dark:border-gray-700"
                                >
                                <span className="text-gray-800 dark:text-gray-200">
                                    {app.first_name + ' ' + app.last_name || "Unknown"}
                                </span>

                                <span
                                    className={`px-2 py-1 rounded text-sm font-medium ${
                                    app.status === "approved"
                                        ? "bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-900"
                                        : app.status === "rejected"
                                        ? "bg-red-100 text-red-800 dark:bg-red-600 dark:text-white"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white"
                                    }`}
                                >
                                    {app.status}
                                </span>
                                </li>
                            ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">
                            No recent applications.
                            </p>
                        )}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </AdminAppLayout>
    );
}