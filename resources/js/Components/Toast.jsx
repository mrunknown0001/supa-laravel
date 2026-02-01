import React, { useEffect, useState } from 'react';

export default function Toast({ type = 'success', message, onClose, duration = 5000 }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        console.log('Toast mounted:', message);
        
        const timer = setTimeout(() => {
            console.log('Toast auto-closing');
            setShow(false);
            setTimeout(() => {
                if (onClose) onClose();
            }, 300);
        }, duration);
        
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    const config = {
        success: { bg: '#10b981', icon: '✓' },
        error: { bg: '#ef4444', icon: '✕' },
        info: { bg: '#3b82f6', icon: 'ℹ' },
        warning: { bg: '#f59e0b', icon: '⚠' },
    };

    const { bg, icon } = config[type];

    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 99999,
                backgroundColor: bg,
                color: 'white',
                borderRadius: '8px',
                padding: '16px 20px',
                minWidth: '320px',
                maxWidth: '400px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: show ? 'slideIn 0.3s ease-out' : 'slideOut 0.3s ease-in',
                transform: show ? 'translateX(0)' : 'translateX(400px)',
                opacity: show ? 1 : 0,
                transition: 'all 0.3s ease'
            }}
        >
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{icon}</div>
            <div style={{ flex: 1, fontWeight: '500' }}>{message}</div>
            <button
                onClick={() => {
                    setShow(false);
                    setTimeout(() => onClose && onClose(), 300);
                }}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '0',
                    lineHeight: '1'
                }}
            >
                ×
            </button>
        </div>
    );
}

export function ToastContainer({ flash }) {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        console.log('Flash received:', flash);
        
        const newToasts = [];
        
        if (flash?.success && flash.success !== null) {
            console.log('CREATE SUCCESS TOAST');
            newToasts.push({ id: Date.now(), type: 'success', message: flash.success });
        }
        if (flash?.error && flash.error !== null) {
            console.log('CREATE ERROR TOAST');
            newToasts.push({ id: Date.now() + 1, type: 'error', message: flash.error });
        }
        if (flash?.info && flash.info !== null) {
            newToasts.push({ id: Date.now() + 2, type: 'info', message: flash.info });
        }
        if (flash?.warning && flash.warning !== null) {
            newToasts.push({ id: Date.now() + 3, type: 'warning', message: flash.warning });
        }

        if (newToasts.length > 0) {
            console.log('SET TOASTS:', newToasts.length);
            setToasts(newToasts);
        }
    }, [flash]);

    const removeToast = (id) => {
        console.log('Remove toast:', id);
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    console.log('RENDER ToastContainer, count:', toasts.length);

    return (
        <>
            {toasts.map((toast, idx) => {
                console.log('RENDER Toast', idx, toast.message);
                return (
                    <div key={toast.id} style={{ position: 'relative', zIndex: 99999 - idx }}>
                        <Toast
                            type={toast.type}
                            message={toast.message}
                            onClose={() => removeToast(toast.id)}
                        />
                    </div>
                );
            })}
        </>
    );
}
