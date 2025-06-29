
export const analyzePerformanceData = async (supabase: any, tables: any) => {
  console.log('🚀 Analisando dados de performance...');
  
  try {
    const { messagesTable, summaryTable } = tables;
    
    // Buscar dados de mensagens
    const { data: messages, error: messagesError } = await supabase
      .from(messagesTable)
      .select('*');
    
    if (messagesError) {
      console.error('❌ Erro ao buscar mensagens:', messagesError);
      throw messagesError;
    }
    
    // Buscar dados de resumo se disponível
    let summaryData = [];
    if (summaryTable) {
      const { data: summary, error: summaryError } = await supabase
        .from(summaryTable)
        .select('*');
      
      if (!summaryError) {
        summaryData = summary || [];
      }
    }
    
    if (!messages || messages.length === 0) {
      return {
        total_messages: 0,
        response_time_avg: 0,
        response_time_max: 0,
        message_frequency: 0,
        engagement_rate: 0,
        peak_hours: [],
        performance_score: 0,
        recommendations: []
      };
    }
    
    // Agrupar mensagens por conversa
    const conversationGroups = messages.reduce((acc: any, msg: any) => {
      const jid = msg.remoteJid || 'unknown';
      if (!acc[jid]) {
        acc[jid] = [];
      }
      acc[jid].push(msg);
      return acc;
    }, {});
    
    const conversations = Object.values(conversationGroups);
    
    let totalMessages = messages.length;
    let totalConversations = conversations.length;
    let responseTimes: number[] = [];
    let hourDistribution: { [key: string]: number } = {};
    
    // Analisar cada conversa
    conversations.forEach((conversation: any[]) => {
      // Ordenar mensagens por timestamp
      const sortedMessages = conversation.sort((a, b) => {
        const timeA = new Date(a.Timestamp || 0).getTime();
        const timeB = new Date(b.Timestamp || 0).getTime();
        return timeA - timeB;
      });
      
      // Calcular tempos de resposta
      for (let i = 1; i < sortedMessages.length; i++) {
        const prevTime = new Date(sortedMessages[i-1].Timestamp || 0).getTime();
        const currTime = new Date(sortedMessages[i].Timestamp || 0).getTime();
        
        if (prevTime && currTime && currTime > prevTime) {
          const responseTime = (currTime - prevTime) / (1000 * 60); // em minutos
          if (responseTime < 1440) { // menos de 24 horas
            responseTimes.push(responseTime);
          }
        }
      }
      
      // Analisar distribuição por hora
      sortedMessages.forEach((msg: any) => {
        if (msg.Timestamp) {
          const hour = new Date(msg.Timestamp).getHours();
          const hourKey = `${hour}:00`;
          hourDistribution[hourKey] = (hourDistribution[hourKey] || 0) + 1;
        }
      });
    });
    
    // Calcular métricas
    const avgResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
      : 0;
    
    const maxResponseTime = responseTimes.length > 0 
      ? Math.max(...responseTimes) 
      : 0;
    
    const messageFrequency = totalConversations > 0 
      ? totalMessages / totalConversations 
      : 0;
    
    // Calcular engajamento (baseado em mensagens por conversa)
    const engagementRate = messageFrequency > 5 ? 90 : 
                          messageFrequency > 3 ? 70 : 
                          messageFrequency > 1 ? 50 : 30;
    
    // Encontrar horários de pico
    const peakHours = Object.entries(hourDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([hour, count]) => ({ hour, count }));
    
    // Calcular score de performance
    const responseScore = avgResponseTime < 30 ? 100 : 
                         avgResponseTime < 60 ? 80 : 
                         avgResponseTime < 120 ? 60 : 40;
    
    const volumeScore = totalMessages > 100 ? 100 : 
                       totalMessages > 50 ? 80 : 
                       totalMessages > 20 ? 60 : 40;
    
    const performanceScore = Math.round((responseScore + volumeScore + engagementRate) / 3);
    
    // Gerar recomendações
    const recommendations = [];
    if (avgResponseTime > 60) {
      recommendations.push('Melhorar tempo de resposta - atualmente acima de 1 hora');
    }
    if (messageFrequency < 3) {
      recommendations.push('Aumentar engajamento - poucas mensagens por conversa');
    }
    if (totalMessages < 50) {
      recommendations.push('Aumentar volume de conversas para melhor análise');
    }
    
    return {
      total_messages: totalMessages,
      response_time_avg: Math.round(avgResponseTime * 100) / 100,
      response_time_max: Math.round(maxResponseTime * 100) / 100,
      message_frequency: Math.round(messageFrequency * 100) / 100,
      engagement_rate: Math.round(engagementRate),
      peak_hours: peakHours,
      performance_score: performanceScore,
      recommendations: recommendations
    };
    
  } catch (error) {
    console.error('❌ Erro na análise de performance:', error);
    throw error;
  }
};
