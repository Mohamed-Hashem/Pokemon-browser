import { useMemo, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { VirtuosoGrid } from "react-virtuoso";
import { getPokemonList } from "../../api/pokemon";
import PokemonCard from "../PokemonCard";
import LoadMoreButton from "../LoadMoreButton";
import { GridSkeleton } from "../SkeletonLoader";
import { PAGE_SIZE } from "../../constants";
import type { PokemonListResult } from "../../types";

const gridComponents = {
    List: ({ style, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div
            style={style}
            {...props}
            role="list"
            aria-label="Pokémon list"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
            {children}
        </div>
    ),
    Item: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div role="listitem" {...props}>
            {children}
        </div>
    ),
};

export default function InfiniteScrollView() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["pokemon-infinite"],
        queryFn: ({ pageParam = 0, signal }) => getPokemonList(PAGE_SIZE, pageParam as number, signal),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.next) return pages.length * PAGE_SIZE;
            return undefined;
        },
        initialPageParam: 0,
    });

    const all = useMemo(() => data?.pages.flatMap((p) => p.results) || [], [data?.pages]);

    const itemContent = useCallback(
        (_index: number, pokemon: PokemonListResult) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
        ),
        []
    );

    if (!data) return <GridSkeleton count={PAGE_SIZE} />;

    return (
        <div>
            <VirtuosoGrid
                useWindowScroll
                data={all}
                components={gridComponents}
                itemContent={itemContent}
                overscan={200}
            />
            <div className="flex justify-center mt-6">
                <LoadMoreButton
                    onLoadMore={fetchNextPage}
                    hasMore={!!hasNextPage}
                    isLoading={isFetchingNextPage}
                    pokemonCount={all.length}
                />
            </div>
            <div aria-live="polite" className="sr-only">
                {all.length} Pokémon loaded
            </div>
        </div>
    );
}
