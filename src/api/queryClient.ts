import { QueryClient } from "@tanstack/react-query";
import { CACHE_TIME, QUERY_CONFIG } from "../constants";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: QUERY_CONFIG.RETRY,
            refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
            staleTime: CACHE_TIME.STALE_TIME,
            gcTime: CACHE_TIME.GC_TIME,
            refetchOnReconnect: QUERY_CONFIG.REFETCH_ON_RECONNECT,
            refetchInterval: QUERY_CONFIG.REFETCH_INTERVAL,
        },
    },
});
