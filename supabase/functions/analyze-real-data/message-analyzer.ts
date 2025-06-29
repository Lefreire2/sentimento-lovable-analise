
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
  
  if (!messages || messages.length === 0) {
    console.log('⚠️ Nenhuma mensagem para analisar');
    return {
      lead_source_indicators: {
        instagram: 0,
        whatsapp: 0,
        website: 0,
        referral: 0,
        google: 0,
        facebook: 0,
        unknown: 0
      },
      message_patterns: {
        greeting_patterns: [],
        interest_indicators: [],
        source_mentions: []
      },
      engagement_metrics: {
        total_messages: 0,
        avg_message_length: 0,
        response_patterns: []
      }
    };
  }
  
  const sourceIndicators = {
    instagram: 0,
    whatsapp: 0,
    website: 0,
    referral: 0,
    google: 0,
    facebook: 0,
    unknown: 0
  };

  const greetingPatterns: Set<string> = new Set();
  const interestIndicators: Set<string> = new Set();
  const sourceMentions: Set<string> = new Set();
  const responsePatterns: Set<string> = new Set();
  
  let totalMessageLength = 0;
  let validMessages = 0;

  messages.forEach(msg => {
    if (!msg || !msg.message || typeof msg.message !== 'string') {
      return;
    }
    
    const message = msg.message.toLowerCase().trim();
    if (message.length === 0) return;
    
    validMessages++;
    totalMessageLength += message.length;

    // Identificar fontes baseadas no conteúdo da mensagem
    let sourceFound = false;
    
    if (message.includes('instagram') || message.includes('insta') || message.includes('ig') || 
        message.includes('@') || message.includes('story') || message.includes('post')) {
      sourceIndicators.instagram++;
      sourceMentions.add('Instagram');
      sourceFound = true;
    }
    
    if (message.includes('facebook') || message.includes('fb') || message.includes('face')) {
      sourceIndicators.facebook++;
      sourceMentions.add('Facebook');
      sourceFound = true;
    }
    
    if (message.includes('google') || message.includes('pesquisa') || message.includes('busca') ||
        message.includes('pesquisei') || message.includes('encontrei') || message.includes('achei')) {
      sourceIndicators.google++;
      sourceMentions.add('Google/Pesquisa');
      sourceFound = true;
    }
    
    if (message.includes('site') || message.includes('website') || message.includes('página') ||
        message.includes('link') || message.includes('www') || message.includes('http')) {
      sourceIndicators.website++;
      sourceMentions.add('Website');
      sourceFound = true;
    }
    
    if (message.includes('indicação') || message.includes('recomendação') || message.includes('amigo') ||
        message.includes('conhecido') || message.includes('familiar') || message.includes('indicou') ||
        message.includes('recomendou') || message.includes('falou')) {
      sourceIndicators.referral++;
      sourceMentions.add('Indicação');
      sourceFound = true;
    }
    
    // Se não foi identificada nenhuma fonte específica, classificar por padrões
    if (!sourceFound) {
      if (message.includes('whatsapp') || message.includes('whats') || message.includes('zap')) {
        sourceIndicators.whatsapp++;
        sourceFound = true;
      }
    }
    
    // Se ainda não foi identificada, classificar como WhatsApp (canal padrão)
    if (!sourceFound) {
      sourceIndicators.whatsapp++;
    }
    
    // Detectar padrões de saudação inicial
    if (message.includes('olá') || message.includes('oi') || message.includes('bom dia') || 
        message.includes('boa tarde') || message.includes('boa noite') || message.includes('tudo bem') ||
        message.match(/^(oi|olá|oie|opa)/)) {
      const greeting = message.length > 50 ? message.substring(0, 50) + '...' : message;
      greetingPatterns.add(greeting);
    }
    
    // Detectar indicadores de interesse
    if (message.includes('interesse') || message.includes('tratamento') || 
        message.includes('informação') || message.includes('saber') || message.includes('quero') ||
        message.includes('gostaria') || message.includes('preciso') || message.includes('busco')) {
      const interest = message.length > 50 ? message.substring(0, 50) + '...' : message;
      interestIndicators.add(interest);
    }
    
    // Detectar padrões de resposta
    if (message.includes('quero saber') || message.includes('gostaria') || 
        message.includes('preciso') || message.includes('como funciona') ||
        message.includes('qual') || message.includes('quanto')) {
      const response = message.length > 50 ? message.substring(0, 50) + '...' : message;
      responsePatterns.add(response);
    }
  });

  const avgMessageLength = validMessages > 0 ? Math.round(totalMessageLength / validMessages) : 0;
  
  console.log(`📊 Análise concluída: ${validMessages} mensagens válidas, ${Object.values(sourceIndicators).reduce((a, b) => a + b, 0)} fontes identificadas`);

  return {
    lead_source_indicators: sourceIndicators,
    message_patterns: {
      greeting_patterns: Array.from(greetingPatterns).slice(0, 5),
      interest_indicators: Array.from(interestIndicators).slice(0, 5),
      source_mentions: Array.from(sourceMentions)
    },
    engagement_metrics: {
      total_messages: validMessages,
      avg_message_length: avgMessageLength,
      response_patterns: Array.from(responsePatterns).slice(0, 3)
    }
  };
};

