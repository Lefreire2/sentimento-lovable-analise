
export const analyzePerformanceData = async (supabase: any, tables: any) => {
  console.log('🚀 Analisando dados de performance...');
  
  try {
    const { messagesTable, metricsTable } = tables;
    
    // Buscar dados de métricas para análise de performance
    const { data: metricsData, error: metricsError } = await supabase
      .from(metricsTable)
      .select('*');
    
    if (metricsError) {
      console.error('❌ Erro ao buscar dados de métricas:', metricsError);
    }
    
    const metrics = metricsData || [];
    
    if (metrics.length === 0) {
      return {
        response_times: {
          avg_first_response_minutes: 0,
          avg_response_time_minutes: 0,
          max_response_time_minutes: 0
        },
        conversation_metrics: {
          avg_conversation_duration_minutes: 0,
          total_conversations: 0,
          conversion_rate: 0
        },
        script_adherence: {
          high_adherence: 0,
          medium_adherence: 0,
          low_adherence: 0,
          avg_adherence_score: 0
        },
        agent_efficiency: {
          questions_per_conversation: 0,
          message_ratio: 0,
          resolution_rate: 0
        }
      };
    }
    
    let totalFirstResponse = 0;
    let totalAvgResponse = 0;
    let totalMaxResponse = 0;
    let totalDuration = 0;
    let conversions = 0;
    let highAdherence = 0;
    let mediumAdherence = 0;
    let lowAdherence = 0;
    let totalQuestions = 0;
    let totalMessageRatio = 0;
    let resolutions = 0;
    
    metrics.forEach((metric: any) => {
      // Tempos de resposta
      totalFirstResponse += parseInt(metric.tempo_primeira_resposta_minutos) || 0;
      totalAvgResponse += parseInt(metric.tempo_medio_resposta_atendente_minutos) || 0;
      totalMaxResponse += parseInt(metric.tempo_maximo_resposta_atendente_minutos) || 0;
      
      // Duração da conversa
      totalDuration += parseInt(metric.duracao_total_conversa_minutos) || 0;
      
      // Conversões
      if (metric.conversao_indicada_mvp === 'Sim') {
        conversions++;
      }
      
      // Aderência ao script
      const adherence = metric.aderência_script_nivel?.toLowerCase();
      if (adherence?.includes('alto')) {
        highAdherence++;
      } else if (adherence?.includes('medio') || adherence?.includes('médio')) {
        mediumAdherence++;
      } else {
        lowAdherence++;
      }
      
      // Eficiência do agente
      totalQuestions += parseInt(metric.numero_perguntas_vendedor) || 0;
      totalMessageRatio += parseFloat(metric.taxa_mensagens_vendedor_percentual) || 0;
      
      if (metric.indicador_resolucao_primeira_resposta === 'Sim') {
        resolutions++;
      }
    });
    
    const totalConversations = metrics.length;
    
    return {
      response_times: {
        avg_first_response_minutes: Math.round(totalFirstResponse / totalConversations) || 0,
        avg_response_time_minutes: Math.round(totalAvgResponse / totalConversations) || 0,
        max_response_time_minutes: Math.round(totalMaxResponse / totalConversations) || 0
      },
      conversation_metrics: {
        avg_conversation_duration_minutes: Math.round(totalDuration / totalConversations) || 0,
        total_conversations: totalConversations,
        conversion_rate: Math.round((conversions / totalConversations) * 100) || 0
      },
      script_adherence: {
        high_adherence: highAdherence,
        medium_adherence: mediumAdherence,
        low_adherence: lowAdherence,
        avg_adherence_score: Math.round(((highAdherence * 3 + mediumAdherence * 2 + lowAdherence) / (totalConversations * 3)) * 100) || 0
      },
      agent_efficiency: {
        questions_per_conversation: Math.round(totalQuestions / totalConversations) || 0,
        message_ratio: Math.round(totalMessageRatio / totalConversations) || 0,
        resolution_rate: Math.round((resolutions / totalConversations) * 100) || 0
      }
    };
    
  } catch (error) {
    console.error('❌ Erro na análise de performance:', error);
    throw error;
  }
};
