import { Suspense, useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokemon";
import PokemonCard from "../../components/PokemonCard";
import PaginationControls from "../../components/PaginationControls";
import { GridSkeleton } from "../../components/SkeletonLoader";
import type { PokemonListResult } from "../../types";
import { PAGE_SIZE } from "../../constants";
import { GRADIENT_COLORS } from "../../constants/colors";

function PaginationView({ page, setPage }: { page: number; setPage: (page: number) => void }) {
    const offset = (page - 1) * PAGE_SIZE;
    const { data } = useQuery({
        queryKey: ["pokemon-page", page],
        queryFn: () => getPokemonList(PAGE_SIZE, offset),
    });

    if (!data) return <GridSkeleton count={PAGE_SIZE} />;

    const totalPages = data?.count ? Math.ceil(data.count / PAGE_SIZE) : 99;

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {data.results.map((p: PokemonListResult) => (
                    <PokemonCard key={p.name} name={p.name} />
                ))}
            </div>
            <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}

function InfiniteScrollView() {
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

export default function Home() {
    const [viewMode, setViewMode] = useState<"pagination" | "infinite">("pagination");
    const [page, setPage] = useState(1);

    return (
        <div
            className="min-h-screen"
            style={{
                background: GRADIENT_COLORS.BACKGROUND,
            }}
        >
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-3 text-gray-800">⚡ Pokédex</h1>
                    <p className="text-gray-600 mb-6">
                        Discover and explore Pokemon with page controls
                    </p>

                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => setViewMode("pagination")}
                            className={`cursor-pointer px-6 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                viewMode === "pagination"
                                    ? "bg-gray-900 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            Page Controls
                        </button>
                        <button
                            onClick={() => setViewMode("infinite")}
                            className={`cursor-pointer px-6 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                viewMode === "infinite"
                                    ? "bg-gray-900 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            Infinite Scroll
                        </button>
                    </div>
                </div>

                <Suspense fallback={<GridSkeleton count={PAGE_SIZE} />}>
                    {viewMode === "pagination" ? (
                        <PaginationView page={page} setPage={setPage} />
                    ) : (
                        <InfiniteScrollView />
                    )}
                </Suspense>
            </div>
        </div>
    );
}
