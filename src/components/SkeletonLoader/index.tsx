interface PokemonCardSkeletonProps {
    count?: number;
}

export function PokemonCardSkeleton() {
    return (
        <div
            className="block p-4 bg-white rounded-lg shadow animate-pulse"
            role="status"
            aria-label="Loading Pokémon card"
        >
            <span className="sr-only">Loading…</span>
            <div className="flex items-center justify-center h-28">
                <div className="w-20 h-20 bg-gray-200 rounded"></div>
            </div>
            <div className="mt-3 flex justify-center">
                <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
        </div>
    );
}

export function GridSkeleton({ count = 12 }: PokemonCardSkeletonProps) {
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            role="status"
            aria-label="Loading Pokémon grid"
        >
            <span className="sr-only">Loading…</span>
            {Array.from({ length: count }).map((_, i) => (
                <PokemonCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function DetailSkeleton() {
    return (
        <div
            className="mt-4 max-w-xl bg-white p-6 rounded shadow animate-pulse"
            role="status"
            aria-label="Loading Pokémon details"
        >
            <span className="sr-only">Loading…</span>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded">
                    <div className="w-32 h-32 bg-gray-200 rounded"></div>
                </div>

                <div className="flex-1">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-28 mb-4"></div>

                    <div className="mt-3">
                        <div className="h-5 bg-gray-200 rounded w-16 mb-2"></div>
                        <div className="flex gap-2">
                            <div className="h-7 bg-gray-200 rounded w-20"></div>
                            <div className="h-7 bg-gray-200 rounded w-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
