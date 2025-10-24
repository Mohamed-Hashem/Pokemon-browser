interface LoadMoreButtonProps {
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
    pokemonCount?: number;
}

export default function LoadMoreButton({
    onLoadMore,
    hasMore,
    isLoading,
    pokemonCount,
}: LoadMoreButtonProps) {
    if (!hasMore) {
        return (
            <div className="text-sm text-gray-500" role="status">
                No more Pokémon
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
                <div className="flex justify-center items-center gap-2 ">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
                    <span className="text-lg">Loading more Pokemon...</span>
                </div>
                {pokemonCount !== undefined && (
                    <div className="text-gray-500 text-base">Showing {pokemonCount} Pokemon</div>
                )}
            </div>
        );
    }

    return (
        <button
            onClick={onLoadMore}
            className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label="Load more Pokémon"
        >
            Load More
        </button>
    );
}
