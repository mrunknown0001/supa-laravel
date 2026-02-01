import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminAppLayout from '../../../Layouts/AdminAppLayout';

export default function Index({ users, statusCounts, totals, search, status, perPage, page }) {
    return (
        <AdminAppLayout>
            <KycContent
                users={users}
                statusCounts={statusCounts}
                totals={totals}
                search={search}
                status={status}
                perPage={perPage}
                page={page}
            />
        </AdminAppLayout>
    );
}

function KycContent({ users, statusCounts, totals, search, status, perPage, page }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [currentStatus, setCurrentStatus] = useState(status ?? 'all');
    const [currentSearch, setCurrentSearch] = useState(search ?? '');
    const [currentPerPage, setCurrentPerPage] = useState(perPage ?? 10);
    const [currentPage, setCurrentPage] = useState(page ?? 1);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentSearch !== search) {
                submitQuery({ search: currentSearch, page: 1 });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [currentSearch]);

    const submitQuery = (override = {}) => {
        router.get(
            route('admin.kyc'),
            {
                status: currentStatus,
                search: currentSearch,
                perPage: currentPerPage,
                page: currentPage,
                ...override,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleApprove = (userId) => {
        if (!confirm('Are you sure you want to approve this KYC?')) return;

        router.post(
            route('admin.kyc.update-status', userId),
            { status: 'approved' },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    setSelectedUser(null);
                    submitQuery(); // refresh list
                },
            }
        );
    };

    const handleReject = (userId) => {
        if (!confirm('Are you sure you want to reject this KYC?')) return;

        router.post(
            route('admin.kyc.update-status', userId),
            { status: 'rejected' },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    setSelectedUser(null);
                    submitQuery(); // refresh list
                },
            }
        );
    };

    const getStatusBadge = (statusValue) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            under_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };

        return badges[statusValue] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    // ✅ safe pagination
    const totalPages = currentPerPage > 0 ? Math.ceil(totals / currentPerPage) : 1;

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    const handleStatusChange = (newStatus) => {
        setCurrentStatus(newStatus);
        submitQuery({ status: newStatus, page: 1 });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        submitQuery({ page: newPage });
    };

    const handlePerPageChange = (newPerPage) => {
        setCurrentPerPage(parseInt(newPerPage));
        submitQuery({ perPage: parseInt(newPerPage), page: 1 });
    };

    const handleClearFilters = () => {
        setCurrentSearch('');
        setCurrentStatus('all');
        setCurrentPerPage(10);
        setCurrentPage(1);
        router.get(route('admin.kyc'), { status: 'all', search: '', perPage: 10, page: 1 }, { preserveState: true, preserveScroll: true });
    };

    const hasActiveFilters = currentSearch !== '' || currentStatus !== 'all' || currentPerPage !== 10;

    const openModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };


    return (
        <>
            <Head title="KYC Check" />

            <div className="px-4 sm:px-6 lg:px-8 mt-8">
                {/* Header Stats */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap justify-between gap-6 text-center">

                            <div className="flex-1 min-w-[180px]">
                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {statusCounts?.total ?? 0}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Total Users
                                </div>
                            </div>

                            <div className="flex-1 min-w-[180px]">
                                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                    {statusCounts?.pending ?? 0}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Pending / Under Review
                                </div>
                            </div>

                            <div className="flex-1 min-w-[180px]">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {statusCounts?.approved ?? 0}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Completed KYC
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                            {/* LEFT: Status Buttons (inline + scrollable on small screens) */}
                            <div className="w-full lg:w-auto overflow-x-auto">
                                <div className="flex gap-2 min-w-max pb-1">
                                    <button
                                        onClick={() => handleStatusChange('all')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                                            currentStatus === 'all'
                                                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        All ({statusCounts?.total ?? 0})
                                    </button>

                                    <button
                                        onClick={() => handleStatusChange('pending')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                                            currentStatus === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        Pending ({statusCounts?.pending ?? 0})
                                    </button>

                                    <button
                                        onClick={() => handleStatusChange('under_review')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                                            currentStatus === 'under_review'
                                                ? 'bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        Under Review
                                    </button>

                                    <button
                                        onClick={() => handleStatusChange('approved')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                                            currentStatus === 'approved'
                                                ? 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        Approved ({statusCounts?.approved ?? 0})
                                    </button>

                                    <button
                                        onClick={() => handleStatusChange('rejected')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                                            currentStatus === 'rejected'
                                                ? 'bg-red-100 text-red-700 border border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        Rejected ({statusCounts?.rejected ?? 0})
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT: Search + Per Page + Clear */}
                            <div className="w-full lg:w-auto flex flex-row items-center gap-3 flex-wrap sm:flex-nowrap">

                                {/* Search */}
                                <div className="flex flex-1 min-w-[220px] relative">
                                    <input
                                        type="text"
                                        value={currentSearch}
                                        onChange={(e) => setCurrentSearch(e.target.value)}
                                        placeholder="Search users..."
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
                                    />
                                    {currentSearch && (
                                        <button
                                            onClick={() => setCurrentSearch('')}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* Per Page */}
                                <select
                                    value={currentPerPage}
                                    onChange={(e) => handlePerPageChange(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white whitespace-nowrap"
                                >
                                    <option value={10}>10 per page</option>
                                    <option value={25}>25 per page</option>
                                    <option value={50}>50 per page</option>
                                    <option value={0}>All</option>
                                </select>

                                {/* Clear Filters */}
                                {hasActiveFilters && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear Filters
                                    </button>
                                )}

                            </div>

                        </div>

                        {/* Active Filters Badge */}
                        {hasActiveFilters && (
                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                <span>Active filters: </span>
                                {currentSearch && <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">Search: "{currentSearch}"</span>}
                                {currentStatus !== 'all' && <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">Status: {currentStatus.replace('_', ' ')}</span>}
                                {currentPerPage !== 10 && <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">Show: {currentPerPage === 0 ? 'All' : currentPerPage}</span>}
                            </div>
                        )}
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users && users.length > 0 ? (
                                users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                    {user.first_name} {user.last_name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {user.email}
                                                </p>
                                            </div>

                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(user.kyc_status)}`}>
                                                {user.kyc_status === 'under_review'
                                                    ? 'Under Review'
                                                    : (user.kyc_status ?? 'N/A').charAt(0).toUpperCase() + (user.kyc_status ?? '').slice(1)}
                                            </span>
                                        </div>

                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            Verified: {formatDate(user.kyc_verified_at)}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openModal(user)}
                                                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                KYC Check
                                            </button>

                                            <button
                                                onClick={() => handleApprove(user.id)}
                                                disabled={user.kyc_status === 'approved'}
                                                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => handleReject(user.id)}
                                                disabled={user.kyc_status === 'rejected'}
                                                className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400">No users found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* Pagination */}
                {currentPerPage > 0 && totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            {currentPage > 1 && (
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-200 rounded-l-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Prev
                                </button>
                            )}

                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-4 py-2 border text-sm font-medium ${
                                        pageNum === currentPage
                                            ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-200'
                                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            {currentPage < totalPages && (
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-200 rounded-r-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Next
                                </button>
                            )}
                        </nav>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && selectedUser && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                KYC Documents - {selectedUser.first_name} {selectedUser.last_name}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {selectedUser.kyc_id_card_front_url && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        ID Card Front
                                    </label>
                                    <img
                                        src={selectedUser.kyc_id_card_front_url}
                                        alt="ID Card Front"
                                        className="w-full max-w-md mx-auto border rounded-lg"
                                    />
                                </div>
                            )}

                            {selectedUser.kyc_id_card_back_url && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        ID Card Back
                                    </label>
                                    <img
                                        src={selectedUser.kyc_id_card_back_url}
                                        alt="ID Card Back"
                                        className="w-full max-w-md mx-auto border rounded-lg"
                                    />
                                </div>
                            )}

                            {selectedUser.kyc_passport_photo_url && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Passport Photo
                                    </label>
                                    <img
                                        src={selectedUser.kyc_passport_photo_url}
                                        alt="Passport Photo"
                                        className="w-full max-w-md mx-auto border rounded-lg"
                                    />
                                </div>
                            )}

                            {selectedUser.kyc_drivers_license_front_url && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Driver's License Front
                                    </label>
                                    <img
                                        src={selectedUser.kyc_drivers_license_front_url}
                                        alt="Driver's License Front"
                                        className="w-full max-w-md mx-auto border rounded-lg"
                                    />
                                </div>
                            )}

                            {selectedUser.kyc_drivers_license_back_url && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Driver's License Back
                                    </label>
                                    <img
                                        src={selectedUser.kyc_drivers_license_back_url}
                                        alt="Driver's License Back"
                                        className="w-full max-w-md mx-auto border rounded-lg"
                                    />
                                </div>
                            )}

                            {selectedUser.kyc_proof_address_url && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Proof of Address
                                    </label>
                                    <img
                                        src={selectedUser.kyc_proof_address_url}
                                        alt="Proof of Address"
                                        className="w-full max-w-md mx-auto border rounded-lg"
                                    />
                                </div>
                            )}

                            {selectedUser.kyc_documents && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Additional Documents
                                    </label>
                                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto text-gray-700 dark:text-gray-200">
                                        {JSON.stringify(selectedUser.kyc_documents, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
