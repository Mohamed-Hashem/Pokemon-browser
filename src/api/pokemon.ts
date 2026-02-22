import axios from "axios";
import { API_BASE_URL, API_TIMEOUT, PAGE_SIZE, MIN_LIMIT, MAX_LIMIT } from "../constants";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
});

export const getPokemonList = async (limit = PAGE_SIZE, offset = 0, signal?: AbortSignal) => {
    const validLimit = Math.min(Math.max(MIN_LIMIT, limit), MAX_LIMIT);
    const validOffset = Math.max(0, offset);

    const { data } = await api.get("/pokemon", {
        params: {
            limit: validLimit,
            offset: validOffset,
        },
        signal,
    });
    return data;
};

export const getPokemonByName = async (name: string, signal?: AbortSignal) => {
    if (!name || typeof name !== "string") {
        throw new Error("Invalid Pokémon name");
    }

    const sanitized = encodeURIComponent(name.trim().toLowerCase());
    const { data } = await api.get(`/pokemon/${sanitized}`, { signal });
    return data;
};
