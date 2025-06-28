
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users,
  Globe,
  Instagram,
  Search,
  MessageSquare
} from 'lucide-react';

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
  
  const getSourceIcon = (source: string) => {
    if (source.toLowerCase().includes('instagram')) return <Instagram className="h-4 w-4" />;
    if (source.toLowerCase().includes('google') || source.toLowerCase().includes('search')) return <Search className="h-4 w-4" />;
    if (source.toLowerCase().includes('whatsapp')) return <MessageSquare className="h-4 w-4" />;
    return <Globe className="h-4 w-4" />;
  };

  const getSourceColor = (rate: string) => {
    const numRate = parseFloat(rate.replace('%', ''));
    if (numRate >= 40) return 'text-green-600';
    if (numRate >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalSources = Object.keys(analysis.source_distribution || {}).length;
  const totalObjections: number = Object.values(analysis.source_distribution || {})
    .reduce((sum: number, count: unknown) => sum + Number(count || 0), 0);

  // Safely convert values to strings for display
  const bestPerformingSource = String(analysis.best_performing_source || 'N/A');
  const worstPerformingSource = String(analysis.worst_performing_source || 'N/A');

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Análise de Fontes de Lead - {analysis.agent_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalSources}</div>
              <div className="text-sm text-muted-foreground">Fontes Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalObjections}</div>
              <div className="text-sm text-muted-foreground">Total de Objeções</div>
            </div>
            <div className="text-center">
              <Badge variant="default" className="text-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                {bestPerformingSource}
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">Melhor Fonte</div>
            </div>
            <div className="text-center">
              <Badge variant="destructive" className="text-sm">
                <TrendingDown className="h-3 w-3 mr-1" />
                {worstPerformingSource}
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">Pior Fonte</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Fonte */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Distribuição de Objeções por Fonte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analysis.source_distribution || {}).map(([source, count]) => {
              const numCount = Number(count || 0);
              const percentage = totalObjections > 0 
                ? ((numCount / totalObjections) * 100).toFixed(1) 
                : '0';
              
              return (
                <div key={source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getSourceIcon(source)}
                      <span className="font-medium">{source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{numCount} ({percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={Number(percentage)} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance por Fonte */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance de Conversão por Fonte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Fonte</th>
                  <th className="text-center p-2">Taxa Conversão</th>
                  <th className="text-center p-2">Eficácia Script</th>
                  <th className="text-center p-2">Alta Intensidade</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(analysis.source_conversion_rates || {}).map(([source, rates]: [string, any]) => (
                  <tr key={source} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(source)}
                        <span className="font-medium">{source}</span>
                      </div>
                    </td>
                    <td className="text-center p-2">
                      <span className={`font-semibold ${getSourceColor(rates.conversion_rate || '0%')}`}>
                        {rates.conversion_rate || '0%'}
                      </span>
                    </td>
                    <td className="text-center p-2">
                      <span className={`font-semibold ${getSourceColor(rates.script_effectiveness_rate || '0%')}`}>
                        {rates.script_effectiveness_rate || '0%'}
                      </span>
                    </td>
                    <td className="text-center p-2">
                      <span className="text-red-600 font-semibold">
                        {rates.high_intensity_rate || '0%'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendações por Fonte de Lead</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.recommendations?.map((recommendation: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
