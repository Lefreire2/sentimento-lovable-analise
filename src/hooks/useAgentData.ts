
import { useQuery } from "@tanstack/react-query";
import { fetchAgentData } from "./services/agentDataFetcher";
import { AgentData } from "./types/agentTypes";

export const useAgentData = (selectedAgent: string) => {
    return useQuery<AgentData>({
        queryKey: ['agentMetrics', selectedAgent],
        queryFn: () => fetchAgentData(selectedAgent),
        enabled: !!selectedAgent,
        retry: 1,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
        staleTime: 0, // Sempre buscar dados frescos
        gcTime: 0, // Não manter cache
    });
};

export type { AgentData };
