import axios from "axios";
import {
    API_BASE_URL,
    API_TIMEOUT,
    PAGE_SIZE,
    MIN_LIMIT,
    MAX_LIMIT,
} from "../constants";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
});

export const getPokemonList = async (limit = PAGE_SIZE, offset = 0) => {
    const validLimit = Math.min(Math.max(MIN_LIMIT, limit), MAX_LIMIT);
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
