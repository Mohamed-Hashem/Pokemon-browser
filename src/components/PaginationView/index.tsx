import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokemon";
import PokemonGrid from "../PokemonGrid";
import PaginationControls from "../PaginationControls";
import { GridSkeleton } from "../SkeletonLoader";
import { PAGE_SIZE } from "../../constants";

interface PaginationViewProps {
    page: number;
    setPage: (page: number) => void;
}

export default function PaginationView({ page, setPage }: PaginationViewProps) {
    const offset = (page - 1) * PAGE_SIZE;
    const { data } = useQuery({
        queryKey: ["pokemon-page", page],
        queryFn: () => getPokemonList(PAGE_SIZE, offset),
    });

    if (!data) return <GridSkeleton count={PAGE_SIZE} />;

    const totalPages = data?.count ? Math.ceil(data.count / PAGE_SIZE) : 99;

    return (
        <div>
            <PokemonGrid pokemons={data.results} />
            <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}
