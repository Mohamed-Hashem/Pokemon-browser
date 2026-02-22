import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokemon";
import PokemonGrid from "../PokemonGrid";
import LoadMoreButton from "../LoadMoreButton";
import { GridSkeleton } from "../SkeletonLoader";
import { PAGE_SIZE } from "../../constants";

export default function InfiniteScrollView() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["pokemon-infinite"],
        queryFn: ({ pageParam = 0 }) => getPokemonList(PAGE_SIZE, pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.next) return pages.length * PAGE_SIZE;
            return undefined;
        },
        initialPageParam: 0,
    });

    const all = useMemo(() => data?.pages.flatMap((p) => p.results) || [], [data?.pages]);

    if (!data) return <GridSkeleton count={PAGE_SIZE} />;

    return (
        <div>
            <PokemonGrid pokemons={all} />
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
