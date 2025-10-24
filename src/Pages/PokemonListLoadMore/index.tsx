import { Suspense } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getPokemonList } from '../../api/pokemon'
import PokemonCard from '../../components/PokemonCard'
import { GridSkeleton } from '../../components/SkeletonLoader'
import type { PokemonListResult } from '../../types'

const PAGE_SIZE = 12

function InfiniteGrid() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['pokemon-infinite'],
        queryFn: ({ pageParam = 0 }) => getPokemonList(PAGE_SIZE, pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.next) return pages.length * PAGE_SIZE
            return undefined
        },
        initialPageParam: 0
    })

    const all = data?.pages.flatMap((p) => p.results) || []

    if (!data) return <GridSkeleton count={PAGE_SIZE} />

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {all.map((p: PokemonListResult) => (
                    <PokemonCard key={p.name} name={p.name} />
                ))}
            </div>

            <div className="flex justify-center mt-6">
                {hasNextPage ? (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        aria-label={isFetchingNextPage ? 'Loading more Pokémon' : 'Load more Pokémon'}
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </button>
                ) : (
                    <div className="text-sm text-gray-500" role="status">No more Pokémon</div>
                )}
            </div>
        </div>
    )
}

export default function PokemonListLoadMore() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4" id="page-title">Load More View</h1>
            <Suspense fallback={<GridSkeleton count={PAGE_SIZE} />}>
                <InfiniteGrid />
            </Suspense>
        </div>
    )
}
