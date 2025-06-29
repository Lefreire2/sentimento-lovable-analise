
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  IntentionAnalysis, 
  ConversationContext, 
  AppointmentOptimization,
  SystemMetrics,
  ClosedLoopData 
} from '@/types/evolutiveSystem';

export interface AnalysisSettings {
  startDate?: string;
  endDate?: string;
  period?: string;
}

export const useEvolutiveSystem = () => {
  const queryClient = useQueryClient();
  const [systemStatus, setSystemStatus] = useState<'initializing' | 'active' | 'optimizing' | 'error'>('initializing');

  // Hook para análise de dados reais com configurações de período
  const useRealDataAnalysis = (agentName: string, analysisType: string, analysisSettings?: AnalysisSettings) => {
    return useQuery<any>({
      queryKey: ['real-data-analysis', agentName, analysisType, analysisSettings],
      queryFn: async () => {
        console.log('🔍 Iniciando análise de dados reais para:', agentName, analysisType);
        console.log('📅 Configurações de período:', analysisSettings);
        
        const { data, error } = await supabase.functions.invoke('analyze-real-data', {
          body: { agentName, analysisType, analysisSettings }
        });
        
        if (error) {
          console.error('❌ Erro na análise de dados reais:', error);
          throw error;
        }
        
        console.log('✅ Análise de dados reais concluída:', data);
        return data;
      },
      enabled: !!agentName,
      staleTime: 5 * 60 * 1000, // 5 minutos
    });
  };

  // Hook para análise de intenção em tempo real
  const useIntentionAnalysis = (leadId: string) => {
    return useQuery<IntentionAnalysis>({
      queryKey: ['intention-analysis', leadId],
      queryFn: async () => {
        console.log('🧠 Iniciando análise de intenção para lead:', leadId);
        
        const { data, error } = await supabase.functions.invoke('analyze-intention', {
          body: { leadId }
        });
        
        if (error) {
          console.error('❌ Erro na análise de intenção:', error);
          throw error;
        }
        
        console.log('✅ Análise de intenção concluída:', data);
        return data;
      },
      enabled: !!leadId,
      staleTime: 2 * 60 * 1000, // 2 minutos
    });
  };

  // Hook para otimização de agendamentos
  const useAppointmentOptimization = () => {
    return useMutation({
      mutationFn: async (data: { leadId: string; conversationData: ConversationContext }) => {
        console.log('🎯 Iniciando otimização de agendamento:', data);
        
        const { data: result, error } = await supabase.functions.invoke('optimize-appointment', {
          body: data
        });
        
        if (error) {
          console.error('❌ Erro na otimização de agendamento:', error);
          throw error;
        }
        
        console.log('✅ Otimização de agendamento concluída:', result);
        return result;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['appointment-optimizations'] });
      }
    });
  };

  // Hook para métricas do sistema evolutivo
  const useSystemMetrics = (period: string = 'last30days') => {
    return useQuery<SystemMetrics>({
      queryKey: ['system-metrics', period],
      queryFn: async () => {
        console.log('📊 Calculando métricas do sistema para período:', period);
        
        const { data, error } = await supabase.functions.invoke('calculate-system-metrics', {
          body: { period }
        });
        
        if (error) {
          console.error('❌ Erro no cálculo de métricas:', error);
          throw error;
        }
        
        console.log('✅ Métricas do sistema calculadas:', data);
        return data;
      },
      refetchInterval: 5 * 60 * 1000, // Atualiza a cada 5 minutos
    });
  };

  // Hook para dados do closed-loop
  const useClosedLoopData = () => {
    return useQuery<ClosedLoopData>({
      queryKey: ['closed-loop-data'],
      queryFn: async () => {
        console.log('🔄 Obtendo dados do closed-loop...');
        
        const { data, error } = await supabase.functions.invoke('get-closed-loop-data');
        
        if (error) {
          console.error('❌ Erro ao obter dados do closed-loop:', error);
          throw error;
        }
        
        console.log('✅ Dados do closed-loop obtidos:', data);
        return data;
      },
      refetchInterval: 10 * 60 * 1000, // Atualiza a cada 10 minutos
    });
  };

  // Função para processar feedback de marketing
  const processMarketingFeedback = useMutation({
    mutationFn: async (feedbackData: any) => {
      console.log('📈 Processando feedback de marketing:', feedbackData);
      
      const { data, error } = await supabase.functions.invoke('process-marketing-feedback', {
        body: feedbackData
      });
      
      if (error) {
        console.error('❌ Erro no processamento de feedback:', error);
        throw error;
      }
      
      console.log('✅ Feedback de marketing processado:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['closed-loop-data'] });
      queryClient.invalidateQueries({ queryKey: ['system-metrics'] });
    }
  });

  // Inicialização do sistema
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        console.log('🚀 Inicializando Sistema Evolutivo...');
        setSystemStatus('initializing');
        
        // Verificar se as funções necessárias estão disponíveis
        console.log('🔍 Verificando saúde do sistema...');
        const { data: healthCheck, error } = await supabase.functions.invoke('system-health-check');
        
        if (error) {
          console.error('❌ Erro na verificação de saúde:', error);
          setSystemStatus('error');
          return;
        }
        
        console.log('✅ Verificação de saúde concluída:', healthCheck);
        
        if (healthCheck?.status === 'healthy') {
          setSystemStatus('active');
          console.log('🚀 Sistema Evolutivo inicializado com sucesso');
        } else {
          setSystemStatus('error');
          console.error('❌ Sistema não está saudável:', healthCheck);
        }
      } catch (error) {
        setSystemStatus('error');
        console.error('💥 Erro na inicialização do sistema:', error);
      }
    };

    initializeSystem();
  }, []);

  return {
    systemStatus,
    useRealDataAnalysis,
    useIntentionAnalysis,
    useAppointmentOptimization,
    useSystemMetrics,
    useClosedLoopData,
    processMarketingFeedback
  };
};
