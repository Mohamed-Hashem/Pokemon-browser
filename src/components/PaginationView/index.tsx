import { useEffect, useMemo } from "react";
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
    const offset = (page - 1) * PAGE_SIZE;
    const { data } = useQuery({
        queryKey: ["pokemon-page", page],
        queryFn: () => getPokemonList(PAGE_SIZE, offset),
        staleTime: CACHE_TIME.STALE_TIME,
    });

    // Prefetch next page for instant navigation
    useEffect(() => {
        const nextOffset = page * PAGE_SIZE;
        queryClient.prefetchQuery({
            queryKey: ["pokemon-page", page + 1],
            queryFn: () => getPokemonList(PAGE_SIZE, nextOffset),
            staleTime: CACHE_TIME.STALE_TIME,
        });
    }, [page, queryClient]);

    const totalPages = useMemo(
        () => (data?.count ? Math.ceil(data.count / PAGE_SIZE) : 99),
        [data?.count]
    );

    if (!data) return <GridSkeleton count={PAGE_SIZE} />;

    return (
        <div>
            <PokemonGrid pokemons={data.results} />
            <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}
