
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { leadId, conversationData } = await req.json();
    console.log('🎯 Otimizando agendamento para lead:', leadId);
    console.log('📊 Dados da conversa:', conversationData);

    // Análise contextual mais profunda
    const contextAnalysis = analyzeConversationContext(conversationData);
    const consultiveScript = generateConsultiveScript(contextAnalysis, leadId);
    
    const appointmentOptimization = {
      id: crypto.randomUUID(),
      lead_id: leadId,
      melhor_horario_sugerido: contextAnalysis.bestTime,
      melhor_dia_semana: contextAnalysis.bestDay,
      canal_preferido: contextAnalysis.preferredChannel,
      abordagem_recomendada: contextAnalysis.recommendedApproach,
      script_personalizado: consultiveScript,
      probabilidade_sucesso: contextAnalysis.successProbability,
      fatores_otimizacao: contextAnalysis.optimizationFactors,
      // Novos campos contextuais
      contexto_conversa: contextAnalysis.conversationContext,
      necessidades_identificadas: contextAnalysis.identifiedNeeds,
      objecoes_previstas: contextAnalysis.expectedObjections,
      gatilhos_conversao: contextAnalysis.conversionTriggers,
      perfil_comportamental: contextAnalysis.behavioralProfile,
      nivel_interesse: contextAnalysis.interestLevel,
      urgencia_detectada: contextAnalysis.detectedUrgency,
      created_at: new Date().toISOString()
    };

    console.log('✅ Otimização consultiva concluída:', appointmentOptimization);

    return new Response(
      JSON.stringify(appointmentOptimization),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('❌ Erro na otimização de agendamento:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

function analyzeConversationContext(conversationData: any) {
  // Simulando análise contextual avançada baseada em dados reais
  const contexts = [
    {
      scenario: 'lead_interessado_preco',
      conversationContext: 'Lead demonstrou interesse mas tem preocupações sobre investimento',
      identifiedNeeds: ['Entender ROI', 'Comparar opções', 'Validar custo-benefício'],
      expectedObjections: ['Preço alto', 'Preciso comparar com concorrentes', 'Preciso de aprovação'],
      conversionTriggers: ['Demonstração de ROI', 'Cases de sucesso', 'Garantias'],
      behavioralProfile: 'Analítico e cauteloso',
      interestLevel: 'Alto',
      detectedUrgency: 'Média',
      bestTime: '10:00',
      bestDay: 'Terça-feira',
      preferredChannel: 'WhatsApp',
      successProbability: 78,
      recommendedApproach: 'Abordagem consultiva focada em ROI e resultados mensuráveis'
    },
    {
      scenario: 'lead_urgente_solucao',
      conversationContext: 'Lead tem problema urgente e busca solução imediata',
      identifiedNeeds: ['Resolver problema rapidamente', 'Implementação ágil', 'Suporte dedicado'],
      expectedObjections: ['Tempo de implementação', 'Complexidade da solução'],
      conversionTriggers: ['Velocidade de implementação', 'Suporte prioritário', 'Resultados rápidos'],
      behavioralProfile: 'Decisor e orientado a resultados',
      interestLevel: 'Muito Alto',
      detectedUrgency: 'Alta',
      bestTime: '14:30',
      bestDay: 'Segunda-feira',
      preferredChannel: 'Telefone',
      successProbability: 92,
      recommendedApproach: 'Abordagem direta focada em solução rápida e eficiente'
    },
    {
      scenario: 'lead_exploratorio',
      conversationContext: 'Lead está em fase de descoberta e quer entender melhor as opções',
      identifiedNeeds: ['Educação sobre soluções', 'Comparativo de mercado', 'Entender possibilidades'],
      expectedObjections: ['Ainda estou pesquisando', 'Não tenho pressa', 'Preciso entender melhor'],
      conversionTriggers: ['Conteúdo educativo', 'Demonstrações práticas', 'Material de apoio'],
      behavioralProfile: 'Pesquisador e metódico',
      interestLevel: 'Médio',
      detectedUrgency: 'Baixa',
      bestTime: '15:00',
      bestDay: 'Quinta-feira',
      preferredChannel: 'Email',
      successProbability: 65,
      recommendedApproach: 'Abordagem educativa e de relacionamento de longo prazo'
    }
  ];

  // Seleciona contexto baseado em dados da conversa ou aleatoriamente para demo
  const selectedContext = contexts[Math.floor(Math.random() * contexts.length)];
  
  return {
    ...selectedContext,
    optimizationFactors: [
      `Contexto identificado: ${selectedContext.scenario}`,
      `Perfil comportamental: ${selectedContext.behavioralProfile}`,
      `Nível de urgência: ${selectedContext.detectedUrgency}`,
      `Canal preferido: ${selectedContext.preferredChannel}`
    ]
  };
}

function generateConsultiveScript(context: any, leadId: string) {
  const templates = {
    lead_interessado_preco: `Olá! Vi que você demonstrou interesse em nossa solução e percebo que tem algumas questões sobre o investimento - isso é completamente normal e esperado.

Baseado no que conversamos, identifiquei que você está buscando ${context.identifiedNeeds[0].toLowerCase()} e ${context.identifiedNeeds[1].toLowerCase()}. 

O que te parece agendarmos uma conversa de 20 minutos ${context.bestDay.toLowerCase()} às ${context.bestTime}? Nesse tempo, posso:

• Mostrar cases específicos do seu segmento com ROI comprovado
• Fazer uma simulação personalizada do retorno do investimento
• Esclarecer suas dúvidas sobre custos vs benefícios

Dessa forma, você terá todas as informações necessárias para tomar uma decisão segura e bem fundamentada. Te atende?`,

    lead_urgente_solucao: `Olá! Percebo pela nossa conversa que você tem uma necessidade urgente de ${context.identifiedNeeds[0].toLowerCase()}.

Entendo a pressão que você deve estar sentindo, e quero ajudar você a resolver isso da forma mais rápida possível.

Que tal conversarmos ${context.bestDay.toLowerCase()} às ${context.bestTime}? Em 15 minutos posso:

• Mostrar exatamente como podemos resolver seu problema
• Apresentar nosso processo de implementação expressa
• Definir um cronograma para você ter resultados na próxima semana

Sei que tempo é crucial no seu caso, então vamos direto ao ponto e focar na solução. Posso contar com você nesse horário?`,

    lead_exploratorio: `Olá! Notei que você está em uma fase importante de pesquisa e descoberta sobre soluções para ${context.identifiedNeeds[2].toLowerCase()}.

Admiro essa abordagem cuidadosa - decisões bem pesquisadas sempre geram melhores resultados.

Que tal agendarmos uma conversa consultiva de 30 minutos ${context.bestDay.toLowerCase()} às ${context.bestTime}? Sem pressão de venda, apenas para:

• Compartilhar insights do mercado que podem te ajudar na decisão
• Mostrar um comparativo imparcial das principais abordagens
• Responder suas dúvidas técnicas e estratégicas

Vou preparar um material exclusivo baseado no seu perfil. O que acha? Seria útil para sua pesquisa?`
  };

  return templates[context.scenario] || templates.lead_interessado_preco;
}
