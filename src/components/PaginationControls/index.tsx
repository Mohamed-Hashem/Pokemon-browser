interface Props {
    page: number
    setPage: (p: number) => void
    hasNext: boolean
}

export default function PaginationControls({ page, setPage, hasNext }: Props) {
    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>

            <div className="px-3 py-2 rounded bg-white border">Page {page}</div>

            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasNext}
                className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    )
}
