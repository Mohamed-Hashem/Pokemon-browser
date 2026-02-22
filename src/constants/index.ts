export const API_BASE_URL = "https://pokeapi.co/api/v2";
export const API_TIMEOUT = 10000; // 10 seconds
export const PAGE_SIZE = 20;
export const MIN_LIMIT = 1;
export const MAX_LIMIT = 100;

export const CACHE_TIME = {
    /** General query stale time - 30 minutes (Pokemon data rarely changes) */
    STALE_TIME: 1000 * 60 * 30,
    /** Garbage collection time - 10 minutes */
    GC_TIME: 1000 * 60 * 10,
    /** Pokemon detail cache - 30 minutes (data rarely changes) */
    POKEMON_DETAIL_STALE_TIME: 1000 * 60 * 30,
};

export const QUERY_CONFIG = {
    RETRY: 1,
    REFETCH_ON_WINDOW_FOCUS: false,
    REFETCH_ON_RECONNECT: "always" as const,
    REFETCH_INTERVAL: false as const,
};

export const UI = {
    /** Number of digits to pad Pokemon ID */
    ID_PADDING: 3,
    /** Units for height conversion from hectometres */
    HEIGHT_UNIT: "m",
    /** Height division factor (hectometres to metres) */
    HEIGHT_DIVISOR: 10,
    /** Units for weight conversion from hectograms */
    WEIGHT_UNIT: "kg",
    /** Weight division factor (hectograms to kilograms) */
    WEIGHT_DIVISOR: 10,
};
