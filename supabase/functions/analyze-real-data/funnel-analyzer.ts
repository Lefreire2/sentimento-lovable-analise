
export const analyzeFunnelData = async (supabase: any, tables: any) => {
  console.log('📊 Analisando dados do funil...');
  
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
        total_leads: 0,
        contacted_leads: 0,
        interested_leads: 0,
        qualified_leads: 0,
        converted_leads: 0,
        conversion_rates: {
          contact_to_interest: 0,
          interest_to_qualified: 0,
          qualified_to_converted: 0,
          overall_conversion: 0
        },
        funnel_stages: {
          'Primeiro Contato': 0,
          'Interesse Demonstrado': 0,
          'Lead Qualificado': 0,
          'Conversão': 0
        }
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
    
    let totalLeads = conversations.length;
    let contactedLeads = 0;
    let interestedLeads = 0;
    let qualifiedLeads = 0;
    let convertedLeads = 0;
    
    conversations.forEach((conversation: any[]) => {
      let hasContact = false;
      let hasInterest = false;
      let isQualified = false;
      let isConverted = false;
      
      conversation.forEach((msg: any) => {
        if (!msg.message) return;
        
        const message = msg.message.toLowerCase();
        
        // Primeiro contato
        if (message.includes('olá') || message.includes('oi') || 
            message.includes('bom dia') || message.includes('boa tarde')) {
          hasContact = true;
        }
        
        // Interesse demonstrado
        if (message.includes('interesse') || message.includes('quero saber') ||
            message.includes('me conta') || message.includes('informação')) {
          hasInterest = true;
        }
        
        // Lead qualificado
        if (message.includes('valor') || message.includes('preço') ||
            message.includes('quando') || message.includes('onde') ||
            message.includes('como funciona')) {
          isQualified = true;
        }
        
        // Conversão
        if (message.includes('quero') || message.includes('vou fazer') ||
            message.includes('aceito') || message.includes('fechado') ||
            message.includes('combinado')) {
          isConverted = true;
        }
      });
      
      if (hasContact) contactedLeads++;
      if (hasInterest) interestedLeads++;
      if (isQualified) qualifiedLeads++;
      if (isConverted) convertedLeads++;
    });
    
    // Calcular taxas de conversão
    const contactToInterest = contactedLeads > 0 ? (interestedLeads / contactedLeads) * 100 : 0;
    const interestToQualified = interestedLeads > 0 ? (qualifiedLeads / interestedLeads) * 100 : 0;
    const qualifiedToConverted = qualifiedLeads > 0 ? (convertedLeads / qualifiedLeads) * 100 : 0;
    const overallConversion = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
    
    return {
      total_leads: totalLeads,
      contacted_leads: contactedLeads,
      interested_leads: interestedLeads,
      qualified_leads: qualifiedLeads,
      converted_leads: convertedLeads,
      conversion_rates: {
        contact_to_interest: Math.round(contactToInterest * 100) / 100,
        interest_to_qualified: Math.round(interestToQualified * 100) / 100,
        qualified_to_converted: Math.round(qualifiedToConverted * 100) / 100,
        overall_conversion: Math.round(overallConversion * 100) / 100
      },
      funnel_stages: {
        'Primeiro Contato': contactedLeads,
        'Interesse Demonstrado': interestedLeads,
        'Lead Qualificado': qualifiedLeads,
        'Conversão': convertedLeads
      }
    };
    
  } catch (error) {
    console.error('❌ Erro na análise do funil:', error);
    throw error;
  }
};
