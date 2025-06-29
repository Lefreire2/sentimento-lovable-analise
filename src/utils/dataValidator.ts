
export interface DataValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  correctedValues?: Record<string, any>;
}

export const validateAnalysisData = (data: any): DataValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const correctedValues: Record<string, any> = {};

  // Validar taxa de conversão
  if (data.conversions?.rate) {
    const rate = parseFloat(data.conversions.rate);
    if (rate > 100) {
      errors.push(`Taxa de conversão inválida: ${rate}% (máximo permitido: 100%)`);
      // Corrigir usando uma fórmula mais conservadora
      const correctedRate = Math.min((data.conversions.count / data.total_conversations) * 100, 100);
      correctedValues.conversionRate = correctedRate.toFixed(2);
    }
  }

  // Validar agendamentos
  if (data.appointments?.count && data.total_conversations) {
    const appointmentRate = (data.appointments.count / data.total_conversations) * 100;
    if (appointmentRate > 100) {
      errors.push(`Taxa de agendamento inválida: ${appointmentRate.toFixed(2)}%`);
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

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    correctedValues
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

  return corrected;
};
