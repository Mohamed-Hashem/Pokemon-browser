import { Suspense, useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokemon";
import PokemonGrid from "../../components/PokemonGrid";
import PaginationControls from "../../components/PaginationControls";
import LoadMoreButton from "../../components/LoadMoreButton";
import ViewToggle from "../../components/ViewToggle";
import PageHeader from "../../components/PageHeader";
import { GridSkeleton } from "../../components/SkeletonLoader";
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
            <PokemonGrid pokemon={data.results} />
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
            <PokemonGrid pokemon={all} />
            <div className="flex justify-center mt-6">
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

export default function Home() {
    const [viewMode, setViewMode] = useState<"pagination" | "infinite">("pagination");
    const [page, setPage] = useState(1);

    return (
        <div className="min-h-screen" style={{ background: GRADIENT_COLORS.BACKGROUND }}>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <PageHeader
                    title="⚡ Pokédex"
                    subtitle="Discover and explore Pokemon with page controls"
                >
                    <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                </PageHeader>

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
