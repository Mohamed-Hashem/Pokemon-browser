export interface PokemonListResult {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListResult[];
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string | null;
        other?: unknown;
    };
    types: PokemonType[];
}
