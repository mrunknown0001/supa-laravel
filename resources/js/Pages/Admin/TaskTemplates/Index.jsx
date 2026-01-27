import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminAppLayout from '../../../Layouts/AdminAppLayout';

export default function Index({ taskTemplates, totals, search, type, priority, perPage, page }) {
    return (
        <AdminAppLayout>
            <TaskTemplatesContent taskTemplates={taskTemplates} totals={totals} search={search} type={type} priority={priority} perPage={perPage} page={page} />
        </AdminAppLayout>
    );
}

function TaskTemplatesContent({ taskTemplates, totals, search, type, priority, perPage, page }) {
    const [localSearch, setLocalSearch] = useState(search || '');
    const [localType, setLocalType] = useState(type || 'all');
    const [localPriority, setLocalPriority] = useState(priority || 'all');
    const [localPerPage, setLocalPerPage] = useState(perPage || 10);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        router.visit('/admin/task-templates', {
            method: 'get',
            data: {
                search: localSearch,
                type: localType,
                priority: localPriority,
                perPage: localPerPage,
                page: 1,
            },
            preserveState: true,
        });
    };

    const handlePageChange = (newPage) => {
        router.visit('/admin/task-templates', {
            method: 'get',
            data: {
                search,
                type,
                priority,
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

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'bankdrop': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'exchanger': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'placeholder': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
            case 'other': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-8">
            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-8">
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
                                placeholder="Search by title or description..."
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Type Filter */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Type</label>
                            <select
                                id="type"
                                value={localType}
                                onChange={(e) => setLocalType(e.target.value)}
                                className="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">All Types</option>
                                <option value="bankdrop">Bankdrop</option>
                                <option value="exchanger">Exchanger</option>
                                <option value="placeholder">Placeholder</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Priority Filter */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Priority</label>
                            <select
                                id="priority"
                                value={localPriority}
                                onChange={(e) => setLocalPriority(e.target.value)}
                                className="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">All Priorities</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
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

            {/* Task Templates Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {taskTemplates.length > 0 ? taskTemplates.map((template) => (
                    <div key={template.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header with actions */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{template.title}</h3>
                                    <div className="flex gap-2 mt-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(template.priority)}`}>
                                            {template.priority.charAt(0).toUpperCase() + template.priority.slice(1)}
                                        </span>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                                            {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    </button>
                                    <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                    </button>
                                    <div className="relative">
                                        <button
                                            onClick={() => setOpenDropdownId(openDropdownId === template.id ? null : template.id)}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                            </svg>
                                        </button>
                                        {/* Dropdown menu - no actions yet */}
                                        {openDropdownId === template.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
                                                <div className="py-1">
                                                    <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left">
                                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                        </svg>
                                                        Edit
                                                    </button>
                                                    <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left">
                                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                                        </svg>
                                                        Duplicate
                                                    </button>
                                                    <button className="block px-4 py-2 text-sm text-red-700 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left">
                                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>

                            {/* Footer */}
                            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                <span>Est. Hours: {template.estimated_hours}</span>
                                <span>{formatDate(template.updated_at)}</span>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No task templates found.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {perPage > 0 && totals > perPage && (
                <div className="bg-white dark:bg-gray-800 px-4 py-3 mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-b-lg">
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
    );
}