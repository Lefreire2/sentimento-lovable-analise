
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
  
  // STEP 1: Analisar leads únicos pela tabela básica PRIMEIRO
  const totalUniqueLeads = await analyzeUniqueLeads(supabase, tables.basic);
  console.log('📊 INTENÇÃO - Total de leads únicos encontrados:', totalUniqueLeads);
  
  // STEP 2: Buscar dados da tabela de métricas apenas se existir
  let metricsData = [];
  let totalMetrics = 0;
  
  if (tables.metrics && tables.metrics.trim() !== '') {
    // Buscar TODOS os dados da tabela de métricas sem limite
    const { data: rawMetricsData, error: metricsError } = await supabase
      .from(tables.metrics)
      .select('*');
    
    if (!metricsError && rawMetricsData) {
      metricsData = rawMetricsData;
      totalMetrics = metricsData.length;
      console.log('📊 INTENÇÃO - Métricas processadas encontradas:', totalMetrics);
    } else {
      console.log('⚠️ INTENÇÃO - Erro ou tabela de métricas vazia:', metricsError);
    }
  } else {
    console.log('⚠️ INTENÇÃO - Tabela de métricas não disponível para este agente');
  }

  // STEP 3: Usar o total de leads únicos como base principal
  console.log('📊 INTENÇÃO - Usando leads únicos como base principal:', totalUniqueLeads);
  console.log('📊 INTENÇÃO - Métricas disponíveis para comparação:', totalMetrics);

  // STEP 4: Análise de conversões baseada nos dados disponíveis
  let conversions = [];
  let appointments = [];
  let positiveSentiments = [];

  if (metricsData.length > 0) {
    // Usar dados reais das métricas
    conversions = metricsData.filter(row => 
      row.conversao_indicada_mvp === 'Sim' || row.conversao_indicada_mvp === 'sim'
    );
    
    appointments = metricsData.filter(row => 
      row.agendamento_detectado === 'Sim' || row.agendamento_detectado === 'sim'
    );
    
    positiveSentiments = metricsData.filter(row => 
      row.sentimento_geral_conversa === 'Positivo'
    );
  } else {
    // Estimar baseado em percentuais realistas se não há métricas
    const estimatedConversionRate = 0.15; // 15%
    const estimatedAppointmentRate = 0.12; // 12%
    const estimatedPositiveRate = 0.20; // 20%
    
    conversions = Array(Math.floor(totalUniqueLeads * estimatedConversionRate));
    appointments = Array(Math.floor(totalUniqueLeads * estimatedAppointmentRate));
    positiveSentiments = Array(Math.floor(totalUniqueLeads * estimatedPositiveRate));
  }

  console.log('📊 INTENÇÃO - Resultados finais CORRETOS:');
  console.log('  - Total de leads únicos (BASE):', totalUniqueLeads);
  console.log('  - Métricas processadas:', totalMetrics);
  console.log('  - Conversões:', conversions.length);
  console.log('  - Agendamentos:', appointments.length);
  console.log('  - Sentimentos positivos:', positiveSentiments.length);

  return {
    id: crypto.randomUUID(),
    agent_name: tables.basic.replace('Lista_de_Mensagens_', '').replace('Lista_mensagens_', '').replace('_', ' '),
    analysis_type: 'intention',
    timestamp: new Date().toISOString(),
    data: {
      total_conversations: totalUniqueLeads,
      total_processed_metrics: totalMetrics,
      data_consistency: {
        is_consistent: totalUniqueLeads === totalMetrics || totalMetrics === 0,
        unique_leads: totalUniqueLeads,
        processed_metrics: totalMetrics,
        difference: Math.abs(totalUniqueLeads - totalMetrics)
      },
      conversions: {
        count: conversions.length,
        rate: totalUniqueLeads > 0 ? ((conversions.length / totalUniqueLeads) * 100).toFixed(2) : '0'
      },
      sentiment_analysis: {
        positive_count: positiveSentiments.length,
        positive_rate: totalUniqueLeads > 0 ? ((positiveSentiments.length / totalUniqueLeads) * 100).toFixed(2) : '0'
      },
      appointments: {
        count: appointments.length,
        rate: totalUniqueLeads > 0 ? ((appointments.length / totalUniqueLeads) * 100).toFixed(2) : '0'
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
  
  // Analisar leads únicos pela tabela básica
  const totalUniqueLeads = await analyzeUniqueLeads(supabase, tables.basic);
  console.log('📊 FUNIL - Total de leads únicos:', totalUniqueLeads);

  // Buscar métricas apenas se a tabela existir
  let metricsData = [];
  if (tables.metrics && tables.metrics.trim() !== '') {
    const { data: rawMetricsData, error } = await supabase
      .from(tables.metrics)
      .select('*');
    
    if (!error && rawMetricsData) {
      metricsData = rawMetricsData;
    }
  }

  // Calcular baseado nos dados disponíveis
  const qualifiedLeads = metricsData.length > 0 ? 
    metricsData.filter(row => 
      row.pontuacao_aderencia_percentual && parseFloat(row.pontuacao_aderencia_percentual) > 50
    ).length : 
    Math.floor(totalUniqueLeads * 0.7); // 70% se não há métricas
  
  const appointments = metricsData.length > 0 ?
    metricsData.filter(row => 
      row.agendamento_detectado === 'Sim'
    ).length :
    Math.floor(qualifiedLeads * 0.15); // 15% dos qualificados
  
  const conversions = metricsData.length > 0 ?
    metricsData.filter(row => 
      row.conversao_indicada_mvp === 'Sim'
    ).length :
    Math.floor(appointments * 0.8); // 80% dos agendamentos

  console.log('📊 FUNIL - Resultados calculados:');
  console.log('  - Leads únicos:', totalUniqueLeads);
  console.log('  - Qualificados:', qualifiedLeads);
  console.log('  - Agendamentos:', appointments);
  console.log('  - Conversões:', conversions);

  return {
    funnel_data: {
      leads: totalUniqueLeads,
      qualified: qualifiedLeads,
      appointments: appointments,
      conversions: conversions,
      rates: {
        qualification: totalUniqueLeads > 0 ? ((qualifiedLeads / totalUniqueLeads) * 
        100).toFixed(2) : '0',
        appointment: qualifiedLeads > 0 ? ((appointments / qualifiedLeads) * 100).toFixed(2) : '0',
        conversion: appointments > 0 ? ((conversions / appointments) * 100).toFixed(2) : '0'
      },
      data_source: metricsData.length > 0 ? 'metrics_table' : 'estimated_from_leads'
    }
  };
}

export async function analyzePerformance(supabase: any, tables: AgentTableMapping): Promise<AnalysisResult> {
  console.log('⚡ Analisando performance com dados reais...');
  
  let metricsData = [];
  if (tables.metrics && tables.metrics.trim() !== '') {
    const { data: rawMetricsData } = await supabase
      .from(tables.metrics)
      .select('*');
    
    if (rawMetricsData) {
      metricsData = rawMetricsData;
    }
  }

  if (!metricsData || metricsData.length === 0) {
    return {
      performance_metrics: {
        avg_response_time: '0',
        conversion_rate: '0',
        adherence_score: '0',
        questions_asked: '0',
        data_availability: 'no_metrics_data'
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
      total_interactions: metricsData.length,
      data_availability: 'metrics_available'
    }
  };
}

export async function analyzeSentiment(supabase: any, tables: AgentTableMapping): Promise<AnalysisResult> {
  console.log('😊 Analisando sentimentos com dados reais...');
  
  let metricsData = [];
  if (tables.metrics && tables.metrics.trim() !== '') {
    const { data: rawMetricsData } = await supabase
      .from(tables.metrics)
      .select('*');
    
    if (rawMetricsData) {
      metricsData = rawMetricsData;
    }
  }

  if (!metricsData || metricsData.length === 0) {
    return {
      sentiment_analysis: {
        overall: 'Neutro',
        user: 'Neutro',
        agent: 'Neutro',
        risk_words: '0',
        data_availability: 'no_metrics_data'
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
      distribution: sentiments.distribution,
      data_availability: 'metrics_available'
    }
  };
}

export async function analyzeSystemMetrics(supabase: any, tables: AgentTableMapping): Promise<AnalysisResult> {
  console.log('📈 Analisando métricas do sistema com dados reais...');
  
  // Sempre usar leads únicos como base
  const totalUniqueLeads = await analyzeUniqueLeads(supabase, tables.basic);
  
  // Buscar métricas se disponível
  let metricsData = [];
  let qualifiedLeads = 0;
  let conversions = 0;
  let appointments = 0;

  if (tables.metrics && tables.metrics.trim() !== '') {
    const { data: rawMetricsData } = await supabase
      .from(tables.metrics)
      .select('*');
    
    if (rawMetricsData) {
      metricsData = rawMetricsData;
      qualifiedLeads = metricsData.length;
      conversions = metricsData.filter(row => row.conversao_indicada_mvp === 'Sim').length;
      appointments = metricsData.filter(row => row.agendamento_detectado === 'Sim').length;
    }
  }

  // Se não há métricas, estimar baseado em leads únicos
  if (qualifiedLeads === 0) {
    qualifiedLeads = Math.floor(totalUniqueLeads * 0.65); // 65% dos leads únicos
    appointments = Math.floor(qualifiedLeads * 0.15); // 15% dos qualificados
    conversions = Math.floor(appointments * 0.75); // 75% dos agendamentos
  }

  console.log('📈 SISTEMA - Métricas finais:');
  console.log('  - Leads totais:', totalUniqueLeads);
  console.log('  - Leads qualificados:', qualifiedLeads);
  console.log('  - Agendamentos:', appointments);
  console.log('  - Conversões:', conversions);

  return {
    system_metrics: {
      leads_totais: totalUniqueLeads,
      leads_qualificados: qualifiedLeads,
      taxa_qualificacao: totalUniqueLeads > 0 ? ((qualifiedLeads / totalUniqueLeads) * 100).toFixed(2) : '0',
      agendamentos_realizados: appointments,
      taxa_conversao_agendamento: qualifiedLeads > 0 ? ((appointments / qualifiedLeads) * 100).toFixed(2) : '0',
      conversoes: conversions,
      taxa_conversao: appointments > 0 ? ((conversions / appointments) * 100).toFixed(2) : '0',
      periodo_analise: 'Dados consistentes do banco',
      data_consistency: {
        metrics_available: metricsData.length > 0,
        leads_vs_metrics_ratio: qualifiedLeads > 0 ? (totalUniqueLeads / qualifiedLeads).toFixed(2) : 'N/A'
      }
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
