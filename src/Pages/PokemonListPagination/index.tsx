import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokemon";
import PokemonCard from "../../components/PokemonCard";
import PaginationControls from "../../components/PaginationControls";
import { GridSkeleton } from "../../components/SkeletonLoader";
import type { PokemonListResult } from "../../types";
import { PAGE_SIZE } from "../../constants";

function PokemonGrid({ page }: { page: number }) {
    const offset = (page - 1) * PAGE_SIZE;
    const { data } = useQuery({
        queryKey: ["pokemon-page", page],
        queryFn: () => getPokemonList(PAGE_SIZE, offset),
    });

    if (!data) return <GridSkeleton count={PAGE_SIZE} />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.results.map((p: PokemonListResult) => (
                <PokemonCard key={p.name} name={p.name} />
            ))}
        </div>
    );
}

export default function PokemonListPagination() {
    const [page, setPage] = useState(1);

    const offset = (page - 1) * PAGE_SIZE;
    const { data } = useQuery({
        queryKey: ["pokemon-page-meta", page],
        queryFn: () => getPokemonList(PAGE_SIZE, offset),
    });

    const totalPages = data?.count ? Math.ceil(data.count / PAGE_SIZE) : 99;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4" id="page-title">
                Pagination View
            </h1>

            <Suspense fallback={<GridSkeleton count={PAGE_SIZE} />}>
                <PokemonGrid page={page} />
            </Suspense>

            <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}
