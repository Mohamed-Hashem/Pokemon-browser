interface Props {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}

export default function PaginationControls({ page, setPage, totalPages }: Props) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxButtons = 5;

        let startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        // Add first page and ellipsis if needed
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push("...");
            }
        }

        // Add the visible page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis and last page if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push("...");
            }
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav
            className="flex items-center justify-center gap-2 mt-6 flex-wrap"
            aria-label="Pagination Navigation"
            role="navigation"
        >
            <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors cursor-pointer"
                aria-label="Go to previous page"
                aria-disabled={page === 1}
            >
                ← Previous
            </button>

            {pageNumbers.map((pageNum, index) => {
                if (pageNum === "...") {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-gray-500"
                            aria-hidden="true"
                        >
                            ...
                        </span>
                    );
                }

                const isActive = pageNum === page;

                return (
                    <button
                        key={pageNum}
                        onClick={() => setPage(pageNum as number)}
                        className={`px-3 py-2 text-sm rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer ${
                            isActive
                                ? "bg-blue-600 text-white font-semibold"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                        aria-label={`Go to page ${pageNum}`}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {pageNum}
                    </button>
                );
            })}

            <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors cursor-pointer"
                aria-label="Go to next page"
                aria-disabled={page >= totalPages}
            >
                Next →
            </button>
        </nav>
    );
}
