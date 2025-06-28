
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { LeadSourceOverview } from './lead-source/LeadSourceOverview';
import { LeadSourceDistribution } from './lead-source/LeadSourceDistribution';
import { LeadSourcePerformance } from './lead-source/LeadSourcePerformance';
import { LeadSourceRecommendations } from './lead-source/LeadSourceRecommendations';

interface LeadSourceAnalysisProps {
  data: any;
}

export const LeadSourceAnalysisCard = ({ data }: LeadSourceAnalysisProps) => {
  if (!data?.lead_source_analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Análise de Fontes de Lead
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Dados de fontes de lead não disponíveis</p>
        </CardContent>
      </Card>
    );
  }

  const analysis = data.lead_source_analysis;
  
  const totalSources = Object.keys(analysis.source_distribution || {}).length;
  const totalObjections: number = Object.values(analysis.source_distribution || {})
    .reduce((sum: number, count: unknown) => sum + Number(count || 0), 0);

  // Safely convert values to strings for display
  const bestPerformingSource = String(analysis.best_performing_source || 'N/A');
  const worstPerformingSource = String(analysis.worst_performing_source || 'N/A');

  return (
    <div className="space-y-6">
      <LeadSourceOverview
        agentName={analysis.agent_name}
        totalSources={totalSources}
        totalObjections={totalObjections}
        bestPerformingSource={bestPerformingSource}
        worstPerformingSource={worstPerformingSource}
      />

      <LeadSourceDistribution
        sourceDistribution={analysis.source_distribution || {}}
        totalObjections={totalObjections}
      />

      <LeadSourcePerformance
        sourceConversionRates={analysis.source_conversion_rates || {}}
      />

      <LeadSourceRecommendations
        recommendations={analysis.recommendations || []}
      />
    </div>
  );
};
