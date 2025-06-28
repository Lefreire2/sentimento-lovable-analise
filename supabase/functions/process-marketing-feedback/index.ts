
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
    const feedbackData = await req.json();
    console.log('📈 Processando feedback de marketing:', feedbackData);

    // Simulando processamento de feedback
    const processedFeedback = {
      id: crypto.randomUUID(),
      status: 'processed',
      insights_generated: [
        'Campanhas de terça-feira têm 23% mais conversão',
        'Leads com score > 80 convertem 3x mais',
        'Abordagem consultiva aumenta show-up em 15%'
      ],
      optimizations_applied: [
        'Ajuste automático de bidding por horário',
        'Refinamento do modelo de lead scoring',
        'Personalização de scripts por perfil'
      ],
      timestamp: new Date().toISOString()
    };

    console.log('✅ Feedback de marketing processado:', processedFeedback);

    return new Response(
      JSON.stringify(processedFeedback),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('❌ Erro no processamento de feedback:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
