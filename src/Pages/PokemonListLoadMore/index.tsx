import { Suspense } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getPokemonList } from "../../api/pokemon";
import PokemonGrid from "../../components/PokemonGrid";
import LoadMoreButton from "../../components/LoadMoreButton";
import BackButton from "../../components/BackButton";
import { GridSkeleton } from "../../components/SkeletonLoader";
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
            <PokemonGrid pokemon={all} />

            <div className="flex flex-col items-center gap-4 mt-6">
                <div className="text-gray-500 text-base">Showing {all.length} Pokemon</div>
                <LoadMoreButton
                    onLoadMore={fetchNextPage}
                    hasMore={!!hasNextPage}
                    isLoading={isFetchingNextPage}
                    pokemonCount={all.length}
                />
            </div>
        </div>
    );
}

export default function PokemonListLoadMore() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                    <BackButton onClick={() => navigate(-1)} />
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
