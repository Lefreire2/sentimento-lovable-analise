
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { getAgentTableMapping } from './agent-mapping.ts'
import { 
  analyzeIntention, 
  analyzeFunnel, 
  analyzePerformance, 
  analyzeSentiment, 
  analyzeSystemMetrics, 
  analyzeObjections 
} from './analysis-modules.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agentName, analysisType, analysisSettings } = await req.json();
    console.log('🔍 Iniciando análise real para agente:', agentName, 'tipo:', analysisType);
    console.log('📅 Configurações de período:', analysisSettings);

    // Inicializar cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Obter mapeamento de tabelas do agente
    const agentTableMap = getAgentTableMapping();
    const tables = agentTableMap[agentName];
    
    if (!tables) {
      throw new Error(`Agente ${agentName} não encontrado no mapeamento de tabelas`);
    }

    let analysisResult = {};

    switch (analysisType) {
      case 'intention':
        analysisResult = await analyzeIntention(supabase, tables, analysisSettings);
        break;
      case 'funnel':
        analysisResult = await analyzeFunnel(supabase, tables);
        break;
      case 'performance':
        analysisResult = await analyzePerformance(supabase, tables);
        break;
      case 'sentiment':
        analysisResult = await analyzeSentiment(supabase, tables);
        break;
      case 'system_metrics':
        analysisResult = await analyzeSystemMetrics(supabase, tables);
        break;
      case 'objections':
        analysisResult = await analyzeObjections(supabase, agentName);
        break;
      default:
        analysisResult = await analyzeAll(supabase, tables, agentName, analysisSettings);
    }

    console.log('✅ Análise real concluída:', analysisResult);

    return new Response(
      JSON.stringify(analysisResult),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('❌ Erro na análise real:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

async function analyzeAll(supabase: any, tables: any, agentName: string, analysisSettings?: any) {
  console.log('🔄 Fazendo análise completa com dados reais...');
  
  const [intention, funnel, performance, sentiment, systemMetrics, objections] = await Promise.all([
    analyzeIntention(supabase, tables, analysisSettings),
    analyzeFunnel(supabase, tables),
    analyzePerformance(supabase, tables),
    analyzeSentiment(supabase, tables),
    analyzeSystemMetrics(supabase, tables),
    analyzeObjections(supabase, agentName)
  ]);

  return {
    complete_analysis: {
      intention,
      funnel,
      performance,
      sentiment,
      system_metrics: systemMetrics,
      objections
    }
  };
}
