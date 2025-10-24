interface LoadMoreButtonProps {
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
}

export default function LoadMoreButton({ onLoadMore, hasMore, isLoading }: LoadMoreButtonProps) {
    if (!hasMore) {
        return (
            <div className="text-sm text-gray-500" role="status">
                No more Pokémon
            </div>
        );
    }

    return (
        <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label={isLoading ? "Loading more Pokémon" : "Load more Pokémon"}
        >
            {isLoading ? "Loading..." : "Load More"}
        </button>
    );
}
