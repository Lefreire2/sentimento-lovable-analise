
import { ObjectionData } from './types.ts';

export function analyzeCategoryDistribution(data: ObjectionData[]): Record<string, number> {
  const distribution: Record<string, number> = {};
  data.forEach(obj => {
    distribution[obj.objection_category] = (distribution[obj.objection_category] || 0) + 1;
  });
  return distribution;
}

export function analyzeFunnelStageDistribution(data: ObjectionData[]): Record<string, number> {
  const distribution: Record<string, number> = {};
  data.forEach(obj => {
    distribution[obj.funnel_stage] = (distribution[obj.funnel_stage] || 0) + 1;
  });
  return distribution;
}

export function analyzeIntensityDistribution(data: ObjectionData[]): Record<string, number> {
  const distribution: Record<string, number> = {};
  data.forEach(obj => {
    distribution[obj.intensity_level] = (distribution[obj.intensity_level] || 0) + 1;
  });
  return distribution;
}

export function analyzeConversionImpact(data: ObjectionData[]) {
  const converted = data.filter(obj => obj.conversion_impact === true).length;
  const notConverted = data.filter(obj => obj.conversion_impact === false).length;
  const total = converted + notConverted;
  
  return {
    converted_after_objection: converted,
    not_converted: notConverted,
    conversion_rate: total > 0 ? ((converted / total) * 100).toFixed(1) + '%' : '0%'
  };
}

export function analyzeScriptEffectiveness(data: ObjectionData[]) {
  const overcame = data.filter(obj => obj.script_effectiveness === true).length;
  const failed = data.filter(obj => obj.script_effectiveness === false).length;
  const total = overcame + failed;
  
  return {
    overcame_objection: overcame,
    failed_to_overcome: failed,
    effectiveness_rate: total > 0 ? ((overcame / total) * 100).toFixed(1) + '%' : '0%'
  };
}

export function getMostCommonObjection(distribution: Record<string, number>): string {
  return Object.keys(distribution).reduce((a, b) => distribution[a] > distribution[b] ? a : b);
}

export function getCriticalStage(distribution: Record<string, number>): string {
  return Object.keys(distribution).reduce((a, b) => distribution[a] > distribution[b] ? a : b);
}

export function generateObjectionRecommendations(
  categoryDist: Record<string, number>, 
  stageDist: Record<string, number>, 
  effectiveness: any
): string[] {
  const recommendations = [];
  const mostCommon = getMostCommonObjection(categoryDist);
  const criticalStage = getCriticalStage(stageDist);
  
  // Recomendações baseadas na categoria mais comum
  if (mostCommon === 'Preço') {
    recommendations.push('Desenvolver scripts mais eficazes para objeções de preço');
    recommendations.push('Melhorar apresentação de valor antes da apresentação do preço');
  } else if (mostCommon === 'Agenda/Tempo') {
    recommendations.push('Treinar técnicas de contorno de objeções de agenda');
    recommendations.push('Oferecer mais flexibilidade de horários');
  } else if (mostCommon === 'Confiança/Medo') {
    recommendations.push('Construir mais confiança através de depoimentos e cases');
    recommendations.push('Reduzir riscos percebidos com garantias');
  }
  
  // Recomendações baseadas no estágio crítico
  if (criticalStage === 'Pós-Apresentação do Preço') {
    recommendations.push('Revisar estratégia de apresentação de preços');
  } else if (criticalStage === 'Na Tentativa de Agendamento') {
    recommendations.push('Melhorar técnicas de fechamento e criação de urgência');
  }
  
  // Recomendação geral
  recommendations.push('Implementar seguimento estruturado pós-objeção');
  
  return recommendations.slice(0, 4); // Máximo 4 recomendações
}

export async function generateSimulatedObjections(supabase: any, agentName: string) {
  console.log('📊 Gerando análise simulada de objeções para:', agentName);
  
  // Simulação baseada em padrões comuns de objeções
  const simulatedData = {
    objection_analysis: {
      agent_name: agentName,
      total_objections: Math.floor(Math.random() * 50) + 20, // Entre 20-70 objeções
      category_distribution: {
        'Preço': Math.floor(Math.random() * 15) + 5,
        'Agenda/Tempo': Math.floor(Math.random() * 12) + 3,
        'Confiança/Medo': Math.floor(Math.random() * 10) + 2,
        'Necessidade/Urgência': Math.floor(Math.random() * 8) + 1,
        'Autoridade/Decisão': Math.floor(Math.random() * 6) + 1,
        'Localização': Math.floor(Math.random() * 4) + 1,
        'Outros': Math.floor(Math.random() * 3) + 1
      },
      funnel_stage_distribution: {
        'Início do Contato': Math.floor(Math.random() * 8) + 2,
        'Pós-Apresentação da Solução': Math.floor(Math.random() * 15) + 5,
        'Pós-Apresentação do Preço': Math.floor(Math.random() * 18) + 8,
        'Na Tentativa de Agendamento': Math.floor(Math.random() * 12) + 5
      },
      intensity_analysis: {
        'Baixa': Math.floor(Math.random() * 15) + 5,
        'Média': Math.floor(Math.random() * 20) + 10,
        'Alta': Math.floor(Math.random() * 10) + 3
      },
      conversion_impact: {
        converted_after_objection: Math.floor(Math.random() * 15) + 5,
        not_converted: Math.floor(Math.random() * 25) + 10,
        conversion_rate: '32.5%'
      },
      script_effectiveness: {
        overcame_objection: Math.floor(Math.random() * 20) + 8,
        failed_to_overcome: Math.floor(Math.random() * 15) + 5,
        effectiveness_rate: '68.2%'
      },
      most_common_objection: 'Preço',
      critical_stage: 'Pós-Apresentação do Preço',
      recommendations: [
        'Desenvolver scripts mais eficazes para objeções de preço',
        'Melhorar apresentação de valor antes da apresentação do preço',
        'Treinar técnicas de contorno de objeções de agenda',
        'Implementar seguimento estruturado pós-objeção'
      ]
    }
  };

  return simulatedData;
}
