
export function calculateAverageResponseTime(data: any[]): string {
  const responseTimes = data
    .map(row => parseFloat(row.tempo_medio_resposta_atendente_minutos))
    .filter(time => !isNaN(time));
  
  if (responseTimes.length === 0) return '0';
  
  const average = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
  return average.toFixed(2);
}

export function calculateConversionRate(data: any[]): string {
  const conversions = data.filter(row => row.conversao_indicada_mvp === 'Sim').length;
  return data.length > 0 ? ((conversions / data.length) * 100).toFixed(2) : '0';
}

export function calculateAverageAdherence(data: any[]): string {
  const adherenceScores = data
    .map(row => parseFloat(row.pontuacao_aderencia_percentual))
    .filter(score => !isNaN(score));
  
  if (adherenceScores.length === 0) return '0';
  
  const average = adherenceScores.reduce((sum, score) => sum + score, 0) / adherenceScores.length;
  return average.toFixed(2);
}

export function calculateAverageQuestions(data: any[]): string {
  const questionCounts = data
    .map(row => parseFloat(row.numero_perguntas_vendedor))
    .filter(count => !isNaN(count));
  
  if (questionCounts.length === 0) return '0';
  
  const average = questionCounts.reduce((sum, count) => sum + count, 0) / questionCounts.length;
  return average.toFixed(1);
}

export function calculateConversationQuality(data: any[]): string {
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
