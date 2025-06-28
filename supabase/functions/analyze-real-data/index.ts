import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agentName, analysisType } = await req.json();
    console.log('🔍 Iniciando análise real para agente:', agentName, 'tipo:', analysisType);

    // Inicializar cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Mapear nomes de agentes para tabelas
    const agentTableMap: Record<string, { basic: string; metrics: string }> = {
      'André Araújo': {
        basic: 'Lista_de_Mensagens_Andre_araujo',
        metrics: 'Lista_mensagens_Andre_araujo'
      },
      'Carlos Antunes': {
        basic: 'Lista_de_Mensagens_ Carlos_Antunes',
        metrics: 'Lista_mensagens_ Carlos_Antunes'
      },
      'Jorge Mendes': {
        basic: 'Lista_de_Mensagens_Jorge_Mendes',
        metrics: 'Lista_mensagens_Jorge_Mendes'
      },
      'Danilo Chammas': {
        basic: 'Lista_de_Mensagens_Danilo_Chammas',
        metrics: 'Lista_mensagens_Danilo_Chammas'
      },
      'Haila': {
        basic: 'Lista_de_Mensagens_Haila',
        metrics: 'Lista_mensagens_Haila'
      }
    };

    const tables = agentTableMap[agentName];
    if (!tables) {
      throw new Error(`Agente ${agentName} não encontrado no mapeamento de tabelas`);
    }

    let analysisResult = {};

    switch (analysisType) {
      case 'intention':
        analysisResult = await analyzeIntention(supabase, tables);
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
      default:
        analysisResult = await analyzeAll(supabase, tables);
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

async function analyzeIntention(supabase: any, tables: any) {
  console.log('🧠 Analisando intenção com dados reais...');
  
  // Buscar dados da tabela de métricas
  const { data: metricsData, error: metricsError } = await supabase
    .from(tables.metrics)
    .select('*')
    .limit(100);

  if (metricsError) {
    console.error('Erro ao buscar métricas:', metricsError);
    throw metricsError;
  }

  // Buscar dados da tabela básica
  const { data: basicData, error: basicError } = await supabase
    .from(tables.basic)
    .select('*')
    .limit(500);

  if (basicError) {
    console.error('Erro ao buscar dados básicos:', basicError);
    throw basicError;
  }

  const totalConversations = basicData?.length || 0;
  const totalMetrics = metricsData?.length || 0;

  // Análise de conversões
  const conversions = metricsData?.filter(row => 
    row.conversao_indicada_mvp === 'Sim' || row.conversao_indicada_mvp === 'sim'
  ) || [];

  // Análise de sentimentos
  const positiveSentiments = metricsData?.filter(row => 
    row.sentimento_geral_conversa === 'Positivo'
  ) || [];

  // Análise de agendamentos
  const appointments = metricsData?.filter(row => 
    row.agendamento_detectado === 'Sim' || row.agendamento_detectado === 'sim'
  ) || [];

  return {
    id: crypto.randomUUID(),
    agent_name: tables.basic.replace('Lista_de_Mensagens_', '').replace('_', ' '),
    analysis_type: 'intention',
    timestamp: new Date().toISOString(),
    data: {
      total_conversations: totalConversations,
      total_processed_metrics: totalMetrics,
      conversions: {
        count: conversions.length,
        rate: totalMetrics > 0 ? ((conversions.length / totalMetrics) * 100).toFixed(2) : '0'
      },
      sentiment_analysis: {
        positive_count: positiveSentiments.length,
        positive_rate: totalMetrics > 0 ? ((positiveSentiments.length / totalMetrics) * 100).toFixed(2) : '0'
      },
      appointments: {
        count: appointments.length,
        rate: totalMetrics > 0 ? ((appointments.length / totalMetrics) * 100).toFixed(2) : '0'
      },
      engagement_metrics: {
        avg_response_time: calculateAverageResponseTime(metricsData),
        conversation_quality: calculateConversationQuality(metricsData)
      }
    }
  };
}

async function analyzeFunnel(supabase: any, tables: any) {
  console.log('📊 Analisando funil com dados reais...');
  
  const { data: metricsData } = await supabase
    .from(tables.metrics)
    .select('*');

  const { data: basicData } = await supabase
    .from(tables.basic)
    .select('*');

  const totalLeads = basicData?.length || 0;
  const qualifiedLeads = metricsData?.filter(row => 
    row.pontuacao_aderencia_percentual && parseFloat(row.pontuacao_aderencia_percentual) > 50
  ).length || 0;
  
  const appointments = metricsData?.filter(row => 
    row.agendamento_detectado === 'Sim'
  ).length || 0;
  
  const conversions = metricsData?.filter(row => 
    row.conversao_indicada_mvp === 'Sim'
  ).length || 0;

  return {
    funnel_data: {
      leads: totalLeads,
      qualified: qualifiedLeads,
      appointments: appointments,
      conversions: conversions,
      rates: {
        qualification: totalLeads > 0 ? ((qualifiedLeads / totalLeads) * 100).toFixed(2) : '0',
        appointment: qualifiedLeads > 0 ? ((appointments / qualifiedLeads) * 100).toFixed(2) : '0',
        conversion: appointments > 0 ? ((conversions / appointments) * 100).toFixed(2) : '0'
      }
    }
  };
}

async function analyzePerformance(supabase: any, tables: any) {
  console.log('⚡ Analisando performance com dados reais...');
  
  const { data: metricsData } = await supabase
    .from(tables.metrics)
    .select('*');

  if (!metricsData || metricsData.length === 0) {
    return {
      performance_metrics: {
        avg_response_time: '0',
        conversion_rate: '0',
        adherence_score: '0',
        questions_asked: '0'
      }
    };
  }

  const avgResponseTime = calculateAverageResponseTime(metricsData);
  const conversionRate = calculateConversionRate(metricsData);
  const avgAdherence = calculateAverageAdherence(metricsData);
  const avgQuestions = calculateAverageQuestions(metricsData);

  return {
    performance_metrics: {
      avg_response_time: avgResponseTime,
      conversion_rate: conversionRate,
      adherence_score: avgAdherence,
      questions_asked: avgQuestions,
      total_interactions: metricsData.length
    }
  };
}

async function analyzeSentiment(supabase: any, tables: any) {
  console.log('😊 Analisando sentimentos com dados reais...');
  
  const { data: metricsData } = await supabase
    .from(tables.metrics)
    .select('*');

  if (!metricsData || metricsData.length === 0) {
    return {
      sentiment_analysis: {
        overall: 'Neutro',
        user: 'Neutro',
        agent: 'Neutro',
        risk_words: '0'
      }
    };
  }

  const sentiments = analyzeSentimentDistribution(metricsData);
  
  return {
    sentiment_analysis: {
      overall: sentiments.overall,
      user: sentiments.user,
      agent: sentiments.agent,
      risk_words: sentiments.riskWords,
      distribution: sentiments.distribution
    }
  };
}

async function analyzeSystemMetrics(supabase: any, tables: any) {
  console.log('📈 Analisando métricas do sistema com dados reais...');
  
  const { data: metricsData } = await supabase
    .from(tables.metrics)
    .select('*');

  const { data: basicData } = await supabase
    .from(tables.basic)
    .select('*');

  const totalLeads = basicData?.length || 0;
  const qualifiedLeads = metricsData?.length || 0;
  const conversions = metricsData?.filter(row => row.conversao_indicada_mvp === 'Sim').length || 0;
  const appointments = metricsData?.filter(row => row.agendamento_detectado === 'Sim').length || 0;

  return {
    system_metrics: {
      leads_totais: totalLeads,
      leads_qualificados: qualifiedLeads,
      taxa_qualificacao: totalLeads > 0 ? ((qualifiedLeads / totalLeads) * 100).toFixed(2) : '0',
      agendamentos_realizados: appointments,
      taxa_conversao_agendamento: qualifiedLeads > 0 ? ((appointments / qualifiedLeads) * 100).toFixed(2) : '0',
      conversoes: conversions,
      taxa_conversao: appointments > 0 ? ((conversions / appointments) * 100).toFixed(2) : '0',
      periodo_analise: 'Dados disponíveis no banco'
    }
  };
}

async function analyzeAll(supabase: any, tables: any) {
  console.log('🔄 Fazendo análise completa com dados reais...');
  
  const [intention, funnel, performance, sentiment, systemMetrics] = await Promise.all([
    analyzeIntention(supabase, tables),
    analyzeFunnel(supabase, tables),
    analyzePerformance(supabase, tables),
    analyzeSentiment(supabase, tables),
    analyzeSystemMetrics(supabase, tables)
  ]);

  return {
    complete_analysis: {
      intention,
      funnel,
      performance,
      sentiment,
      system_metrics: systemMetrics
    }
  };
}

// Funções auxiliares para cálculos
function calculateAverageResponseTime(data: any[]): string {
  const responseTimes = data
    .map(row => parseFloat(row.tempo_medio_resposta_atendente_minutos))
    .filter(time => !isNaN(time));
  
  if (responseTimes.length === 0) return '0';
  
  const average = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
  return average.toFixed(2);
}

function calculateConversionRate(data: any[]): string {
  const conversions = data.filter(row => row.conversao_indicada_mvp === 'Sim').length;
  return data.length > 0 ? ((conversions / data.length) * 100).toFixed(2) : '0';
}

function calculateAverageAdherence(data: any[]): string {
  const adherenceScores = data
    .map(row => parseFloat(row.pontuacao_aderencia_percentual))
    .filter(score => !isNaN(score));
  
  if (adherenceScores.length === 0) return '0';
  
  const average = adherenceScores.reduce((sum, score) => sum + score, 0) / adherenceScores.length;
  return average.toFixed(2);
}

function calculateAverageQuestions(data: any[]): string {
  const questionCounts = data
    .map(row => parseFloat(row.numero_perguntas_vendedor))
    .filter(count => !isNaN(count));
  
  if (questionCounts.length === 0) return '0';
  
  const average = questionCounts.reduce((sum, count) => sum + count, 0) / questionCounts.length;
  return average.toFixed(1);
}

function calculateConversationQuality(data: any[]): string {
  // Baseado na aderência ao script e sentimento
  const qualityScores = data.map(row => {
    const adherence = parseFloat(row.pontuacao_aderencia_percentual) || 0;
    const sentimentScore = row.sentimento_geral_conversa === 'Positivo' ? 100 : 
                          row.sentimento_geral_conversa === 'Neutro' ? 50 : 0;
    return (adherence + sentimentScore) / 2;
  }).filter(score => score > 0);

  if (qualityScores.length === 0) return '0';
  
  const average = qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length;
  return average.toFixed(2);
}

function analyzeSentimentDistribution(data: any[]) {
  const overallSentiments = data.map(row => row.sentimento_geral_conversa).filter(Boolean);
  const userSentiments = data.map(row => row.sentimento_usuario).filter(Boolean);
  const agentSentiments = data.map(row => row.sentimento_atendente).filter(Boolean);
  const riskWords = data.map(row => parseInt(row.contagem_palavras_risco) || 0);

  const getMostCommon = (arr: string[]) => {
    if (arr.length === 0) return 'Neutro';
    const counts = arr.reduce((acc: any, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  };

  const totalRiskWords = riskWords.reduce((sum, count) => sum + count, 0);

  return {
    overall: getMostCommon(overallSentiments),
    user: getMostCommon(userSentiments),
    agent: getMostCommon(agentSentiments),
    riskWords: totalRiskWords.toString(),
    distribution: {
      positive: overallSentiments.filter(s => s === 'Positivo').length,
      neutral: overallSentiments.filter(s => s === 'Neutro').length,
      negative: overallSentiments.filter(s => s === 'Negativo').length
    }
  };
}
