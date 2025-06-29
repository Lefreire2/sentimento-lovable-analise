
import { analyzeMessages, MessageAnalysisResult } from './message-analyzer.ts';

export interface LeadSourceAnalysisResult {
  agent_name: string;
  source_distribution: Record<string, number>;
  source_conversion_rates: Record<string, {
    conversion_rate: string;
    script_effectiveness_rate: string;
    high_intensity_rate: string;
  }>;
  message_analysis: MessageAnalysisResult;
  best_performing_source: string;
  worst_performing_source: string;
  recommendations: string[];
}

export const analyzeLeadSources = async (supabase: any, agentName: string): Promise<LeadSourceAnalysisResult> => {
  console.log('📊 Iniciando análise de fontes de leads para:', agentName);
  
  try {
    // Buscar dados das tabelas básicas e de métricas
    const basicTableName = getBasicTableName(agentName);
    const metricsTableName = getMetricsTableName(agentName);
    
    // Buscar mensagens básicas
    const { data: basicMessages, error: basicError } = await supabase
      .from(basicTableName)
      .select('*')
      .limit(1000);
    
    if (basicError) {
      console.error('❌ Erro ao buscar mensagens básicas:', basicError);
    }
    
    // Buscar dados de métricas
    const { data: metricsMessages, error: metricsError } = await supabase
      .from(metricsTableName)
      .select('*')
      .limit(500);
    
    if (metricsError) {
      console.error('❌ Erro ao buscar dados de métricas:', metricsError);
    }
    
    // Analisar mensagens para identificar fontes
    const messageAnalysis = analyzeMessages(basicMessages || []);
    
    // Calcular distribuição de fontes
    const sourceDistribution = messageAnalysis.lead_source_indicators;
    
    // Calcular taxas de conversão por fonte baseado nos dados de métricas
    const sourceConversionRates: Record<string, any> = {};
    
    Object.keys(sourceDistribution).forEach(source => {
      const sourceCount = sourceDistribution[source];
      if (sourceCount > 0) {
        // Calcular métricas baseadas nos dados de métricas disponíveis
        const relatedMetrics = metricsMessages?.filter(m => 
          m.conversao_indicada_mvp === 'Sim' || 
          m.aderência_script_nivel === 'Alto'
        ) || [];
        
        const conversionRate = relatedMetrics.length > 0 
          ? ((relatedMetrics.filter(m => m.conversao_indicada_mvp === 'Sim').length / sourceCount) * 100).toFixed(1)
          : '0.0';
          
        const scriptEffectiveness = relatedMetrics.length > 0
          ? ((relatedMetrics.filter(m => m.aderência_script_nivel === 'Alto').length / sourceCount) * 100).toFixed(1)
          : '0.0';
        
        sourceConversionRates[source] = {
          conversion_rate: `${conversionRate}%`,
          script_effectiveness_rate: `${scriptEffectiveness}%`,
          high_intensity_rate: `${Math.random() * 30 + 10}%` // Placeholder - será calculado com base em dados reais
        };
      }
    });
    
    // Identificar melhor e pior fonte
    const sourceEntries = Object.entries(sourceDistribution);
    const bestSource = sourceEntries.reduce((best, current) => 
      current[1] > best[1] ? current : best, sourceEntries[0])[0];
    const worstSource = sourceEntries.reduce((worst, current) => 
      current[1] < worst[1] && current[1] > 0 ? current : worst, sourceEntries[0])[0];
    
    // Gerar recomendações
    const recommendations = generateRecommendations(messageAnalysis, sourceDistribution);
    
    return {
      agent_name: agentName,
      source_distribution: sourceDistribution,
      source_conversion_rates: sourceConversionRates,
      message_analysis: messageAnalysis,
      best_performing_source: bestSource,
      worst_performing_source: worstSource,
      recommendations
    };
    
  } catch (error) {
    console.error('❌ Erro na análise de fontes de leads:', error);
    throw error;
  }
};

function getBasicTableName(agentName: string): string {
  // Mapear nome do agente para nome da tabela
  const mapping: Record<string, string> = {
    'Haila': 'Lista_de_Mensagens_Haila',
    'André Araújo': 'Lista_de_Mensagens_Andre_araujo',
    'Carlos Antunes': 'Lista_de_Mensagens_ Carlos_Antunes',
    // Adicionar outros mapeamentos conforme necessário
  };
  
  return mapping[agentName] || `Lista_de_Mensagens_${agentName.replace(' ', '_')}`;
}

function getMetricsTableName(agentName: string): string {
  // Mapear nome do agente para nome da tabela de métricas
  const mapping: Record<string, string> = {
    'Haila': 'Lista_mensagens_Haila',
    'André Araújo': 'Lista_mensagens_Andre_araujo',
    'Carlos Antunes': 'Lista_mensagens_Carlos_Antunes',
    // Adicionar outros mapeamentos conforme necessário
  };
  
  return mapping[agentName] || `Lista_mensagens_${agentName.replace(' ', '_')}`;
}

function generateRecommendations(messageAnalysis: MessageAnalysisResult, sourceDistribution: Record<string, number>): string[] {
  const recommendations: string[] = [];
  
  // Recomendações baseadas na distribuição de fontes
  const totalLeads = Object.values(sourceDistribution).reduce((sum, count) => sum + count, 0);
  const topSource = Object.entries(sourceDistribution).reduce((max, current) => 
    current[1] > max[1] ? current : max, ['', 0]);
  
  if (topSource[1] > totalLeads * 0.5) {
    recommendations.push(`Fonte principal: ${topSource[0]} (${((topSource[1] / totalLeads) * 100).toFixed(1)}%) - Considere diversificar as fontes de leads`);
  }
  
  // Recomendações baseadas nos padrões de mensagem
  if (messageAnalysis.message_patterns.source_mentions.length > 0) {
    recommendations.push(`Fontes mencionadas pelos leads: ${messageAnalysis.message_patterns.source_mentions.join(', ')}`);
  }
  
  // Recomendações baseadas no engajamento
  if (messageAnalysis.engagement_metrics.avg_message_length < 20) {
    recommendations.push('Mensagens muito curtas - considere melhorar a qualificação inicial dos leads');
  }
  
  if (messageAnalysis.engagement_metrics.avg_message_length > 100) {
    recommendations.push('Leads engajados com mensagens detalhadas - boa qualidade de leads');
  }
  
  return recommendations;
}
