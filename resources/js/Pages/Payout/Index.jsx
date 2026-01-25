import React, { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ payoutRequests, workerBalance }) {
    return (
        <AppLayout>
            <PayoutContent payoutRequests={payoutRequests} workerBalance={workerBalance} />
        </AppLayout>
    );
}

function PayoutContent({ payoutRequests, workerBalance }) {
    const [activeTab, setActiveTab] = useState('balance');

    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-2xl overflow-hidden">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <nav className="flex space-x-8 px-6">
                            <button
                                type="button"
                                onClick={() => setActiveTab('balance')}
                                className={`tab-button py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                    activeTab === 'balance'
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                    </svg>
                                    <span>Balance</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('requests')}
                                className={`tab-button py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                    activeTab === 'requests'
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    <span>Payout Requests</span>
                                </div>
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 sm:p-8">
                        {/* Balance Tab */}
                        {activeTab === 'balance' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Current Balance */}
                                <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="flex-shrink-0">
                                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <h4 className="ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Current Balance</h4>
                                        </div>
                                        {workerBalance ? (
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {formatCurrency(workerBalance.current_balance)}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-600 dark:text-gray-400">N/A</p>
                                        )}
                                    </div>
                                </div>

                                {/* Total Earned */}
                                <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="flex-shrink-0">
                                                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <h4 className="ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Total Earned</h4>
                                        </div>
                                        {workerBalance ? (
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                {formatCurrency(workerBalance.total_earned)}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-600 dark:text-gray-400">N/A</p>
                                        )}
                                    </div>
                                </div>

                                {/* Total Paid Out */}
                                <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="flex-shrink-0">
                                                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                                </svg>
                                            </div>
                                            <h4 className="ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Total Paid Out</h4>
                                        </div>
                                        {workerBalance ? (
                                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                                {formatCurrency(workerBalance.total_paid_out)}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-600 dark:text-gray-400">N/A</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payout Requests Tab */}
                        {activeTab === 'requests' && (
                            <div>
                                {payoutRequests && payoutRequests.length > 0 ? (
                                    <div className="w-full overflow-x-auto">
                                        <table className="w-full min-w-[600px] divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide"
                                                    >
                                                        Amount
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide"
                                                    >
                                                        Status
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide"
                                                    >
                                                        Requested At
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                {payoutRequests.map((request, index) => (
                                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {formatCurrency(request.amount)}
                                                        </td>

                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                                                                    request.status
                                                                )}`}
                                                            >
                                                                {request.status
                                                                    ? request.status.charAt(0).toUpperCase() + request.status.slice(1)
                                                                    : "Unknown"}
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {formatDate(request.requested_at)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                ) : (
                                    <div className="text-center py-12">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No payout requests</h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You haven't submitted any payout requests yet.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}