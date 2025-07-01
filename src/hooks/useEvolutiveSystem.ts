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
        console.log('🔍 EVOLUTIVE-SYSTEM - Iniciando análise de dados reais para:', agentName, analysisType);
        console.log('📅 EVOLUTIVE-SYSTEM - Configurações de período:', analysisSettings);
        
        // Verificar se o agente é válido
        if (!agentName || agentName.trim() === '') {
          console.error('❌ EVOLUTIVE-SYSTEM - Nome do agente inválido:', agentName);
          throw new Error('Nome do agente é obrigatório');
        }
        
        try {
          const { data, error } = await supabase.functions.invoke('analyze-real-data', {
            body: { 
              agentName: agentName.trim(), 
              analysisType: analysisType.trim(), 
              analysisSettings: analysisSettings || {}
            }
          });
          
          if (error) {
            console.error('❌ EVOLUTIVE-SYSTEM - Erro na análise de dados reais:', error);
            throw new Error(`Erro na análise: ${error.message || 'Erro desconhecido'}`);
          }
          
          if (!data) {
            console.warn('⚠️ EVOLUTIVE-SYSTEM - Nenhum dado retornado da análise');
            throw new Error('Nenhum dado retornado da análise');
          }
          
          // Validar estrutura dos dados retornados
          const validatedData = validateAndNormalizeData(data, analysisType);
          
          console.log('✅ EVOLUTIVE-SYSTEM - Análise de dados reais concluída:', validatedData);
          return validatedData;
        } catch (error) {
          console.error('💥 EVOLUTIVE-SYSTEM - Erro crítico na análise:', error);
          // Re-throw com mensagem mais clara
          if (error instanceof Error) {
            throw error;
          }
          throw new Error('Erro desconhecido na análise de dados');
        }
      },
      enabled: !!agentName && agentName.trim() !== '',
      staleTime: 30 * 1000, // 30 segundos - dados mais frescos
      gcTime: 2 * 60 * 1000, // 2 minutos
      retry: (failureCount, error) => {
        console.log(`🔄 EVOLUTIVE-SYSTEM - Tentativa ${failureCount} falhou:`, error);
        return failureCount < 1; // Apenas 1 retry para evitar loops
      },
      retryDelay: 2000, // 2 segundos entre tentativas
    });
  };

  // Hook para análise de intenção em tempo real
  const useIntentionAnalysis = (leadId: string) => {
    return useQuery<IntentionAnalysis>({
      queryKey: ['intention-analysis', leadId],
      queryFn: async () => {
        console.log('🧠 EVOLUTIVE-SYSTEM - Iniciando análise de intenção para lead:', leadId);
        
        const { data, error } = await supabase.functions.invoke('analyze-intention', {
          body: { leadId }
        });
        
        if (error) {
          console.error('❌ EVOLUTIVE-SYSTEM - Erro na análise de intenção:', error);
          throw error;
        }
        
        console.log('✅ EVOLUTIVE-SYSTEM - Análise de intenção concluída:', data);
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
        console.log('🎯 EVOLUTIVE-SYSTEM - Iniciando otimização de agendamento:', data);
        
        const { data: result, error } = await supabase.functions.invoke('optimize-appointment', {
          body: data
        });
        
        if (error) {
          console.error('❌ EVOLUTIVE-SYSTEM - Erro na otimização de agendamento:', error);
          throw error;
        }
        
        console.log('✅ EVOLUTIVE-SYSTEM - Otimização de agendamento concluída:', result);
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
        console.log('📊 EVOLUTIVE-SYSTEM - Calculando métricas do sistema para período:', period);
        
        const { data, error } = await supabase.functions.invoke('calculate-system-metrics', {
          body: { period }
        });
        
        if (error) {
          console.error('❌ EVOLUTIVE-SYSTEM - Erro no cálculo de métricas:', error);
          throw error;
        }
        
        console.log('✅ EVOLUTIVE-SYSTEM - Métricas do sistema calculadas:', data);
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
        console.log('🔄 EVOLUTIVE-SYSTEM - Obtendo dados do closed-loop...');
        
        const { data, error } = await supabase.functions.invoke('get-closed-loop-data');
        
        if (error) {
          console.error('❌ EVOLUTIVE-SYSTEM - Erro ao obter dados do closed-loop:', error);
          throw error;
        }
        
        console.log('✅ EVOLUTIVE-SYSTEM - Dados do closed-loop obtidos:', data);
        return data;
      },
      refetchInterval: 10 * 60 * 1000, // Atualiza a cada 10 minutos
    });
  };

  // Função para processar feedback de marketing
  const processMarketingFeedback = useMutation({
    mutationFn: async (feedbackData: any) => {
      console.log('📈 EVOLUTIVE-SYSTEM - Processando feedback de marketing:', feedbackData);
      
      const { data, error } = await supabase.functions.invoke('process-marketing-feedback', {
        body: feedbackData
      });
      
      if (error) {
        console.error('❌ EVOLUTIVE-SYSTEM - Erro no processamento de feedback:', error);
        throw error;
      }
      
      console.log('✅ EVOLUTIVE-SYSTEM - Feedback de marketing processado:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['closed-loop-data'] });
      queryClient.invalidateQueries({ queryKey: ['system-metrics'] });
    }
  });

  // Função para validar e normalizar dados
  const validateAndNormalizeData = (data: any, analysisType: string) => {
    if (!data) return null;

    // Para system_metrics, garantir estrutura completa
    if (analysisType === 'system_metrics' && data.system_metrics_analysis) {
      const metrics = data.system_metrics_analysis;
      
      // Garantir que todas as propriedades obrigatórias existam
      return {
        ...metrics,
        leads_totais: metrics.leads_totais || 0,
        leads_qualificados: metrics.leads_qualificados || 0,
        taxa_qualificacao: metrics.taxa_qualificacao || 0,
        agendamentos_realizados: metrics.agendamentos_realizados || 0,
        taxa_conversao_agendamento: metrics.taxa_conversao_agendamento || 0,
        comparecimento_agendamentos: metrics.comparecimento_agendamentos || 0,
        taxa_comparecimento: metrics.taxa_comparecimento || 0,
        roi_marketing: metrics.roi_marketing || 0,
        custo_aquisicao_cliente: metrics.custo_aquisicao_cliente || 0,
        valor_vida_cliente: metrics.valor_vida_cliente || 0,
        tempo_medio_conversao: metrics.tempo_medio_conversao || 0,
        system_overview: {
          total_messages: metrics.system_overview?.total_messages || 0,
          total_conversations: metrics.system_overview?.total_conversations || 0,
          unique_leads: metrics.system_overview?.unique_leads || 0,
          conversion_rate: metrics.system_overview?.conversion_rate || 0,
          avg_response_time_minutes: metrics.system_overview?.avg_response_time_minutes || 0,
          quality_score: metrics.system_overview?.quality_score || 0,
        },
        performance_indicators: {
          message_volume: metrics.performance_indicators?.message_volume || 0,
          conversation_completion_rate: metrics.performance_indicators?.conversation_completion_rate || 0,
          response_efficiency: metrics.performance_indicators?.response_efficiency || 0,
          quality_adherence: metrics.performance_indicators?.quality_adherence || 0,
        },
        operational_metrics: {
          peak_activity_hours: metrics.operational_metrics?.peak_activity_hours || '14:00-16:00',
          avg_session_duration: metrics.operational_metrics?.avg_session_duration || 0,
          system_availability: metrics.operational_metrics?.system_availability || 0,
          data_processing_speed: metrics.operational_metrics?.data_processing_speed || 0,
        }
      };
    }

    // Para outros tipos de análise, retornar como está
    return data;
  };

  // Função para forçar atualização de dados
  const forceRefreshData = async (agentName?: string, analysisType?: string) => {
    console.log('🔄 EVOLUTIVE-SYSTEM - Forçando atualização de dados...', { agentName, analysisType });
    
    try {
      if (agentName && analysisType) {
        // Invalidar cache específico
        const queryKey = ['real-data-analysis', agentName, analysisType];
        console.log('🎯 EVOLUTIVE-SYSTEM - Invalidando cache específico:', queryKey);
        
        await queryClient.invalidateQueries({ queryKey });
        await queryClient.refetchQueries({ queryKey });
        
        console.log(`✅ EVOLUTIVE-SYSTEM - Cache invalidado e dados recarregados para ${agentName} - ${analysisType}`);
      } else {
        // Invalidar todos os caches de análise
        console.log('🌐 EVOLUTIVE-SYSTEM - Invalidando todos os caches de análise');
        
        await queryClient.invalidateQueries({ 
          queryKey: ['real-data-analysis'] 
        });
        await queryClient.refetchQueries({ 
          queryKey: ['real-data-analysis'] 
        });
        
        console.log('✅ EVOLUTIVE-SYSTEM - Todos os caches invalidados e dados recarregados');
      }
    } catch (error) {
      console.error('❌ EVOLUTIVE-SYSTEM - Erro ao forçar atualização:', error);
      throw error;
    }
  };

  // Inicialização do sistema
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        console.log('🚀 EVOLUTIVE-SYSTEM - Inicializando Sistema Evolutivo...');
        setSystemStatus('initializing');
        
        // Verificar se as funções necessárias estão disponíveis
        console.log('🔍 EVOLUTIVE-SYSTEM - Verificando saúde do sistema...');
        const { data: healthCheck, error } = await supabase.functions.invoke('system-health-check');
        
        if (error) {
          console.error('❌ EVOLUTIVE-SYSTEM - Erro na verificação de saúde:', error);
          setSystemStatus('error');
          return;
        }
        
        console.log('✅ EVOLUTIVE-SYSTEM - Verificação de saúde concluída:', healthCheck);
        
        if (healthCheck?.status === 'healthy') {
          setSystemStatus('active');
          console.log('🚀 EVOLUTIVE-SYSTEM - Sistema Evolutivo inicializado com sucesso');
        } else {
          setSystemStatus('error');
          console.error('❌ EVOLUTIVE-SYSTEM - Sistema não está saudável:', healthCheck);
        }
      } catch (error) {
        setSystemStatus('error');
        console.error('💥 EVOLUTIVE-SYSTEM - Erro na inicialização do sistema:', error);
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
    processMarketingFeedback,
    forceRefreshData
  };
};
