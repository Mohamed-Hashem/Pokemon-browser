import { memo } from "react";

interface BackButtonProps {
    onClick: () => void;
    label?: string;
}

export default memo(function BackButton({ onClick, label = "Back" }: BackButtonProps) {
    return (
        <button
            onClick={onClick}
            className="mb-4 cursor-pointer flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Go back"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
            <span className="font-medium">{label}</span>
        </button>
    );
});
