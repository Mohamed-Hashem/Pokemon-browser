/**
 * Pokemon Type Colors
 * Colors for each Pokemon type used throughout the application
 */
export const POKEMON_TYPE_COLORS: Record<string, string> = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
};

/**
 * Get the color for a specific Pokemon type
 * @param type - The Pokemon type name
 * @returns The hex color code for the type
 */
export const getTypeColor = (type: string): string => {
    return POKEMON_TYPE_COLORS[type.toLowerCase()] || POKEMON_TYPE_COLORS.normal;
};

/**
 * Gradient Colors for UI
 */
export const GRADIENT_COLORS = {
    /** Background gradient for main page */
    BACKGROUND: "linear-gradient(135deg, #e0e7ff 0%, #e9d5ff 50%, #fce7f3 100%)",
    /** Default gradient for Pokemon detail header */
    DEFAULT_HEADER: "linear-gradient(135deg, #A8A878 0%, #ff6b9d 100%)",
};
