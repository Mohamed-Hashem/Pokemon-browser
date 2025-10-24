import axios from "axios";

const API = "https://pokeapi.co/api/v2";

export const getPokemonList = async (limit = 12, offset = 0) => {
    const res = await axios.get(
        `${API}/pokemon?limit=${limit}&offset=${offset}`
    );
    return res.data; // { count, next, previous, results: [{name, url}, ...] }
};

export const getPokemonByName = async (name: string) => {
    const res = await axios.get(`${API}/pokemon/${name}`);
    return res.data;
};
