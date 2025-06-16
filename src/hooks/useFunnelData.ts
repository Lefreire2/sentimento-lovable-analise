
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FunnelData } from "./types/funnelTypes";
import { fetchFunnelData } from "./services/funnelDataFetcher";

export const useFunnelData = (selectedAgent: string) => {
    const queryClient = useQueryClient();
    
    const query = useQuery<FunnelData>({
        queryKey: ['funnelData', selectedAgent],
        queryFn: () => fetchFunnelData(selectedAgent),
        enabled: !!selectedAgent,
        retry: 1,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
        staleTime: 0, // Sempre buscar dados frescos
        gcTime: 0, // Não manter cache
    });

    const invalidateAndRefetch = async () => {
        console.log('🔄 FUNIL - Invalidando cache e recarregando dados FORÇADAMENTE para:', selectedAgent);
        await queryClient.invalidateQueries({ 
            queryKey: ['funnelData', selectedAgent] 
        });
        await queryClient.removeQueries({ 
            queryKey: ['funnelData', selectedAgent] 
        });
        return query.refetch();
    };

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: invalidateAndRefetch,
        isFetching: query.isFetching
    };
};
