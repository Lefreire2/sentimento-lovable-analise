
export function analyzeSentimentDistribution(data: any[]) {
  const overallSentiments = data.map(row => row.sentimento_geral_conversa).filter(Boolean);
  const userSentiments = data.map(row => row.sentimento_usuario).filter(Boolean);
  const agentSentiments = data.map(row => row.sentimento_atendente).filter(Boolean);
  const riskWords = data.map(row => parseInt(row.contagem_palavras_risco) || 0);

  const getMostCommon = (arr: string[]) => {
    if (arr.length === 0) return 'Neutro';
    const counts = arr.reduce((acc: any, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  };

  const totalRiskWords = riskWords.reduce((sum, count) => sum + count, 0);

  return {
    overall: getMostCommon(overallSentiments),
    user: getMostCommon(userSentiments),
    agent: getMostCommon(agentSentiments),
    riskWords: totalRiskWords.toString(),
    distribution: {
      positive: overallSentiments.filter(s => s === 'Positivo').length,
      neutral: overallSentiments.filter(s => s === 'Neutro').length,
      negative: overallSentiments.filter(s => s === 'Negativo').length
    }
  };
}
