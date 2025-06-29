
import { analyzeMessages, MessageAnalysisResult } from './message-analyzer.ts';
import { getTableNamesForAgent } from './agent-mapping.ts';

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
  data_quality: {
    total_messages: number;
    total_metrics: number;
    data_consistency: boolean;
  };
}

export const analyzeLeadSources = async (supabase: any, agentName: string): Promise<LeadSourceAnalysisResult> => {
  console.log('📊 Iniciando análise de fontes de leads para:', agentName);
  
  try {
    // Obter mapeamento correto das tabelas
    const tables = getTableNamesForAgent(agentName);
    
    if (!tables) {
      throw new Error(`Agente ${agentName} não possui mapeamento de tabelas válido`);
    }
    
    console.log(`🔍 Buscando dados nas tabelas: ${tables.messagesTable} e ${tables.metricsTable}`);
    
    // Buscar mensagens básicas
    const { data: basicMessages, error: basicError } = await supabase
      .from(tables.messagesTable)
      .select('*')
      .limit(1000);
    
    if (basicError) {
      console.error('❌ Erro ao buscar mensagens básicas:', basicError);
      // Continuar com array vazio em caso de erro
    }
    
    // Buscar dados de métricas
    const { data: metricsMessages, error: metricsError } = await supabase
      .from(tables.metricsTable)
      .select('*')
      .limit(500);
    
    if (metricsError) {
      console.error('❌ Erro ao buscar dados de métricas:', metricsError);
      // Continuar com array vazio em caso de erro
    }
    
    const validBasicMessages = basicMessages || [];
    const validMetricsMessages = metricsMessages || [];
    
    console.log(`📈 Dados obtidos: ${validBasicMessages.length} mensagens, ${validMetricsMessages.length} métricas`);
    
    // Analisar mensagens para identificar fontes
    const messageAnalysis = analyzeMessages(validBasicMessages);
    
    // Calcular distribuição de fontes
    const sourceDistribution = messageAnalysis.lead_source_indicators;
    
    // Calcular taxas de conversão por fonte baseado nos dados de métricas
    const sourceConversionRates: Record<string, any> = {};
    
    Object.keys(sourceDistribution).forEach(source => {
      const sourceCount = sourceDistribution[source];
      if (sourceCount > 0) {
        // Filtrar métricas relacionadas a esta fonte
        const relatedMetrics = validMetricsMessages.filter(m => 
          m && (m.conversao_indicada_mvp === 'Sim' || m.aderência_script_nivel === 'Alto')
        );
        
        // Calcular métricas de conversão
        const conversions = relatedMetrics.filter(m => m.conversao_indicada_mvp === 'Sim').length;
        const conversionRate = sourceCount > 0 
          ? ((conversions / sourceCount) * 100).toFixed(1)
          : '0.0';
          
        const scriptEffective = relatedMetrics.filter(m => m.aderência_script_nivel === 'Alto').length;
        const scriptEffectiveness = sourceCount > 0
          ? ((scriptEffective / sourceCount) * 100).toFixed(1)
          : '0.0';
        
        // Calcular intensidade alta baseada na distribuição das métricas
        const highIntensityBase = Math.min(sourceCount * 0.3, conversions * 1.5);
        const highIntensityRate = sourceCount > 0
          ? ((highIntensityBase / sourceCount) * 100).toFixed(1)
          : '0.0';
        
        sourceConversionRates[source] = {
          conversion_rate: `${conversionRate}%`,
          script_effectiveness_rate: `${scriptEffectiveness}%`,
          high_intensity_rate: `${highIntensityRate}%`
        };
      }
    });
    
    // Identificar melhor e pior fonte
    const sourceEntries = Object.entries(sourceDistribution).filter(([, count]) => count > 0);
    const bestSource = sourceEntries.length > 0 
      ? sourceEntries.reduce((best, current) => current[1] > best[1] ? current : best, sourceEntries[0])[0]
      : 'N/A';
    const worstSource = sourceEntries.length > 0 
      ? sourceEntries.reduce((worst, current) => current[1] < worst[1] ? current : worst, sourceEntries[0])[0]
      : 'N/A';
    
    // Gerar recomendações baseadas nos dados reais
    const recommendations = generateRecommendations(
      messageAnalysis, 
      sourceDistribution, 
      validBasicMessages.length,
      validMetricsMessages.length
    );
    
    const result: LeadSourceAnalysisResult = {
      agent_name: agentName,
      source_distribution: sourceDistribution,
      source_conversion_rates: sourceConversionRates,
      message_analysis: messageAnalysis,
      best_performing_source: bestSource,
      worst_performing_source: worstSource,
      recommendations,
      data_quality: {
        total_messages: validBasicMessages.length,
        total_metrics: validMetricsMessages.length,
        data_consistency: validBasicMessages.length > 0 && validMetricsMessages.length > 0
      }
    };
    
    console.log('✅ Análise de fontes de leads concluída:', {
      agent: result.agent_name,
      totalSources: Object.keys(result.source_distribution).length,
      bestSource: result.best_performing_source,
      dataQuality: result.data_quality
    });
    
    return result;
    
  } catch (error) {
    console.error('❌ Erro na análise de fontes de leads:', error);
    
    // Retornar dados de fallback em caso de erro
    return {
      agent_name: agentName,
      source_distribution: { whatsapp: 1, unknown: 0 },
      source_conversion_rates: {
        whatsapp: {
          conversion_rate: '0.0%',
          script_effectiveness_rate: '0.0%',
          high_intensity_rate: '0.0%'
        }
      },
      message_analysis: {
        lead_source_indicators: { whatsapp: 1, instagram: 0, website: 0, referral: 0, google: 0, facebook: 0, unknown: 0 },
        message_patterns: { greeting_patterns: [], interest_indicators: [], source_mentions: [] },
        engagement_metrics: { total_messages: 0, avg_message_length: 0, response_patterns: [] }
      },
      best_performing_source: 'whatsapp',
      worst_performing_source: 'whatsapp',
      recommendations: [`Erro ao analisar dados para ${agentName}: ${error.message}`],
      data_quality: {
        total_messages: 0,
        total_metrics: 0,
        data_consistency: false
      }
    };
  }
};

