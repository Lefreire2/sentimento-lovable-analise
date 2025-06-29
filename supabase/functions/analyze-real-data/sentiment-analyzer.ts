
export const analyzeSentimentData = async (supabase: any, tables: any) => {
  console.log('😊 Analisando dados de sentimentos...');
  
  try {
    const { messagesTable, metricsTable } = tables;
    
    // Buscar dados de sentimentos das métricas
    const { data: metricsData, error: metricsError } = await supabase
      .from(metricsTable)
      .select('*');
    
    if (metricsError) {
      console.error('❌ Erro ao buscar dados de métricas:', metricsError);
    }
    
    // Buscar mensagens básicas para análise adicional
    const { data: messages, error: messagesError } = await supabase
      .from(messagesTable)
      .select('*');
    
    if (messagesError) {
      console.error('❌ Erro ao buscar mensagens:', messagesError);
    }
    
    const metrics = metricsData || [];
    const messagesList = messages || [];
    
    if (metrics.length === 0) {
      return {
        sentiment_overview: {
          total_conversations: 0,
          positive_sentiment: 0,
          neutral_sentiment: 0,
          negative_sentiment: 0,
          sentiment_score: 0
        },
        user_sentiment_distribution: {
          'Positivo': 0,
          'Neutro': 0,
          'Negativo': 0
        },
        agent_sentiment_distribution: {
          'Positivo': 0,
          'Neutro': 0,
          'Negativo': 0
        },
        risk_indicators: {
          high_risk_conversations: 0,
          risk_words_detected: 0,
          escalation_potential: 0
        }
      };
    }
    
    let positiveUser = 0;
    let neutralUser = 0;
    let negativeUser = 0;
    let positiveAgent = 0;
    let neutralAgent = 0;
    let negativeAgent = 0;
    let riskWordsTotal = 0;
    
    metrics.forEach((metric: any) => {
      // Analisar sentimento do usuário
      const userSentiment = metric.sentimento_usuario?.toLowerCase();
      if (userSentiment?.includes('positivo')) {
        positiveUser++;
      } else if (userSentiment?.includes('negativo')) {
        negativeUser++;
      } else {
        neutralUser++;
      }
      
      // Analisar sentimento do atendente
      const agentSentiment = metric.sentimento_atendente?.toLowerCase();
      if (agentSentiment?.includes('positivo')) {
        positiveAgent++;
      } else if (agentSentiment?.includes('negativo')) {
        negativeAgent++;
      } else {
        neutralAgent++;
      }
      
      // Contar palavras de risco
      const riskWords = parseInt(metric.contagem_palavras_risco) || 0;
      riskWordsTotal += riskWords;
    });
    
    const totalConversations = metrics.length;
    const sentimentScore = totalConversations > 0 
      ? Math.round(((positiveUser + positiveAgent) / (totalConversations * 2)) * 100)
      : 0;
    
    return {
      sentiment_overview: {
        total_conversations: totalConversations,
        positive_sentiment: positiveUser + positiveAgent,
        neutral_sentiment: neutralUser + neutralAgent,
        negative_sentiment: negativeUser + negativeAgent,
        sentiment_score: sentimentScore
      },
      user_sentiment_distribution: {
        'Positivo': positiveUser,
        'Neutro': neutralUser,
        'Negativo': negativeUser
      },
      agent_sentiment_distribution: {
        'Positivo': positiveAgent,
        'Neutro': neutralAgent,
        'Negativo': negativeAgent
      },
      risk_indicators: {
        high_risk_conversations: metrics.filter((m: any) => 
          parseInt(m.contagem_palavras_risco) > 3).length,
        risk_words_detected: riskWordsTotal,
        escalation_potential: Math.round((riskWordsTotal / totalConversations) * 10) || 0
      }
    };
    
  } catch (error) {
    console.error('❌ Erro na análise de sentimentos:', error);
    throw error;
  }
};
