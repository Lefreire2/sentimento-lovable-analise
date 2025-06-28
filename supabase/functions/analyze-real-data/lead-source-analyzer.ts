
interface LeadSourceData {
  lead_source: string;
  objection_category: string;
  intensity_level: string;
  conversion_impact: boolean | null;
  script_effectiveness: boolean | null;
}

export function analyzeLeadSourceDistribution(data: any[]): Record<string, number> {
  const distribution: Record<string, number> = {};
  data.forEach(obj => {
    const source = obj.lead_source || 'Não Identificado';
    distribution[source] = (distribution[source] || 0) + 1;
  });
  return distribution;
}

export function analyzeSourceVsObjectionCategory(data: any[]): Record<string, Record<string, number>> {
  const analysis: Record<string, Record<string, number>> = {};
  
  data.forEach(obj => {
    const source = obj.lead_source || 'Não Identificado';
    const category = obj.objection_category;
    
    if (!analysis[source]) {
      analysis[source] = {};
    }
    
    analysis[source][category] = (analysis[source][category] || 0) + 1;
  });
  
  return analysis;
}

export function analyzeSourceConversionRates(data: any[]): Record<string, any> {
  const sourceStats: Record<string, any> = {};
  
  data.forEach(obj => {
    const source = obj.lead_source || 'Não Identificado';
    
    if (!sourceStats[source]) {
      sourceStats[source] = {
        total: 0,
        conversions: 0,
        overcome_objections: 0,
        high_intensity: 0
      };
    }
    
    sourceStats[source].total += 1;
    
    if (obj.conversion_impact === true) {
      sourceStats[source].conversions += 1;
    }
    
    if (obj.script_effectiveness === true) {
      sourceStats[source].overcome_objections += 1;
    }
    
    if (obj.intensity_level === 'Alta') {
      sourceStats[source].high_intensity += 1;
    }
  });
  
  // Calculate rates
  Object.keys(sourceStats).forEach(source => {
    const stats = sourceStats[source];
    stats.conversion_rate = stats.total > 0 ? ((stats.conversions / stats.total) * 100).toFixed(1) + '%' : '0%';
    stats.script_effectiveness_rate = stats.total > 0 ? ((stats.overcome_objections / stats.total) * 100).toFixed(1) + '%' : '0%';
    stats.high_intensity_rate = stats.total > 0 ? ((stats.high_intensity / stats.total) * 100).toFixed(1) + '%' : '0%';
  });
  
  return sourceStats;
}

export function generateLeadSourceRecommendations(
  sourceDistribution: Record<string, number>,
  sourceVsObjections: Record<string, Record<string, number>>,
  conversionRates: Record<string, any>
): string[] {
  const recommendations = [];
  
  // Identificar melhor fonte
  const bestSource = Object.keys(conversionRates).reduce((best, source) => {
    const bestRate = parseFloat(conversionRates[best]?.conversion_rate?.replace('%', '') || '0');
    const currentRate = parseFloat(conversionRates[source]?.conversion_rate?.replace('%', '') || '0');
    return currentRate > bestRate ? source : best;
  });
  
  if (bestSource && bestSource !== 'Não Identificado') {
    recommendations.push(`Investir mais em "${bestSource}" - melhor taxa de conversão (${conversionRates[bestSource].conversion_rate})`);
  }
  
  // Identificar pior fonte
  const worstSource = Object.keys(conversionRates).reduce((worst, source) => {
    if (source === 'Não Identificado') return worst;
    const worstRate = parseFloat(conversionRates[worst]?.conversion_rate?.replace('%', '') || '100');
    const currentRate = parseFloat(conversionRates[source]?.conversion_rate?.replace('%', '') || '100');
    return currentRate < worstRate ? source : worst;
  });
  
  if (worstSource && worstSource !== 'Não Identificado') {
    recommendations.push(`Revisar estratégia para "${worstSource}" - baixa conversão (${conversionRates[worstSource].conversion_rate})`);
  }
  
  // Analisar fontes com alta intensidade de objeções
  Object.keys(conversionRates).forEach(source => {
    const highIntensityRate = parseFloat(conversionRates[source].high_intensity_rate?.replace('%', '') || '0');
    if (highIntensityRate > 50) {
      recommendations.push(`Melhorar qualificação prévia para "${source}" - alta intensidade de objeções (${conversionRates[source].high_intensity_rate})`);
    }
  });
  
  // Recomendar melhoria de scripts
  Object.keys(conversionRates).forEach(source => {
    const scriptRate = parseFloat(conversionRates[source].script_effectiveness_rate?.replace('%', '') || '0');
    if (scriptRate < 60 && conversionRates[source].total >= 5) {
      recommendations.push(`Treinar scripts específicos para objeções de "${source}" - baixa eficácia (${conversionRates[source].script_effectiveness_rate})`);
    }
  });
  
  return recommendations.slice(0, 5); // Máximo 5 recomendações
}

export async function generateSimulatedLeadSourceData(agentName: string) {
  console.log('📊 Gerando análise simulada de fontes de lead para:', agentName);
  
  const leadSources = [
    'Instagram Feed', 'Instagram Stories', 'Google Ads', 'Google Orgânico', 
    'Blog', 'Indicação', 'Site Direto', 'Facebook Ads', 'YouTube', 'WhatsApp Grupos'
  ];
  
  const simulatedData = leadSources.map(source => ({
    lead_source: source,
    total_objections: Math.floor(Math.random() * 15) + 3,
    conversion_rate: Math.floor(Math.random() * 40) + 20,
    script_effectiveness_rate: Math.floor(Math.random() * 30) + 50,
    high_intensity_rate: Math.floor(Math.random() * 25) + 10,
    most_common_objection: ['Preço', 'Agenda/Tempo', 'Confiança/Medo'][Math.floor(Math.random() * 3)]
  }));
  
  const sourceDistribution = simulatedData.reduce((acc, item) => {
    acc[item.lead_source] = item.total_objections;
    return acc;
  }, {} as Record<string, number>);
  
  const conversionRates = simulatedData.reduce((acc, item) => {
    acc[item.lead_source] = {
      total: item.total_objections,
      conversion_rate: `${item.conversion_rate}%`,
      script_effectiveness_rate: `${item.script_effectiveness_rate}%`,
      high_intensity_rate: `${item.high_intensity_rate}%`
    };
    return acc;
  }, {} as Record<string, any>);
  
  return {
    lead_source_analysis: {
      agent_name: agentName,
      source_distribution: sourceDistribution,
      source_conversion_rates: conversionRates,
      best_performing_source: simulatedData.reduce((best, current) => 
        current.conversion_rate > best.conversion_rate ? current : best
      ).lead_source,
      worst_performing_source: simulatedData.reduce((worst, current) => 
        current.conversion_rate < worst.conversion_rate ? current : worst
      ).lead_source,
      recommendations: generateLeadSourceRecommendations(sourceDistribution, {}, conversionRates)
    }
  };
}
