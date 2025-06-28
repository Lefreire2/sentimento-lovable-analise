
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
    console.log('🔄 Obtendo dados do closed-loop...');

    // Simulando dados do closed-loop
    const closedLoopData = {
      campaign_performance: {
        id: crypto.randomUUID(),
        campanha_id: 'camp_001',
        lead_quality_score: Math.random() * 30 + 70, // 70-100
        conversion_rate: Math.random() * 15 + 10, // 10-25%
        custo_por_lead_qualificado: Math.random() * 50 + 25, // R$ 25-75
        roi_campanha: Math.random() * 200 + 150, // 150-350%
        sugestoes_otimizacao: [
          'Focar em horários de maior engajamento (14h-17h)',
          'Ajustar copy para destacar benefícios específicos',
          'Testar diferentes CTAs para melhorar conversão'
        ],
        palavras_chave_eficazes: ['solução', 'consultoria', 'resultados'],
        horarios_maior_conversao: ['14:00-17:00', '19:00-21:00'],
        demograficos_alta_conversao: {
          idade: '25-45',
          segmento: 'Empresários',
          localizacao: 'SP, RJ, MG'
        },
        feedback_date: new Date().toISOString()
      },
      lead_quality: [],
      conversion_insights: [],
      predictive_scores: [],
      optimization_recommendations: [
        'Implementar segmentação de leads por score de intenção',
        'Personalizar scripts baseados no perfil do lead',
        'Otimizar timing de contato baseado em padrões históricos',
        'Integrar feedback de vendas no refinamento do modelo'
      ]
    };

    console.log('✅ Dados do closed-loop obtidos:', closedLoopData);

    return new Response(
      JSON.stringify(closedLoopData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('❌ Erro ao obter dados do closed-loop:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
