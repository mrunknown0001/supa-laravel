import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, children, className = '' }) {
    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                active
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            } ${className}`}
        >
            {children}
        </Link>
    );
}