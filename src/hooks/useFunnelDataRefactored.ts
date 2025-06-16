
import { useQuery } from "@tanstack/react-query";
import { fetchFunnelData } from "./services/funnelDataFetcher";
import { FunnelData } from "./types/funnelTypes";

export const useFunnelData = (selectedAgent: string) => {
    return useQuery<FunnelData>({
        queryKey: ['funnelData', selectedAgent],
        queryFn: () => fetchFunnelData(selectedAgent),
        enabled: !!selectedAgent,
        retry: 1,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
        staleTime: 0, // Sempre buscar dados frescos
        gcTime: 0, // Não manter cache
    });
};

export type { FunnelData };
