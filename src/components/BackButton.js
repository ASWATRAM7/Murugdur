import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

function BackButton({ label = 'Back', className = '' }) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <button
            onClick={handleBack}
            className={`back-button ${className}`}
            aria-label="Go back to previous page"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>{label}</span>
        </button>
    );
}

export default BackButton;
