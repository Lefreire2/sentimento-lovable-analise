
import { useQueryClient } from "@tanstack/react-query";

export const useCacheManager = () => {
    const queryClient = useQueryClient();

    const clearAllCache = async () => {
        console.log('🔄 CACHE-MANAGER - Limpando TODOS os caches');
        
        // Limpar cache específico de agentes
        await queryClient.invalidateQueries({ 
            predicate: (query) => {
                const queryKey = query.queryKey;
                return queryKey.some(key => 
                    typeof key === 'string' && 
                    (key.includes('agentMetrics') || 
                     key.includes('funnelData') || 
                     key.includes('sentimentMetrics') || 
                     key.includes('performanceMetrics') || 
                     key.includes('timeMetrics'))
                );
            }
        });
        
        // Remover dados do cache completamente
        queryClient.removeQueries({ 
            predicate: (query) => {
                const queryKey = query.queryKey;
                return queryKey.some(key => 
                    typeof key === 'string' && 
                    (key.includes('agentMetrics') || 
                     key.includes('funnelData') || 
                     key.includes('sentimentMetrics') || 
                     key.includes('performanceMetrics') || 
                     key.includes('timeMetrics'))
                );
            }
        });
        
        console.log('✅ CACHE-MANAGER - Cache completamente limpo');
    };

    const clearAgentCache = async (agentName: string) => {
        console.log('🔄 CACHE-MANAGER - Limpando cache para agente:', agentName);
        
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
        
        console.log('✅ CACHE-MANAGER - Cache do agente limpo:', agentName);
    };

    const forceRefreshAllData = async () => {
        console.log('🔄 CACHE-MANAGER - Forçando refresh de TODOS os dados');
        
        // Primeiro limpar tudo
        await clearAllCache();
        
        // Aguardar um pouco para garantir que o cache foi limpo
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('✅ CACHE-MANAGER - Refresh completo finalizado');
    };

    return {
        clearAllCache,
        clearAgentCache,
        forceRefreshAllData
    };
};
