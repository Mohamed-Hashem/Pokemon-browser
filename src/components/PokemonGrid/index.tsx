import { memo } from "react";
import PokemonCard from "../PokemonCard";
import type { PokemonListResult } from "../../types";

interface PokemonGridProps {
    pokemons: PokemonListResult[];
}

export default memo(function PokemonGrid({ pokemons }: PokemonGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemons.map((p: PokemonListResult) => (
                <PokemonCard key={p.name} name={p.name} />
            ))}
        </div>
    );
});
