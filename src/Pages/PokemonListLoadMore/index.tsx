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
                        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer disabled:opacity-50"
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </button>
                ) : (
                    <div className="text-sm text-gray-500">No more Pokémon</div>
                )}
            </div>
        </div>
    )
}

export default function PokemonListLoadMore() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Load More View</h1>
            <Suspense fallback={<GridSkeleton count={PAGE_SIZE} />}>
                <InfiniteGrid />
            </Suspense>
        </div>
    )
}
