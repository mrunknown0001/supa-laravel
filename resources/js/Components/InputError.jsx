import React from 'react';

export default function InputError({ messages, className = '' }) {
    if (!messages || messages.length === 0) {
        return null;
    }

    return (
        <ul className={`text-sm text-red-600 dark:text-red-400 space-y-1 ${className}`}>
            {Array.isArray(messages) ? messages.map((message, index) => (
                <li key={index}>{message}</li>
            )) : (
                <li>{messages}</li>
            )}
        </ul>
    );
}