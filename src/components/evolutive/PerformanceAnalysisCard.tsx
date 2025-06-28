
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Clock, 
  Target,
  MessageSquare,
  Activity
} from 'lucide-react';

interface PerformanceAnalysisCardProps {
  data: any;
}

export const PerformanceAnalysisCard = ({ data }: PerformanceAnalysisCardProps) => {
  const performanceData = data.performance_metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Tempo Médio de Resposta */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Tempo Médio de Resposta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{performanceData.avg_response_time} min</div>
          <p className="text-sm text-muted-foreground">Por mensagem</p>
        </CardContent>
      </Card>

      {/* Taxa de Conversão */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Taxa de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-600">{performanceData.conversion_rate}%</div>
            <Progress value={parseFloat(performanceData.conversion_rate)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Score de Aderência */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4" />
            Score de Aderência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">{performanceData.adherence_score}%</div>
            <Progress value={parseFloat(performanceData.adherence_score)} className="h-2" />
            <p className="text-sm text-muted-foreground">Aderência ao script</p>
          </div>
        </CardContent>
      </Card>

      {/* Perguntas Realizadas */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Perguntas Realizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{performanceData.questions_asked}</div>
          <p className="text-sm text-muted-foreground">Média por conversa</p>
        </CardContent>
      </Card>

      {/* Total de Interações */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Total de Interações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-indigo-600">{performanceData.total_interactions}</div>
          <p className="text-sm text-muted-foreground">Conversas analisadas</p>
        </CardContent>
      </Card>

      {/* Resumo de Performance */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Resumo Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Conversão:</span>
              <Badge variant="default">{performanceData.conversion_rate}%</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Aderência:</span>
              <Badge variant="secondary">{performanceData.adherence_score}%</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Tempo Médio:</span>
              <Badge variant="outline">{performanceData.avg_response_time} min</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
