
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react';

interface IntentionAnalysisCardProps {
  data: any;
}

export const IntentionAnalysisCard = ({ data }: IntentionAnalysisCardProps) => {
  const analysisData = data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total de Conversas */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Total de Conversas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysisData.total_conversations}</div>
          <p className="text-sm text-muted-foreground">
            {analysisData.total_processed_metrics} métricas processadas
          </p>
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
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{analysisData.conversions.rate}%</span>
              <Badge variant="secondary">{analysisData.conversions.count} conversões</Badge>
            </div>
            <Progress value={parseFloat(analysisData.conversions.rate)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Análise de Sentimento */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Sentimento Positivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{analysisData.sentiment_analysis.positive_rate}%</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {analysisData.sentiment_analysis.positive_count} positivos
              </Badge>
            </div>
            <Progress 
              value={parseFloat(analysisData.sentiment_analysis.positive_rate)} 
              className="h-2" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Agendamentos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{analysisData.appointments.rate}%</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {analysisData.appointments.count} agendados
              </Badge>
            </div>
            <Progress value={parseFloat(analysisData.appointments.rate)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tempo Médio de Resposta */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Tempo Médio de Resposta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysisData.engagement_metrics.avg_response_time} min</div>
          <p className="text-sm text-muted-foreground">Tempo médio por resposta</p>
        </CardContent>
      </Card>

      {/* Qualidade da Conversa */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Qualidade da Conversa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{analysisData.engagement_metrics.conversation_quality}%</div>
            <Progress 
              value={parseFloat(analysisData.engagement_metrics.conversation_quality)} 
              className="h-2" 
            />
            <p className="text-sm text-muted-foreground">Score de qualidade geral</p>
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Resumo da Análise - {data.agent_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-green-600">
                {analysisData.conversions.count}
              </div>
              <div className="text-sm text-muted-foreground">Conversões</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-600">
                {analysisData.appointments.count}
              </div>
              <div className="text-sm text-muted-foreground">Agendamentos</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-600">
                {analysisData.sentiment_analysis.positive_count}
              </div>
              <div className="text-sm text-muted-foreground">Sentimentos Positivos</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-orange-600">
                {analysisData.engagement_metrics.avg_response_time} min
              </div>
              <div className="text-sm text-muted-foreground">Tempo Médio</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Análise realizada em: {new Date(data.timestamp).toLocaleString('pt-BR')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
