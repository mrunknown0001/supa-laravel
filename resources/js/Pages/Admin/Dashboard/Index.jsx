import React from 'react';
import AdminAppLayout from '@/Layouts/AdminAppLayout';

export default function Index({ applications, employees, video_requests, active_orders, kyc_checks, total_balance, outstanding_payments, latest_applications }) {
    return (
        <AdminAppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-blue-800">Applications</h3>
                                    <p className="text-2xl font-bold text-blue-600">{applications}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-green-800">Employees</h3>
                                    <p className="text-2xl font-bold text-green-600">{employees}</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-yellow-800">KYC Checks</h3>
                                    <p className="text-2xl font-bold text-yellow-600">{kyc_checks}</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-purple-800">Total Balance</h3>
                                    <p className="text-2xl font-bold text-purple-600">${total_balance}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Latest Applications</h2>
                                {latest_applications && latest_applications.length > 0 ? (
                                    <ul className="space-y-2">
                                        {latest_applications.map((app, index) => (
                                            <li key={index} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
                                                <span>{app.name || 'Unknown'}</span>
                                                <span className={`px-2 py-1 rounded text-sm ${
                                                    app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {app.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No recent applications.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAppLayout>
    );
}