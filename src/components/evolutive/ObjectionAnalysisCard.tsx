
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  TrendingDown, 
  Target, 
  Clock,
  DollarSign,
  Users,
  Shield,
  MapPin
} from 'lucide-react';

interface ObjectionAnalysisProps {
  data: any;
}

export const ObjectionAnalysisCard = ({ data }: ObjectionAnalysisProps) => {
  if (!data?.objection_analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Análise de Objeções
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Dados de objeções não disponíveis</p>
        </CardContent>
      </Card>
    );
  }

  const analysis = data.objection_analysis;
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Preço': return <DollarSign className="h-4 w-4" />;
      case 'Agenda/Tempo': return <Clock className="h-4 w-4" />;
      case 'Confiança/Medo': return <Shield className="h-4 w-4" />;
      case 'Autoridade/Decisão': return <Users className="h-4 w-4" />;
      case 'Localização': return <MapPin className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Alta': return 'bg-red-500';
      case 'Média': return 'bg-yellow-500';
      case 'Baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Análise de Objeções - {analysis.agent_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{analysis.total_objections}</div>
              <div className="text-sm text-muted-foreground">Total de Objeções</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analysis.conversion_impact?.conversion_rate || '0%'}</div>
              <div className="text-sm text-muted-foreground">Taxa de Conversão Pós-Objeção</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analysis.script_effectiveness?.effectiveness_rate || '0%'}</div>
              <div className="text-sm text-muted-foreground">Eficácia do Script</div>
            </div>
            <div className="text-center">
              <Badge variant="destructive" className="text-sm">
                {analysis.most_common_objection}
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">Objeção Mais Comum</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Distribuição por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analysis.category_distribution || {}).map(([category, count]) => {
              const percentage = analysis.total_objections > 0 
                ? ((count as number / analysis.total_objections) * 100).toFixed(1) 
                : 0;
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{count} ({percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={Number(percentage)} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Etapa do Funil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Distribuição por Etapa do Funil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analysis.funnel_stage_distribution || {}).map(([stage, count]) => {
              const percentage = analysis.total_objections > 0 
                ? ((count as number / analysis.total_objections) * 100).toFixed(1) 
                : 0;
              
              const iscritical = stage === analysis.critical_stage;
              
              return (
                <div key={stage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${iscritical ? 'text-red-600' : ''}`}>
                        {stage}
                      </span>
                      {iscritical && <Badge variant="destructive" className="text-xs">Crítico</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{count} ({percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={Number(percentage)} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Análise de Intensidade */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Intensidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(analysis.intensity_analysis || {}).map(([intensity, count]) => {
              const percentage = analysis.total_objections > 0 
                ? ((count as number / analysis.total_objections) * 100).toFixed(1) 
                : 0;
              
              return (
                <div key={intensity} className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${getIntensityColor(intensity)}`}></div>
                  <div className="font-semibold">{count}</div>
                  <div className="text-sm text-muted-foreground">{intensity}</div>
                  <div className="text-xs text-muted-foreground">({percentage}%)</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendações de Melhoria</CardTitle>
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
