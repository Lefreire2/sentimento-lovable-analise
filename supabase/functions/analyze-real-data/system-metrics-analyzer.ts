
export const analyzeSystemMetricsData = async (supabase: any, tables: any) => {
  console.log('⚙️ Analisando métricas do sistema...');
  
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
        system_health: 'Sem dados',
        total_interactions: 0,
        error_rate: 0,
        uptime_percentage: 100,
        data_quality_score: 0,
        processing_efficiency: 0,
        storage_usage: 0,
        recommendations: ['Sem dados suficientes para análise']
      };
    }
    
    // Analisar qualidade dos dados
    let validMessages = 0;
    let messagesWithTimestamp = 0;
    let messagesWithContent = 0;
    let messagesWithContact = 0;
    
    messages.forEach((msg: any) => {
      if (msg.message && msg.message.trim().length > 0) {
        messagesWithContent++;
      }
      if (msg.Timestamp) {
        messagesWithTimestamp++;
      }
      if (msg.remoteJid || msg.nome) {
        messagesWithContact++;
      }
      
      // Mensagem é válida se tem conteúdo, timestamp e contato
      if (msg.message && msg.Timestamp && (msg.remoteJid || msg.nome)) {
        validMessages++;
      }
    });
    
    const totalMessages = messages.length;
    const dataQualityScore = totalMessages > 0 
      ? Math.round((validMessages / totalMessages) * 100) 
      : 0;
    
    // Calcular eficiência de processamento
    const contentRate = totalMessages > 0 ? (messagesWithContent / totalMessages) * 100 : 0;
    const timestampRate = totalMessages > 0 ? (messagesWithTimestamp / totalMessages) * 100 : 0;
    const contactRate = totalMessages > 0 ? (messagesWithContact / totalMessages) * 100 : 0;
    
    const processingEfficiency = Math.round((contentRate + timestampRate + contactRate) / 3);
    
    // Analisar distribuição temporal para detectar gaps
    const timestamps = messages
      .filter((msg: any) => msg.Timestamp)
      .map((msg: any) => new Date(msg.Timestamp).getTime())
      .sort((a, b) => a - b);
    
    let gaps = 0;
    if (timestamps.length > 1) {
      for (let i = 1; i < timestamps.length; i++) {
        const timeDiff = timestamps[i] - timestamps[i-1];
        // Gap maior que 24 horas
        if (timeDiff > 24 * 60 * 60 * 1000) {
          gaps++;
        }
      }
    }
    
    // Calcular uptime (baseado em gaps)
    const expectedDays = timestamps.length > 0 
      ? Math.ceil((timestamps[timestamps.length - 1] - timestamps[0]) / (24 * 60 * 60 * 1000))
      : 1;
    
    const uptimePercentage = expectedDays > 0 
      ? Math.max(0, Math.round(((expectedDays - gaps) / expectedDays) * 100))
      : 100;
    
    // Estimar uso de armazenamento (baseado no tamanho médio das mensagens)
    const avgMessageSize = messages.reduce((sum: number, msg: any) => {
      return sum + (msg.message ? msg.message.length : 0);
    }, 0) / totalMessages;
    
    const estimatedStorageKB = Math.round((totalMessages * avgMessageSize) / 1024);
    
    // Determinar saúde do sistema
    let systemHealth = 'Excelente';
    if (dataQualityScore < 70 || processingEfficiency < 70 || uptimePercentage < 90) {
      systemHealth = 'Atenção';
    }
    if (dataQualityScore < 50 || processingEfficiency < 50 || uptimePercentage < 80) {
      systemHealth = 'Crítico';
    }
    
    // Gerar recomendações
    const recommendations = [];
    
    if (dataQualityScore < 80) {
      recommendations.push('Melhorar qualidade dos dados - muitas mensagens incompletas');
    }
    if (processingEfficiency < 80) {
      recommendations.push('Otimizar processamento - dados essenciais em falta');
    }
    if (uptimePercentage < 95) {
      recommendations.push('Investigar gaps temporais - possível instabilidade');
    }
    if (estimatedStorageKB > 10000) {
      recommendations.push('Considerar arquivamento - uso de armazenamento alto');
    }
    if (recommendations.length === 0) {
      recommendations.push('Sistema operando normalmente');
    }
    
    return {
      system_health: systemHealth,
      total_interactions: totalMessages,
      error_rate: Math.round(((totalMessages - validMessages) / totalMessages) * 100),
      uptime_percentage: uptimePercentage,
      data_quality_score: dataQualityScore,
      processing_efficiency: processingEfficiency,
      storage_usage: estimatedStorageKB,
      recommendations: recommendations
    };
    
  } catch (error) {
    console.error('❌ Erro na análise de métricas do sistema:', error);
    throw error;
  }
};
