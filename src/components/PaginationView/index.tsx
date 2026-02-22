import { useEffect, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokemon";
import PokemonGrid from "../PokemonGrid";
import PaginationControls from "../PaginationControls";
import { GridSkeleton } from "../SkeletonLoader";
import { PAGE_SIZE, CACHE_TIME } from "../../constants";

interface PaginationViewProps {
    page: number;
    setPage: (page: number) => void;
}

export default function PaginationView({ page, setPage }: PaginationViewProps) {
    const queryClient = useQueryClient();
    const gridRef = useRef<HTMLDivElement>(null);
    const isFirstLoad = useRef(true);
    const offset = (page - 1) * PAGE_SIZE;
    const { data } = useQuery({
        queryKey: ["pokemon-page", page],
        queryFn: ({ signal }) => getPokemonList(PAGE_SIZE, offset, signal),
        staleTime: CACHE_TIME.STALE_TIME,
    });

    // Prefetch next page for instant navigation
    useEffect(() => {
        const nextOffset = page * PAGE_SIZE;
        queryClient.prefetchQuery({
            queryKey: ["pokemon-page", page + 1],
            queryFn: ({ signal }) => getPokemonList(PAGE_SIZE, nextOffset, signal),
            staleTime: CACHE_TIME.STALE_TIME,
        });
    }, [page, queryClient]);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        gridRef.current?.focus();
    }, [page]);

    const totalPages = useMemo(
        () => (data?.count ? Math.ceil(data.count / PAGE_SIZE) : 99),
        [data?.count]
    );

    if (!data) return <GridSkeleton count={PAGE_SIZE} />;

    return (
        <div>
            <div ref={gridRef} tabIndex={-1} className="outline-none">
                <PokemonGrid pokemons={data.results} />
            </div>
            <div aria-live="polite" className="sr-only">
                Showing page {page} of {totalPages}
            </div>
            <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}
