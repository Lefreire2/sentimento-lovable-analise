import { analyzeIntentionData } from './intention-analyzer.ts'
import { analyzeFunnelData } from './funnel-analyzer.ts'
import { analyzePerformanceData } from './performance-analyzer.ts'
import { analyzeSentimentData } from './sentiment-analyzer.ts'
import { analyzeSystemMetricsData } from './system-metrics-analyzer.ts'
import { analyzeObjectionsData } from './objections-analyzer.ts'
import { analyzeLeadSources } from './lead-source-analyzer.ts';

export const analyzeIntention = async (supabase: any, tables: any, analysisSettings?: any) => {
  console.log('🧠 Iniciando análise de intenção...');
  try {
    const result = await analyzeIntentionData(supabase, tables, analysisSettings);
    console.log('✅ Análise de intenção concluída:', result);
    return {
      intention_analysis: result
    };
  } catch (error) {
    console.error('❌ Erro na análise de intenção:', error);
    throw error;
  }
};

export const analyzeFunnel = async (supabase: any, tables: any) => {
  console.log('📊 Iniciando análise de funil...');
  try {
    const result = await analyzeFunnelData(supabase, tables);
    console.log('✅ Análise de funil concluída:', result);
    return {
      funnel_data: result
    };
  } catch (error) {
    console.error('❌ Erro na análise de funil:', error);
    throw error;
  }
};

export const analyzePerformance = async (supabase: any, tables: any) => {
  console.log('🚀 Iniciando análise de performance...');
  try {
    const result = await analyzePerformanceData(supabase, tables);
    console.log('✅ Análise de performance concluída:', result);
    return {
      performance_data: result
    };
  } catch (error) {
    console.error('❌ Erro na análise de performance:', error);
    throw error;
  }
};

export const analyzeSentiment = async (supabase: any, tables: any) => {
  console.log('😢 Iniciando análise de sentimentos...');
  try {
    const result = await analyzeSentimentData(supabase, tables);
    console.log('✅ Análise de sentimentos concluída:', result);
    return {
      sentiment_analysis: result
    };
  } catch (error) {
    console.error('❌ Erro na análise de sentimentos:', error);
    throw error;
  }
};

export const analyzeSystemMetrics = async (supabase: any, tables: any) => {
  console.log('⚙️ Iniciando análise de métricas do sistema...');
  try {
    const result = await analyzeSystemMetricsData(supabase, tables);
    console.log('✅ Análise de métricas do sistema concluída:', result);
    return {
      system_metrics_analysis: result
    };
  } catch (error) {
    console.error('❌ Erro na análise de métricas do sistema:', error);
    throw error;
  }
};

export const analyzeObjections = async (supabase: any, agentName: string) => {
  console.log('🚫 Iniciando análise de objeções...');
  try {
    const result = await analyzeObjectionsData(supabase, agentName);
    console.log('✅ Análise de objeções concluída:', result);
     return {
        objection_analysis: result
    };
  } catch (error) {
    console.error('❌ Erro na análise de objeções:', error);
    throw error;
  }
};

export const analyzeLeadSourcesWithMessages = async (supabase: any, agentName: string) => {
  console.log('📊 Iniciando análise de fontes de leads com análise de mensagens para:', agentName);
  
  try {
    const result = await analyzeLeadSources(supabase, agentName);
    
    console.log('✅ Análise de fontes de leads concluída:', {
      agent: result.agent_name,
      totalSources: Object.keys(result.source_distribution).length,
      bestSource: result.best_performing_source,
      messagePatterns: result.message_analysis.message_patterns.source_mentions.length
    });
    
    return {
      lead_source_analysis: result
    };
    
  } catch (error) {
    console.error('❌ Erro na análise de fontes de leads:', error);
    throw error;
  }
};
