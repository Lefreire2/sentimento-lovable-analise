
import { AgentTableMapping, AnalysisResult } from './types.ts';
import { analyzeUniqueLeads } from './leads-analyzer.ts';
import { 
  calculateAverageResponseTime, 
  calculateConversionRate, 
  calculateAverageAdherence, 
  calculateAverageQuestions, 
  calculateConversationQuality 
} from './calculation-utils.ts';
import { analyzeSentimentDistribution } from './sentiment-analyzer.ts';
import {
  analyzeCategoryDistribution,
  analyzeFunnelStageDistribution,
  analyzeIntensityDistribution,
  analyzeConversionImpact,
  analyzeScriptEffectiveness,
  getMostCommonObjection,
  getCriticalStage,
  generateObjectionRecommendations,
  generateSimulatedObjections
} from './objection-analyzer.ts';

export async function analyzeIntention(supabase: any, tables: AgentTableMapping): Promise<AnalysisResult> {
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

  // Analisar leads únicos pela tabela básica
  const totalUniqueLeads = await analyzeUniqueLeads(supabase, tables.basic);
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
      total_conversations: totalUniqueLeads,
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

export async function analyzeFunnel(supabase: any, tables: AgentTableMapping): Promise<AnalysisResult> {
  console.log('📊 Analisando funil com dados reais...');
  
  const { data: metricsData } = await supabase
    .from(tables.metrics)
    .select('*');

  // Analisar leads únicos pela tabela básica
  const totalUniqueLeads = await analyzeUniqueLeads(supabase, tables.basic);
  
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
      leads: totalUniqueLeads,
      qualified: qualifiedLeads,
      appointments: appointments,
      conversions: conversions,
      rates: {
        qualification: totalUniqueLeads > 0 ? ((qualifiedLeads / totalUniqueLeads) * 100).toFixed(2) : '0',
        appointment: qualifiedLeads > 0 ? ((appointments / qualifiedLeads) * 100).toFixed(2) : '0',
        conversion: appointments > 0 ? ((conversions / appointments) * 100).toFixed(2) : '0'
      }
    }
  };
}

export async function analyzePerformance(supabase: any, tables: AgentTableMapping): Promise<AnalysisResult> {
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

export async function analyzeSentiment(supabase: any, tables: AgentTableMapping): Promise<AnalysisResult> {
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

export async function analyzeSystemMetrics(supabase: any, tables: AgentTableMapping): Promise<AnalysisResult> {
  console.log('📈 Analisando métricas do sistema com dados reais...');
  
  const { data: metricsData } = await supabase
    .from(tables.metrics)
    .select('*');

  // Analisar leads únicos pela tabela básica
  const totalUniqueLeads = await analyzeUniqueLeads(supabase, tables.basic);
  const qualifiedLeads = metricsData?.length || 0;
  const conversions = metricsData?.filter(row => row.conversao_indicada_mvp === 'Sim').length || 0;
  const appointments = metricsData?.filter(row => row.agendamento_detectado === 'Sim').length || 0;

  return {
    system_metrics: {
      leads_totais: totalUniqueLeads,
      leads_qualificados: qualifiedLeads,
      taxa_qualificacao: totalUniqueLeads > 0 ? ((qualifiedLeads / totalUniqueLeads) * 100).toFixed(2) : '0',
      agendamentos_realizados: appointments,
      taxa_conversao_agendamento: qualifiedLeads > 0 ? ((appointments / qualifiedLeads) * 100).toFixed(2) : '0',
      conversoes: conversions,
      taxa_conversao: appointments > 0 ? ((conversions / appointments) * 100).toFixed(2) : '0',
      periodo_analise: 'Dados disponíveis no banco'
    }
  };
}

export async function analyzeObjections(supabase: any, agentName: string): Promise<AnalysisResult> {
  console.log('🚫 Analisando objeções com dados reais para:', agentName);
  
  try {
    // Buscar objeções do agente na tabela
    const { data: objectionsData, error } = await supabase
      .from('objection_analysis')
      .select('*')
      .eq('agent_name', agentName)
      .order('occurrence_timestamp', { ascending: false });

    if (error) {
      console.error('Erro ao buscar objeções:', error);
      // Se não há dados de objeções, criar análise simulada baseada nos dados existentes
      return await generateSimulatedObjections(supabase, agentName);
    }

    if (!objectionsData || objectionsData.length === 0) {
      console.log('⚠️ Nenhuma objeção encontrada, gerando análise simulada...');
      return await generateSimulatedObjections(supabase, agentName);
    }

    // Análise das objeções existentes
    const totalObjections = objectionsData.length;
    const categoryDistribution = analyzeCategoryDistribution(objectionsData);
    const funnelStageDistribution = analyzeFunnelStageDistribution(objectionsData);
    const intensityAnalysis = analyzeIntensityDistribution(objectionsData);
    const conversionImpact = analyzeConversionImpact(objectionsData);
    const scriptEffectiveness = analyzeScriptEffectiveness(objectionsData);

    return {
      objection_analysis: {
        agent_name: agentName,
        total_objections: totalObjections,
        category_distribution: categoryDistribution,
        funnel_stage_distribution: funnelStageDistribution,
        intensity_analysis: intensityAnalysis,
        conversion_impact: conversionImpact,
        script_effectiveness: scriptEffectiveness,
        most_common_objection: getMostCommonObjection(categoryDistribution),
        critical_stage: getCriticalStage(funnelStageDistribution),
        recommendations: generateObjectionRecommendations(categoryDistribution, funnelStageDistribution, scriptEffectiveness)
      }
    };
  } catch (error) {
    console.error('Erro na análise de objeções:', error);
    return await generateSimulatedObjections(supabase, agentName);
  }
}
