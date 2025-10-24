import { Suspense } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPokemonList } from "../../api/pokemon";
import PokemonCard from "../../components/PokemonCard";
import { GridSkeleton } from "../../components/SkeletonLoader";
import type { PokemonListResult } from "../../types";
import { PAGE_SIZE } from "../../constants";

function InfiniteGrid() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["pokemon-infinite"],
        queryFn: ({ pageParam = 0 }) => getPokemonList(PAGE_SIZE, pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.next) return pages.length * PAGE_SIZE;
            return undefined;
        },
        initialPageParam: 0,
    });

    const all = data?.pages.flatMap((p) => p.results) || [];

    if (!data) return <GridSkeleton count={PAGE_SIZE} />;

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {all.map((p: PokemonListResult) => (
                    <PokemonCard key={p.name} name={p.name} />
                ))}
            </div>

            <div className="flex justify-center mt-6">
                {hasNextPage ? (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        aria-label={
                            isFetchingNextPage ? "Loading more Pokémon" : "Load more Pokémon"
                        }
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                ) : (
                    <div className="text-sm text-gray-500" role="status">
                        No more Pokémon
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PokemonListLoadMore() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        aria-label="Back to home"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span className="font-medium">Back</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Infinite Scroll</h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6">
                <Suspense fallback={<GridSkeleton count={PAGE_SIZE} />}>
                    <InfiniteGrid />
                </Suspense>
            </main>
        </div>
    );
}
