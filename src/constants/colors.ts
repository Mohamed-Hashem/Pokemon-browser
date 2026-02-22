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

export const getTypeColor = (type: string): string => {
    return POKEMON_TYPE_COLORS[type.toLowerCase()] || POKEMON_TYPE_COLORS.normal;
};

/**
 * Returns the appropriate text color (dark or white) for a given type background.
 * Uses relative luminance to meet WCAG 2.1 AA contrast ratio (4.5:1).
 */
export const getTextColorForType = (type: string): string => {
    const hex = getTypeColor(type);
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    // sRGB luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.45 ? "#1a1a1a" : "#ffffff";
};

export const GRADIENT_COLORS = {
    BACKGROUND: "linear-gradient(135deg, #e0e7ff 0%, #e9d5ff 50%, #fce7f3 100%)",
    DEFAULT_HEADER: "linear-gradient(135deg, #A8A878 0%, #ff6b9d 100%)",
};
