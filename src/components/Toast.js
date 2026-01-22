import React, { useEffect } from 'react';
import './Toast.css';

function Toast({ message, productName, onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="toast-container">
            <div className="toast">
                <div className="toast-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>
                <div className="toast-content">
                    <div className="toast-title">Added to Cart</div>
                    <div className="toast-message">{productName}</div>
                </div>
                <button className="toast-close" onClick={onClose} aria-label="Close notification">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Toast;
