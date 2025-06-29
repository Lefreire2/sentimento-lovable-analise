
export interface MessageAnalysisResult {
  lead_source_indicators: {
    instagram: number;
    whatsapp: number;
    website: number;
    referral: number;
    google: number;
    facebook: number;
    unknown: number;
  };
  message_patterns: {
    greeting_patterns: string[];
    interest_indicators: string[];
    source_mentions: string[];
  };
  engagement_metrics: {
    total_messages: number;
    avg_message_length: number;
    response_patterns: string[];
  };
}

export const analyzeMessages = (messages: any[]): MessageAnalysisResult => {
  console.log('🔍 Analisando mensagens para identificar fontes de leads...');
  
  const sourceIndicators = {
    instagram: 0,
    whatsapp: 0,
    website: 0,
    referral: 0,
    google: 0,
    facebook: 0,
    unknown: 0
  };

  const greetingPatterns: string[] = [];
  const interestIndicators: string[] = [];
  const sourceMentions: string[] = [];
  const responsePatterns: string[] = [];
  
  let totalMessageLength = 0;

  messages.forEach(msg => {
    if (!msg.message) return;
    
    const message = msg.message.toLowerCase();
    totalMessageLength += message.length;

    // Identificar fontes baseadas no conteúdo da mensagem
    if (message.includes('instagram') || message.includes('insta') || message.includes('ig')) {
      sourceIndicators.instagram++;
      sourceMentions.push('Instagram mencionado');
    }
    
    if (message.includes('facebook') || message.includes('fb')) {
      sourceIndicators.facebook++;
      sourceMentions.push('Facebook mencionado');
    }
    
    if (message.includes('google') || message.includes('pesquisa') || message.includes('busca')) {
      sourceIndicators.google++;
      sourceMentions.push('Google/Pesquisa mencionado');
    }
    
    if (message.includes('site') || message.includes('website') || message.includes('página')) {
      sourceIndicators.website++;
      sourceMentions.push('Website mencionado');
    }
    
    if (message.includes('indicação') || message.includes('recomendação') || message.includes('amigo')) {
      sourceIndicators.referral++;
      sourceMentions.push('Indicação mencionada');
    }
    
    // Detectar padrões de saudação inicial
    if (message.includes('olá') || message.includes('oi') || message.includes('bom dia') || 
        message.includes('boa tarde') || message.includes('boa noite')) {
      greetingPatterns.push(message.substring(0, 50) + '...');
    }
    
    // Detectar indicadores de interesse
    if (message.includes('interesse') || message.includes('tratamento') || 
        message.includes('informação') || message.includes('saber')) {
      interestIndicators.push(message.substring(0, 50) + '...');
    }
    
    // Detectar padrões de resposta
    if (message.includes('quero saber') || message.includes('gostaria') || 
        message.includes('preciso')) {
      responsePatterns.push(message.substring(0, 50) + '...');
    }
  });

  // Se não foi identificada nenhuma fonte específica, assumir WhatsApp direto
  if (Object.values(sourceIndicators).every(count => count === 0)) {
    sourceIndicators.whatsapp = messages.length;
  }

  return {
    lead_source_indicators: sourceIndicators,
    message_patterns: {
      greeting_patterns: [...new Set(greetingPatterns)].slice(0, 5),
      interest_indicators: [...new Set(interestIndicators)].slice(0, 5),
      source_mentions: [...new Set(sourceMentions)]
    },
    engagement_metrics: {
      total_messages: messages.length,
      avg_message_length: messages.length > 0 ? Math.round(totalMessageLength / messages.length) : 0,
      response_patterns: [...new Set(responsePatterns)].slice(0, 3)
    }
  };
};
