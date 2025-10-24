import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
});

export const getPokemonList = async (limit = 12, offset = 0) => {
    const validLimit = Math.min(Math.max(1, limit), 100);
    const validOffset = Math.max(0, offset);

    const { data } = await api.get("/pokemon", {
        params: {
            limit: validLimit,
            offset: validOffset,
        },
    });
    return data;
};

export const getPokemonByName = async (name: string) => {
    if (!name || typeof name !== "string") {
        throw new Error("Invalid Pokémon name");
    }

    const { data } = await api.get(`/pokemon/${name}`);
    return data;
};
