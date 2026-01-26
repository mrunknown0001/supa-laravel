import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminAppLayout from '../../../Layouts/AdminAppLayout';

export default function Index({ applications, statusCounts, totals, search, status, perPage, page }) {
    return (
        <AdminAppLayout>
            <ApplicationsContent applications={applications} statusCounts={statusCounts} totals={totals} search={search} status={status} perPage={perPage} page={page} />
        </AdminAppLayout>
    );
}

function ApplicationsContent({ applications, statusCounts, totals, search, status, perPage, page }) {
    const [localSearch, setLocalSearch] = useState(search || '');
    const [localStatus, setLocalStatus] = useState(status || 'all');
    const [localPerPage, setLocalPerPage] = useState(perPage || 10);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        router.visit('/admin/applications', {
            method: 'get',
            data: {
                search: localSearch,
                status: localStatus,
                perPage: localPerPage,
                page: 1,
            },
            preserveState: true,
        });
    };

    const handlePageChange = (newPage) => {
        router.visit('/admin/applications', {
            method: 'get',
            data: {
                search,
                status,
                perPage,
                page: newPage,
            },
            preserveState: true,
        });
    };

    const totalPages = perPage > 0 ? Math.ceil(totals / perPage) : 1;
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Card */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total</h3>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{statusCounts.total}</p>
                    </div>
                </div>

                {/* Pending Card */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Pending</h3>
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{statusCounts.pending}</p>
                    </div>
                </div>

                {/* Approved Card */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Approved</h3>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{statusCounts.approved}</p>
                    </div>
                </div>

                {/* Rejected Card */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Rejected</h3>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{statusCounts.rejected}</p>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-0">
                <div className="p-6">
                    <form onSubmit={handleFilterSubmit} className="flex flex-wrap gap-4">
                        {/* Search */}
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                            <label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Search</label>
                            <input
                                type="text"
                                id="search"
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Status</label>
                            <select
                                id="status"
                                value={localStatus}
                                onChange={(e) => setLocalStatus(e.target.value)}
                                className="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        {/* Per Page */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="perPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Per Page</label>
                            <select
                                id="perPage"
                                value={localPerPage}
                                onChange={(e) => setLocalPerPage(parseInt(e.target.value))}
                                className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="0">All</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Filter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="w-full overflow-x-auto">
                    <table className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Applicant
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Contact
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Status
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Received
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {applications.length > 0 ? applications.map((application) => (
                                <tr key={application.id}>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{application.first_name} {application.last_name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{application.city || 'N/A'}</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 dark:text-gray-100">{application.email}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{application.phone || 'N/A'}</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            application.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                            application.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            application.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''
                                        }`}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                            {application.email_sent_at && <span className="ml-1">📧</span>}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(application.created_at)}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                </svg>
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-4 sm:px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        No applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {perPage > 0 && totals > perPage && (
                    <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {page > 1 && (
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Previous
                                </button>
                            )}
                            {page * perPage < totals && (
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing <span className="font-medium">{(page - 1) * perPage + 1}</span> to <span className="font-medium">{Math.min(page * perPage, totals)}</span> of <span className="font-medium">{totals}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    {page > 1 && (
                                        <button
                                            onClick={() => handlePageChange(page - 1)}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    )}

                                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                                                pageNum === page
                                                    ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}

                                    {page < totalPages && (
                                        <button
                                            onClick={() => handlePageChange(page + 1)}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <span className="sr-only">Next</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 01-1.414-1.414l4-4a1 1 0 010 1.414L6.414 13.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}