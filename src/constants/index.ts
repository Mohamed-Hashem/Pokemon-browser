/**
 * API Configuration Constants
 */
export const API_BASE_URL = "https://pokeapi.co/api/v2";
export const API_TIMEOUT = 10000; // 10 seconds

/**
 * Pagination Constants
 */
export const PAGE_SIZE = 20;
export const MIN_LIMIT = 1;
export const MAX_LIMIT = 100;

/**
 * Cache Time Constants (in milliseconds)
 */
export const CACHE_TIME = {
    /** General query stale time - 5 minutes */
    STALE_TIME: 1000 * 60 * 5,
    /** Garbage collection time - 10 minutes */
    GC_TIME: 1000 * 60 * 10,
    /** Pokemon detail cache - 30 minutes (data rarely changes) */
    POKEMON_DETAIL_STALE_TIME: 1000 * 60 * 30,
};

/**
 * Query Configuration Constants
 */
export const QUERY_CONFIG = {
    RETRY: 1,
    REFETCH_ON_WINDOW_FOCUS: false,
    REFETCH_ON_RECONNECT: "always" as const,
    REFETCH_INTERVAL: false as const,
};
