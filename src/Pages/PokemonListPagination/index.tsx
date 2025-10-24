import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokemon";
import PokemonGrid from "../../components/PokemonGrid";
import PaginationControls from "../../components/PaginationControls";
import BackButton from "../../components/BackButton";
import { GridSkeleton } from "../../components/SkeletonLoader";
import { PAGE_SIZE } from "../../constants";
import { useNavigate } from "react-router-dom";

function PokemonGridWrapper({ page }: { page: number }) {
    const offset = (page - 1) * PAGE_SIZE;
    const { data } = useQuery({
        queryKey: ["pokemon-page", page],
        queryFn: () => getPokemonList(PAGE_SIZE, offset),
    });

    if (!data) return <GridSkeleton count={PAGE_SIZE} />;

    return <PokemonGrid pokemon={data.results} />;
}

export default function PokemonListPagination() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

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
                    <BackButton onClick={() => navigate(-1)} />
                    <h1 className="text-2xl font-bold text-gray-800">Page Controls</h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6">
                <Suspense fallback={<GridSkeleton count={PAGE_SIZE} />}>
                    <PokemonGridWrapper page={page} />
                </Suspense>

                <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
            </main>
        </div>
    );
}
