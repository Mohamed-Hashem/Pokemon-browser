interface Props {
    page: number
    setPage: (page: number) => void
    hasNext: boolean
}

export default function PaginationControls({ page, setPage, hasNext }: Props) {
    return (
        <nav
            className="flex items-center justify-center gap-4 mt-6"
            aria-label="Pagination Navigation"
            role="navigation"
        >
            <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                aria-label="Go to previous page"
                aria-disabled={page === 1}
            >
                Previous
            </button>

            <span className="px-4 py-2 text-sm text-gray-700 font-medium" aria-live="polite" aria-current="page">
                Page {page}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasNext}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                aria-label="Go to next page"
                aria-disabled={!hasNext}
            >
                Next
            </button>
        </nav>
    )
}