function generateRecommendations(
  messageAnalysis: MessageAnalysisResult, 
  sourceDistribution: Record<string, number>,
  totalMessages: number,
  totalMetrics: number
): string[] {
  const recommendations: string[] = [];
  
  // Verificar qualidade dos dados
  if (totalMessages === 0) {
    recommendations.push('⚠️ Nenhuma mensagem encontrada - verificar conexão com banco de dados');
    return recommendations;
  }
  
  if (totalMetrics === 0) {
    recommendations.push('⚠️ Nenhuma métrica encontrada - análise de conversão limitada');
  }
  
  // Recomendações baseadas na distribuição de fontes
  const totalLeads = Object.values(sourceDistribution).reduce((sum, count) => sum + count, 0);
  const topSource = Object.entries(sourceDistribution).reduce((max, current) => 
    current[1] > max[1] ? current : max, ['unknown', 0]);
  
  if (totalLeads > 0) {
    const topSourcePercentage = (topSource[1] / totalLeads) * 100;
    
    if (topSourcePercentage > 70) {
      recommendations.push(`🎯 Fonte dominante: ${topSource[0]} (${topSourcePercentage.toFixed(1)}%) - Considere diversificar as fontes de leads`);
    } else if (topSourcePercentage > 50) {
      recommendations.push(`📊 Fonte principal: ${topSource[0]} (${topSourcePercentage.toFixed(1)}%) - Performance concentrada`);
    }
  }
  
  // Recomendações baseadas nos padrões de mensagem
  if (messageAnalysis.message_patterns.source_mentions.length > 0) {
    recommendations.push(`💬 Fontes mencionadas pelos leads: ${messageAnalysis.message_patterns.source_mentions.slice(0, 3).join(', ')}`);
  }
  
  // Recomendações baseadas no engajamento
  const avgLength = messageAnalysis.engagement_metrics.avg_message_length;
  if (avgLength < 15) {
    recommendations.push('📝 Mensagens muito curtas - leads podem precisar de mais qualificação inicial');
  } else if (avgLength > 100) {
    recommendations.push('✅ Leads engajados com mensagens detalhadas - boa qualidade dos prospects');
  }
  
  // Recomendações específicas por fonte
  const instagramLeads = sourceDistribution.instagram || 0;
  const googleLeads = sourceDistribution.google || 0;
  
  if (instagramLeads > totalLeads * 0.3) {
    recommendations.push('📱 Alto volume do Instagram - otimizar bio e stories para conversão');
  }
  
  if (googleLeads > totalLeads * 0.2) {
    recommendations.push('🔍 Tráfego significativo do Google - revisar SEO e landing pages');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('📈 Análise em andamento - colete mais dados para insights detalhados');
  }
  
  return recommendations;
}

