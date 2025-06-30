
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCacheManager } from '@/hooks/useCacheManager';
import { RefreshCw, Database } from 'lucide-react';
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
        
        // Limpar cache específico do agente
        await clearAgentCache(selectedAgent);
        
        // Invalidar queries específicas de análise de dados reais
        await queryClient.invalidateQueries({ 
          queryKey: ['real-data-analysis', selectedAgent] 
        });
        
        // Força refetch de todas as queries deste agente
        await queryClient.refetchQueries({ 
          queryKey: ['real-data-analysis', selectedAgent] 
        });
        
        toast({
          title: "Dados Atualizados",
          description: `Cache do agente ${selectedAgent} limpo e dados recarregados`,
        });
      } else {
        console.log('🌐 SYSTEM-REFRESH - Atualizando todos os dados do sistema');
        
        // Limpar todo o cache
        await forceRefreshAllData();
        
        // Invalidar todas as queries de análise
        await queryClient.invalidateQueries({ 
          queryKey: ['real-data-analysis'] 
        });
        
        // Força refetch de todas as queries
        await queryClient.refetchQueries({ 
          queryKey: ['real-data-analysis'] 
        });
        
        toast({
          title: "Sistema Atualizado",
          description: "Todos os dados foram atualizados do banco de dados",
        });
      }

      // Aguardar um pouco para garantir que o cache foi limpo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onRefreshComplete?.();
      
      console.log('✅ SYSTEM-REFRESH - Atualização concluída com sucesso');
    } catch (error) {
      console.error('❌ SYSTEM-REFRESH - Erro na atualização:', error);
      toast({
        title: "Erro na Atualização",
        description: "Não foi possível atualizar os dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={isRefreshing}
      variant="outline"
      className="flex items-center gap-2"
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      <Database className="h-4 w-4" />
      {isRefreshing ? 'Atualizando...' : 'Atualizar Sistema'}
    </Button>
  );
};
