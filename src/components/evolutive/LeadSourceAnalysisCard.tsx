
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, AlertTriangle, CheckCircle, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LeadSourceOverview } from './lead-source/LeadSourceOverview';
import { LeadSourceDistribution } from './lead-source/LeadSourceDistribution';
import { LeadSourcePerformance } from './lead-source/LeadSourcePerformance';
import { LeadSourceRecommendations } from './lead-source/LeadSourceRecommendations';
import { MessagePatternsCard } from './lead-source/MessagePatternsCard';

interface LeadSourceAnalysisProps {
  data: any;
}

export const LeadSourceAnalysisCard = ({ data }: LeadSourceAnalysisProps) => {
  if (!data?.lead_source_analysis) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Análise de Fontes de Lead
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-800">
            Dados de fontes de lead não disponíveis para este agente.
          </p>
        </CardContent>
      </Card>
    );
  }

  const analysis = data.lead_source_analysis;
  
  // Validação e normalização dos dados
  const sourceDistribution = analysis.source_distribution || {};
  const sourceDistributionValues = Object.values(sourceDistribution);
  
  const totalObjections = sourceDistributionValues.reduce((sum: number, count: unknown): number => {
    const numericCount = typeof count === 'number' ? count : (typeof count === 'string' ? Number(count) : 0);
    return sum + (isNaN(numericCount) ? 0 : numericCount);
  }, 0);

  const totalSources = Object.keys(sourceDistribution).filter(key => {
    const value = sourceDistribution[key];
    const numericValue = typeof value === 'number' ? value : (typeof value === 'string' ? Number(value) : 0);
    return !isNaN(numericValue) && numericValue > 0;
  }).length;

  // Verificar qualidade dos dados
  const dataQuality = analysis.data_quality || {
    total_messages: 0,
    total_metrics: 0,
    data_consistency: false
  };

  const bestPerformingSource = String(analysis.best_performing_source || 'N/A');
  const worstPerformingSource = String(analysis.worst_performing_source || 'N/A');

  return (
    <div className="space-y-6">
      {/* Indicador de Qualidade dos Dados */}
      <Card className={`border-2 ${dataQuality.data_consistency 
        ? 'border-green-200 bg-green-50' 
        : 'border-orange-200 bg-orange-50'
      }`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            {dataQuality.data_consistency ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-800">Dados Consistentes</span>
              </>
            ) : (
              <>
                <Database className="h-4 w-4 text-orange-600" />
                <span className="text-orange-800">Dados Limitados</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-lg">
                {dataQuality.total_messages.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Mensagens</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg">
                {dataQuality.total_metrics.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Métricas</div>
            </div>
            <div className="text-center">
              <Badge 
                variant={dataQuality.data_consistency ? "default" : "secondary"}
                className={dataQuality.data_consistency 
                  ? "bg-green-100 text-green-800" 
                  : "bg-orange-100 text-orange-800"
                }
              >
                {dataQuality.data_consistency ? "Completo" : "Parcial"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Principal */}
      <LeadSourceOverview
        agentName={analysis.agent_name}
        totalSources={totalSources}
        totalObjections={totalObjections}
        bestPerformingSource={bestPerformingSource}
        worstPerformingSource={worstPerformingSource}
      />

      {/* Distribuição de Fontes */}
      <LeadSourceDistribution
        sourceDistribution={sourceDistribution}
        totalObjections={totalObjections}
      />

      {/* Performance de Conversão */}
      <LeadSourcePerformance
        sourceConversionRates={analysis.source_conversion_rates || {}}
      />

      {/* Análise de Padrões de Mensagem */}
      {analysis.message_analysis && (
        <MessagePatternsCard messageAnalysis={analysis.message_analysis} />
      )}

      {/* Recomendações */}
      <LeadSourceRecommendations
        recommendations={analysis.recommendations || []}
      />
    </div>
  );
};
