import PokemonCard from "../PokemonCard";
import type { PokemonListResult } from "../../types";

interface PokemonGridProps {
    pokemon: PokemonListResult[];
}

export default function PokemonGrid({ pokemon }: PokemonGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemon.map((p: PokemonListResult) => (
                <PokemonCard key={p.name} name={p.name} />
            ))}
        </div>
    );
}
