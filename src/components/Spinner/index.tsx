export default function Spinner() {
    return (
        <div className="flex items-center justify-center min-h-screen p-6" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-3">
                <svg
                    className="w-12 h-12 text-blue-600 animate-spin"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                <span className="text-sm text-gray-600">Loading...</span>
                <span className="sr-only">Loading application</span>
            </div>
        </div>
    )
}
