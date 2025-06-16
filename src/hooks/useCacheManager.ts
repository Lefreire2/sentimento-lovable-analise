
import { useQueryClient } from "@tanstack/react-query";

export const useCacheManager = () => {
    const queryClient = useQueryClient();

    const clearAllCache = async () => {
        console.log('🔄 CACHE-MANAGER - LIMPEZA TOTAL INICIADA');
        
        // Limpar TODOS os caches relacionados a dados
        await queryClient.clear();
        
        console.log('✅ CACHE-MANAGER - Cache completamente LIMPO');
    };

    const clearAgentCache = async (agentName: string) => {
        console.log('🔄 CACHE-MANAGER - Limpando cache ESPECÍFICO para agente:', agentName);
        
        const queries = [
            ['agentMetrics', agentName],
            ['funnelData', agentName],
            ['sentimentMetrics', agentName],
            ['performanceMetrics', agentName],
            ['timeMetrics', agentName]
        ];
        
        for (const queryKey of queries) {
            await queryClient.invalidateQueries({ queryKey });
            queryClient.removeQueries({ queryKey });
        }
        
        console.log('✅ CACHE-MANAGER - Cache do agente LIMPO:', agentName);
    };

    const forceRefreshAllData = async () => {
        console.log('🔄 CACHE-MANAGER - REFRESH TOTAL FORÇADO');
        
        // Limpar tudo primeiro
        await clearAllCache();
        
        // Aguardar para garantir limpeza
        await new Promise(resolve => setTimeout(resolve, 200));
        
        console.log('✅ CACHE-MANAGER - Refresh completo FINALIZADO');
    };

    return {
        clearAllCache,
        clearAgentCache,
        forceRefreshAllData
    };
};
