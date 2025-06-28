
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
    const { period } = await req.json();
    console.log('📊 Calculando métricas do sistema para período:', period);

    // Simulando cálculo de métricas do sistema
    const systemMetrics = {
      periodo: period,
      leads_totais: Math.floor(Math.random() * 1000) + 500,
      leads_qualificados: Math.floor(Math.random() * 300) + 150,
      taxa_qualificacao: Math.random() * 30 + 25, // 25-55%
      agendamentos_realizados: Math.floor(Math.random() * 100) + 50,
      taxa_conversao_agendamento: Math.random() * 20 + 15, // 15-35%
      comparecimento_agendamentos: Math.floor(Math.random() * 80) + 40,
      taxa_comparecimento: Math.random() * 25 + 60, // 60-85%
      roi_marketing: Math.random() * 200 + 100, // 100-300%
      custo_aquisicao_cliente: Math.random() * 100 + 50, // R$ 50-150
      valor_vida_cliente: Math.random() * 2000 + 1000, // R$ 1000-3000
      tempo_medio_conversao: Math.floor(Math.random() * 14) + 3 // 3-17 dias
    };

    console.log('✅ Métricas calculadas:', systemMetrics);

    return new Response(
      JSON.stringify(systemMetrics),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('❌ Erro no cálculo de métricas:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
