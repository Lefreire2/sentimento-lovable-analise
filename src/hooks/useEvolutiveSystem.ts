
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

export const useEvolutiveSystem = () => {
  const queryClient = useQueryClient();
  const [systemStatus, setSystemStatus] = useState<'initializing' | 'active' | 'optimizing' | 'error'>('initializing');

  // Hook para análise de intenção em tempo real
  const useIntentionAnalysis = (leadId: string) => {
    return useQuery<IntentionAnalysis>({
      queryKey: ['intention-analysis', leadId],
      queryFn: async () => {
        const { data, error } = await supabase.functions.invoke('analyze-intention', {
          body: { leadId }
        });
        
        if (error) throw error;
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
        const { data: result, error } = await supabase.functions.invoke('optimize-appointment', {
          body: data
        });
        
        if (error) throw error;
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
        const { data, error } = await supabase.functions.invoke('calculate-system-metrics', {
          body: { period }
        });
        
        if (error) throw error;
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
        const { data, error } = await supabase.functions.invoke('get-closed-loop-data');
        
        if (error) throw error;
        return data;
      },
      refetchInterval: 10 * 60 * 1000, // Atualiza a cada 10 minutos
    });
  };

  // Função para processar feedback de marketing
  const processMarketingFeedback = useMutation({
    mutationFn: async (feedbackData: any) => {
      const { data, error } = await supabase.functions.invoke('process-marketing-feedback', {
        body: feedbackData
      });
      
      if (error) throw error;
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
        setSystemStatus('initializing');
        
        // Verificar se as funções necessárias estão disponíveis
        const { data: healthCheck } = await supabase.functions.invoke('system-health-check');
        
        if (healthCheck?.status === 'healthy') {
          setSystemStatus('active');
          console.log('🚀 Sistema Evolutivo inicializado com sucesso');
        } else {
          setSystemStatus('error');
          console.error('❌ Falha na inicialização do sistema');
        }
      } catch (error) {
        setSystemStatus('error');
        console.error('💥 Erro na inicialização:', error);
      }
    };

    initializeSystem();
  }, []);

  return {
    systemStatus,
    useIntentionAnalysis,
    useAppointmentOptimization,
    useSystemMetrics,
    useClosedLoopData,
    processMarketingFeedback
  };
};
