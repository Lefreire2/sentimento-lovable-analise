
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCacheManager } from '@/hooks/useCacheManager';
import { RefreshCw, Database } from 'lucide-react';

interface SystemRefreshButtonProps {
  selectedAgent?: string;
  onRefreshComplete?: () => void;
}

export const SystemRefreshButton = ({ selectedAgent, onRefreshComplete }: SystemRefreshButtonProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const { forceRefreshAllData, clearAgentCache } = useCacheManager();

  const handleRefresh = async () => {
    console.log('🔄 SISTEMA - Iniciando atualização manual');
    setIsRefreshing(true);

    try {
      if (selectedAgent) {
        console.log('🎯 SISTEMA - Atualizando dados específicos do agente:', selectedAgent);
        await clearAgentCache(selectedAgent);
        
        toast({
          title: "Dados Atualizados",
          description: `Cache do agente ${selectedAgent} limpo com sucesso`,
        });
      } else {
        console.log('🌐 SISTEMA - Atualizando todos os dados do sistema');
        await forceRefreshAllData();
        
        toast({
          title: "Sistema Atualizado",
          description: "Todos os dados foram atualizados do banco de dados",
        });
      }

      // Aguardar um pouco para garantir que o cache foi limpo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onRefreshComplete?.();
      
      console.log('✅ SISTEMA - Atualização concluída com sucesso');
    } catch (error) {
      console.error('❌ SISTEMA - Erro na atualização:', error);
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
