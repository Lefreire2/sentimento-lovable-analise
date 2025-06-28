
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
    const { leadId } = await req.json();
    console.log('🧠 Analisando intenção para lead:', leadId);

    // Simulando análise de intenção com IA
    const intentionAnalysis = {
      id: crypto.randomUUID(),
      lead_id: leadId,
      nivel_intencao: Math.random() > 0.5 ? 'Alta' : Math.random() > 0.3 ? 'Média' : 'Baixa',
      score_intencao: Math.floor(Math.random() * 100),
      fatores_positivos: [
        'Respondeu rapidamente às mensagens',
        'Fez perguntas específicas sobre o produto',
        'Demonstrou urgência na solução'
      ],
      fatores_negativos: [
        'Não forneceu informações de contato completas',
        'Hesitação em relação ao preço'
      ],
      momento_ideal_contato: 'Manhã (09:00 - 11:00)',
      tipo_abordagem_recomendada: 'Abordagem consultiva focada em benefícios específicos',
      probabilidade_conversao: Math.floor(Math.random() * 100),
      data_analise: new Date().toISOString()
    };

    console.log('✅ Análise de intenção concluída:', intentionAnalysis);

    return new Response(
      JSON.stringify(intentionAnalysis),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('❌ Erro na análise de intenção:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
