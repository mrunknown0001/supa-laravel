import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AdminAppLayout from '../../../Layouts/AdminAppLayout';

export default function Index({ profiles, totalEmployees, search, role, status, perPage, page }) {
    return (
        <AdminAppLayout>
            <EmployeesContent profiles={profiles} totalEmployees={totalEmployees} search={search} role={role} status={status} perPage={perPage} page={page} />
        </AdminAppLayout>
    );
}

function EmployeesContent({ profiles, totalEmployees, search, role, status, perPage, page }) {
    const [localSearch, setLocalSearch] = useState(search || '');
    const [localRole, setLocalRole] = useState(role || 'all');
    const [localStatus, setLocalStatus] = useState(status || 'all');
    const [localPerPage, setLocalPerPage] = useState(perPage || 10);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch !== search) {
                applyFilters({ search: localSearch, page: 1 });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [localSearch]);

    const applyFilters = (overrides = {}) => {
        router.get('/admin/employees', {
            search: localSearch,
            role: localRole,
            status: localStatus,
            perPage: localPerPage,
            page: page,
            ...overrides,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleRoleChange = (newRole) => {
        setLocalRole(newRole);
        applyFilters({ role: newRole, page: 1 });
    };

    const handleStatusChange = (newStatus) => {
        setLocalStatus(newStatus);
        applyFilters({ status: newStatus, page: 1 });
    };

    const handlePerPageChange = (newPerPage) => {
        setLocalPerPage(parseInt(newPerPage));
        applyFilters({ perPage: parseInt(newPerPage), page: 1 });
    };

    const handleClearFilters = () => {
        setLocalSearch('');
        setLocalRole('all');
        setLocalStatus('all');
        setLocalPerPage(10);
        router.get('/admin/employees', {
            search: '',
            role: 'all',
            status: 'all',
            perPage: 10,
            page: 1,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePageChange = (newPage) => {
        applyFilters({ page: newPage });
    };

    const hasActiveFilters = localSearch !== '' || localRole !== 'all' || localStatus !== 'all' || localPerPage !== 10;

    const totalPages = perPage > 0 ? Math.ceil(totalEmployees / perPage) : 1;
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    const getStatusColor = (status) => {
        return status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    };

    const formatCredit = (credit) => {
        return `€${parseFloat(credit).toFixed(2)}`;
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-8">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-8">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Employees</h1>
                    <p className="text-gray-600 dark:text-gray-400">Total Employees: {totalEmployees}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-8">
                <div className="p-6">
                    <div className="flex flex-wrap gap-4">
                        {/* Search */}
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                            <label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Search</label>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    id="search"
                                    value={localSearch}
                                    onChange={(e) => setLocalSearch(e.target.value)}
                                    placeholder="Search by name or email..."
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                />
                                {localSearch && (
                                    <button onClick={() => setLocalSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Role */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Role</label>
                            <select id="role" value={localRole} onChange={(e) => handleRoleChange(e.target.value)} className="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                                <option value="all">All Roles</option>
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Status</label>
                            <select id="status" value={localStatus} onChange={(e) => handleStatusChange(e.target.value)} className="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Per Page */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="perPage" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Per Page</label>
                            <select id="perPage" value={localPerPage} onChange={(e) => handlePerPageChange(e.target.value)} className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="0">All</option>
                            </select>
                        </div>

                        {/* Clear Button */}
                        {hasActiveFilters && (
                            <div className="flex items-center">
                                <button onClick={handleClearFilters} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Active Filters Badge */}
                    {hasActiveFilters && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                            <span>Active filters: </span>
                            {localSearch && <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">Search: "{localSearch}"</span>}
                            {localRole !== 'all' && <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">Role: {localRole}</span>}
                            {localStatus !== 'all' && <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">Status: {localStatus}</span>}
                            {localPerPage !== 10 && <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">Show: {localPerPage === 0 ? 'All' : localPerPage}</span>}
                        </div>
                    )}
                </div>
            </div>

            {/* Table - keeping existing structure */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Method</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Credit</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {profiles.length > 0 ? profiles.map((profile) => (
                                <tr key={profile.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{profile.first_name} {profile.last_name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900 dark:text-gray-100 capitalize">{profile.role || 'N/A'}</div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(profile.status)}`}>{profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap">{profile.payment_mode ? <span className="text-sm text-gray-900 dark:text-gray-100 capitalize">{profile.payment_mode}</span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Not Set</span>}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatCredit(profile.credit)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No employees found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination (keeping existing) */}
            {perPage > 0 && totalEmployees > perPage && (
                <div className="bg-white dark:bg-gray-800 px-4 py-3 mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-b-lg">
                    <div className="flex-1 flex justify-between sm:hidden">
                        {page > 1 && (<button onClick={() => handlePageChange(page - 1)} className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">Previous</button>)}
                        {page * perPage < totalEmployees && (<button onClick={() => handlePageChange(page + 1)} className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>)}
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div><p className="text-sm text-gray-700 dark:text-gray-300">Showing <span className="font-medium">{(page - 1) * perPage + 1}</span> to <span className="font-medium">{Math.min(page * perPage, totalEmployees)}</span> of <span className="font-medium">{totalEmployees}</span> results</p></div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {page > 1 && (<button onClick={() => handlePageChange(page - 1)} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"><span className="sr-only">Previous</span><svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>)}
                                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (<button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${pageNum === page ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>{pageNum}</button>))}
                                {page < totalPages && (<button onClick={() => handlePageChange(page + 1)} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"><span className="sr-only">Next</span><svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 01-1.414-1.414l4-4a1 1 0 010 1.414L6.414 13.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg></button>)}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
