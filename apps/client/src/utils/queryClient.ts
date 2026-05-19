import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // retry 2 times
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 2, // Data remains fresh for 2 minutes
      gcTime: 1000 * 60 * 5, // Unused data remains in cache for 5 minutes
    },
  },
});
