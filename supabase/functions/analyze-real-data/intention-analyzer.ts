
export const analyzeIntentionData = async (supabase: any, tables: any, analysisSettings?: any) => {
  console.log('🧠 Analisando dados de intenção...');
  
  try {
    const { messagesTable } = tables;
    
    // Configurar filtros de período se fornecidos
    let query = supabase.from(messagesTable).select('*');
    
    if (analysisSettings?.startDate) {
      query = query.gte('Timestamp', analysisSettings.startDate);
    }
    
    if (analysisSettings?.endDate) {
      query = query.lte('Timestamp', analysisSettings.endDate);
    }
    
    const { data: messages, error } = await query;
    
    if (error) {
      console.error('❌ Erro ao buscar mensagens:', error);
      throw error;
    }
    
    if (!messages || messages.length === 0) {
      return {
        total_conversations: 0,
        high_intention_count: 0,
        medium_intention_count: 0,
        low_intention_count: 0,
        average_intention_score: 0,
        intention_distribution: {
          'Alta': 0,
          'Média': 0,
          'Baixa': 0
        },
        top_intention_indicators: [],
        conversion_probability: 0
      };
    }
    
    // Agrupar mensagens por conversa (remoteJid)
    const conversationGroups = messages.reduce((acc: any, msg: any) => {
      const jid = msg.remoteJid || 'unknown';
      if (!acc[jid]) {
        acc[jid] = [];
      }
      acc[jid].push(msg);
      return acc;
    }, {});
    
    const conversations = Object.values(conversationGroups);
    let highIntention = 0;
    let mediumIntention = 0;
    let lowIntention = 0;
    let totalScore = 0;
    
    const intentionIndicators = new Map();
    
    conversations.forEach((conversation: any[]) => {
      let conversationScore = 0;
      
      conversation.forEach((msg: any) => {
        if (!msg.message) return;
        
        const message = msg.message.toLowerCase();
        
        // Indicadores de alta intenção
        if (message.includes('quero') || message.includes('preciso') || 
            message.includes('interessado') || message.includes('valor') ||
            message.includes('preço') || message.includes('comprar')) {
          conversationScore += 30;
          const indicator = 'Palavras de alta intenção';
          intentionIndicators.set(indicator, (intentionIndicators.get(indicator) || 0) + 1);
        }
        
        // Indicadores de média intenção
        if (message.includes('informação') || message.includes('saber') ||
            message.includes('entender') || message.includes('explicar')) {
          conversationScore += 20;
          const indicator = 'Busca por informações';
          intentionIndicators.set(indicator, (intentionIndicators.get(indicator) || 0) + 1);
        }
        
        // Indicadores de baixa intenção
        if (message.includes('só perguntando') || message.includes('curiosidade') ||
            message.includes('talvez') || message.includes('futuramente')) {
          conversationScore += 10;
          const indicator = 'Interesse casual';
          intentionIndicators.set(indicator, (intentionIndicators.get(indicator) || 0) + 1);
        }
        
        // Urgência
        if (message.includes('urgente') || message.includes('rápido') ||
            message.includes('hoje') || message.includes('agora')) {
          conversationScore += 25;
          const indicator = 'Urgência detectada';
          intentionIndicators.set(indicator, (intentionIndicators.get(indicator) || 0) + 1);
        }
      });
      
      totalScore += conversationScore;
      
      // Classificar nível de intenção
      if (conversationScore >= 50) {
        highIntention++;
      } else if (conversationScore >= 25) {
        mediumIntention++;
      } else {
        lowIntention++;
      }
    });
    
    const totalConversations = conversations.length;
    const averageScore = totalConversations > 0 ? totalScore / totalConversations : 0;
    
    // Converter indicadores para array ordenado
    const topIndicators = Array.from(intentionIndicators.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([indicator, count]) => ({ indicator, count }));
    
    return {
      total_conversations: totalConversations,
      high_intention_count: highIntention,
      medium_intention_count: mediumIntention,
      low_intention_count: lowIntention,
      average_intention_score: Math.round(averageScore),
      intention_distribution: {
        'Alta': highIntention,
        'Média': mediumIntention,
        'Baixa': lowIntention
      },
      top_intention_indicators: topIndicators,
      conversion_probability: Math.round((highIntention / totalConversations) * 100) || 0
    };
    
  } catch (error) {
    console.error('❌ Erro na análise de intenção:', error);
    throw error;
  }
};
