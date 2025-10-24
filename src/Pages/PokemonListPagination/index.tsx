import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
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
                    <h1 className="text-2xl font-bold text-gray-800">Page Controls</h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6">
                <Suspense fallback={<GridSkeleton count={PAGE_SIZE} />}>
                    <PokemonGrid page={page} />
                </Suspense>

                <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
            </main>
        </div>
    );
}
