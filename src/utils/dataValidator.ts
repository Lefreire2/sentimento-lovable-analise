
export interface DataValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  correctedValues?: Record<string, any>;
  stageAnalysisIssues?: {
    funnelStageInconsistencies: string[];
    intensityDistributionErrors: string[];
    conversionCalculationErrors: string[];
  };
}

export const validateAnalysisData = (data: any): DataValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const correctedValues: Record<string, any> = {};
  const stageAnalysisIssues = {
    funnelStageInconsistencies: [] as string[],
    intensityDistributionErrors: [] as string[],
    conversionCalculationErrors: [] as string[]
  };

  // Validar taxa de conversão
  if (data.conversions?.rate) {
    const rate = parseFloat(data.conversions.rate);
    if (rate > 100) {
      errors.push(`Taxa de conversão inválida: ${rate}% (máximo permitido: 100%)`);
      const correctedRate = Math.min((data.conversions.count / data.total_conversations) * 100, 100);
      correctedValues.conversionRate = correctedRate.toFixed(2);
      stageAnalysisIssues.conversionCalculationErrors.push(`Taxa de conversão corrigida de ${rate}% para ${correctedRate.toFixed(2)}%`);
    }
  }

  // Validar distribuição por etapa do funil
  if (data.funnel_stage_distribution) {
    const stages = Object.values(data.funnel_stage_distribution) as number[];
    const totalStages = stages.reduce((sum, count) => sum + count, 0);
    
    if (totalStages !== data.total_objections) {
      warnings.push(`Inconsistência na distribuição do funil: total de etapas (${totalStages}) não coincide com total de objeções (${data.total_objections})`);
      stageAnalysisIssues.funnelStageInconsistencies.push(`Diferença de ${Math.abs(totalStages - data.total_objections)} entre distribuição e total`);
    }

    // Verificar se há concentração excessiva em uma etapa
    stages.forEach((count, index) => {
      const percentage = (count / data.total_objections) * 100;
      if (percentage > 50) {
        const stageName = Object.keys(data.funnel_stage_distribution)[index];
        warnings.push(`Alta concentração de objeções na etapa "${stageName}": ${percentage.toFixed(1)}%`);
        stageAnalysisIssues.funnelStageInconsistencies.push(`Etapa crítica identificada: ${stageName} com ${percentage.toFixed(1)}%`);
      }
    });
  }

  // Validar análise de intensidade
  if (data.intensity_analysis) {
    const intensities = Object.values(data.intensity_analysis) as number[];
    const totalIntensities = intensities.reduce((sum, count) => sum + count, 0);
    
    if (totalIntensities !== data.total_objections) {
      warnings.push(`Inconsistência na análise de intensidade: total (${totalIntensities}) não coincide com total de objeções (${data.total_objections})`);
      stageAnalysisIssues.intensityDistributionErrors.push(`Diferença de ${Math.abs(totalIntensities - data.total_objections)} na distribuição de intensidade`);
    }

    // Verificar distribuição equilibrada de intensidades
    const highIntensity = data.intensity_analysis['Alta'] || 0;
    const mediumIntensity = data.intensity_analysis['Média'] || 0;
    const lowIntensity = data.intensity_analysis['Baixa'] || 0;

    if (highIntensity > (data.total_objections * 0.4)) {
      warnings.push(`Alto número de objeções de alta intensidade: ${highIntensity} (${((highIntensity / data.total_objections) * 100).toFixed(1)}%)`);
      stageAnalysisIssues.intensityDistributionErrors.push(`Intensidade alta excessiva: requer atenção imediata`);
    }
  }

  // Validar agendamentos
  if (data.appointments?.count && data.total_conversations) {
    const appointmentRate = (data.appointments.count / data.total_conversations) * 100;
    if (appointmentRate > 100) {
      errors.push(`Taxa de agendamento inválida: ${appointmentRate.toFixed(2)}%`);
      stageAnalysisIssues.conversionCalculationErrors.push(`Taxa de agendamento corrigida`);
    }
  }

  // Verificar consistência entre bases de dados
  if (data.data_consistency?.unique_leads_basic && data.data_consistency?.unique_leads_metrics) {
    const basic = data.data_consistency.unique_leads_basic;
    const metrics = data.data_consistency.unique_leads_metrics;
    const difference = Math.abs(basic - metrics);
    const percentageDiff = (difference / Math.max(basic, metrics)) * 100;
    
    if (percentageDiff > 20) {
      warnings.push(`Grande discrepância entre bases: ${basic} (básica) vs ${metrics} (métricas)`);
    }
  }

  // Validar eficácia do script vs conversão
  if (data.script_effectiveness && data.conversion_impact) {
    const scriptRate = parseFloat(data.script_effectiveness.effectiveness_rate?.replace('%', '') || '0');
    const conversionRate = parseFloat(data.conversion_impact.conversion_rate?.replace('%', '') || '0');
    
    if (scriptRate > 80 && conversionRate < 30) {
      warnings.push(`Inconsistência: alta eficácia do script (${scriptRate}%) mas baixa conversão (${conversionRate}%)`);
      stageAnalysisIssues.conversionCalculationErrors.push(`Revisar metodologia de cálculo de conversão`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    correctedValues,
    stageAnalysisIssues
  };
};

export const correctConversionCalculations = (data: any) => {
  const corrected = { ...data };
  
  // Corrigir taxa de conversão usando base mais confiável
  if (corrected.total_conversations && corrected.conversions?.count) {
    const realRate = (corrected.conversions.count / corrected.total_conversations) * 100;
    corrected.conversions.rate = Math.min(realRate, 100).toFixed(2);
  }

  // Padronizar contagem de agendamentos
  if (corrected.appointments?.count) {
    const appointmentRate = (corrected.appointments.count / corrected.total_conversations) * 100;
    corrected.appointments.rate = Math.min(appointmentRate, 100).toFixed(2);
  }

  // Corrigir distribuição de etapas do funil se necessário
  if (corrected.funnel_stage_distribution && corrected.total_objections) {
    const stages = Object.values(corrected.funnel_stage_distribution) as number[];
    const totalStages = stages.reduce((sum, count) => sum + count, 0);
    
    if (totalStages !== corrected.total_objections) {
      // Redistribuir proporcionalmente
      const factor = corrected.total_objections / totalStages;
      Object.keys(corrected.funnel_stage_distribution).forEach(stage => {
        corrected.funnel_stage_distribution[stage] = Math.round(corrected.funnel_stage_distribution[stage] * factor);
      });
    }
  }

  // Corrigir análise de intensidade se necessário
  if (corrected.intensity_analysis && corrected.total_objections) {
    const intensities = Object.values(corrected.intensity_analysis) as number[];
    const totalIntensities = intensities.reduce((sum, count) => sum + count, 0);
    
    if (totalIntensities !== corrected.total_objections) {
      // Redistribuir proporcionalmente
      const factor = corrected.total_objections / totalIntensities;
      Object.keys(corrected.intensity_analysis).forEach(intensity => {
        corrected.intensity_analysis[intensity] = Math.round(corrected.intensity_analysis[intensity] * factor);
      });
    }
  }

  return corrected;
};

// Nova função para validar especificamente as etapas de análise do André Araújo
export const validateAndreAraujoAnalysis = (data: any): DataValidationResult => {
  const validation = validateAnalysisData(data);
  
  // Validações específicas baseadas nos dados mostrados nas imagens
  const specificErrors: string[] = [];
  const specificWarnings: string[] = [];
  
  // Verificar se a distribuição de categorias soma corretamente
  if (data.category_distribution) {
    const categoryTotal = Object.values(data.category_distribution).reduce((sum: number, count) => sum + (count as number), 0);
    if (categoryTotal !== data.total_objections) {
      specificErrors.push(`Distribuição de categorias inconsistente: ${categoryTotal} vs ${data.total_objections} total`);
    }
  }

  // Verificar se a etapa crítica identificada é consistente
  if (data.critical_stage === 'Pós-Apresentação do Preço' && data.most_common_objection === 'Preço') {
    specificWarnings.push('Confirmado: problema concentrado na apresentação de preços - requer intervenção imediata');
  }

  return {
    ...validation,
    errors: [...validation.errors, ...specificErrors],
    warnings: [...validation.warnings, ...specificWarnings]
  };
};
