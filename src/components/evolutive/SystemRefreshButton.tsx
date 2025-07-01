
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCacheManager } from '@/hooks/useCacheManager';
import { RefreshCw, Database, AlertCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface SystemRefreshButtonProps {
  selectedAgent?: string;
  onRefreshComplete?: () => void;
}

export const SystemRefreshButton = ({ selectedAgent, onRefreshComplete }: SystemRefreshButtonProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const { forceRefreshAllData, clearAgentCache } = useCacheManager();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    console.log('🔄 SYSTEM-REFRESH - Iniciando atualização manual');
    setIsRefreshing(true);

    try {
      if (selectedAgent) {
        console.log('🎯 SYSTEM-REFRESH - Atualizando dados específicos do agente:', selectedAgent);
        
        // Limpar todos os caches relacionados ao agente
        await clearAgentCache(selectedAgent);
        
        // Invalidar todas as queries do agente
        const queryKeysToInvalidate = [
          ['real-data-analysis', selectedAgent],
          ['agent-data', selectedAgent],
          ['funnel-data', selectedAgent],
          ['performance-metrics', selectedAgent],
          ['sentiment-metrics', selectedAgent],
          ['time-metrics', selectedAgent]
        ];

        for (const queryKey of queryKeysToInvalidate) {
          await queryClient.invalidateQueries({ queryKey });
          await queryClient.removeQueries({ queryKey });
        }
        
        // Força refetch de todas as queries deste agente
        await queryClient.refetchQueries({ 
          predicate: (query) => {
            const key = query.queryKey;
            return Array.isArray(key) && key.includes(selectedAgent);
          }
        });
        
        toast({
          title: "Dados Atualizados com Sucesso",
          description: `Cache do agente ${selectedAgent} limpo e dados recarregados`,
        });
      } else {
        console.log('🌐 SYSTEM-REFRESH - Atualizando todos os dados do sistema');
        
        // Limpar todo o cache
        await forceRefreshAllData();
        
        // Invalidar todas as queries de análise
        await queryClient.clear();
        
        toast({
          title: "Sistema Completamente Atualizado",
          description: "Todos os dados foram limpos e recarregados do banco de dados",
        });
      }

      // Aguardar um pouco para garantir que o cache foi limpo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onRefreshComplete?.();
      
      console.log('✅ SYSTEM-REFRESH - Atualização concluída com sucesso');
    } catch (error) {
      console.error('❌ SYSTEM-REFRESH - Erro na atualização:', error);
      toast({
        title: "Erro na Atualização",
        description: "Não foi possível atualizar os dados. Verifique a conexão e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleRefresh}
        disabled={isRefreshing}
        variant="outline"
        className="flex items-center gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        <Database className="h-4 w-4" />
        {isRefreshing ? 'Atualizando...' : 'Forçar Atualização'}
      </Button>
      
      {isRefreshing && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <AlertCircle className="h-3 w-3" />
          Limpando cache e recarregando...
        </div>
      )}
    </div>
  );
};
