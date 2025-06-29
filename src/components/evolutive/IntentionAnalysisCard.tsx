
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface IntentionAnalysisCardProps {
  data: any;
}

export const IntentionAnalysisCard = ({ data }: IntentionAnalysisCardProps) => {
  if (!data || !data.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Análise de Intenção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Dados não disponíveis</p>
        </CardContent>
      </Card>
    );
  }

  const {
    total_conversations,
    total_processed_metrics,
    data_consistency,
    conversions,
    sentiment_analysis,
    appointments,
    engagement_metrics
  } = data.data;

  const isDataConsistent = data_consistency?.is_consistent;

  return (
    <div className="space-y-4">
      {/* Data Consistency Alert */}
      {data_consistency && (
        <Card className={`border-l-4 ${isDataConsistent ? 'border-l-green-500' : 'border-l-yellow-500'}`}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              {isDataConsistent ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
              <span className="font-medium">
                {isDataConsistent ? 'Dados Consistentes' : 'Inconsistência Detectada'}
              </span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Leads únicos: {data_consistency.unique_leads}</p>
              <p>Métricas processadas: {data_consistency.processed_metrics}</p>
              {!isDataConsistent && (
                <p className="text-yellow-600 font-medium">
                  Diferença: {data_consistency.difference} registros
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{total_conversations}</p>
                <p className="text-xs text-muted-foreground">Total de Conversas</p>
                <p className="text-xs text-blue-600">{total_processed_metrics} métricas processadas</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{conversions?.count || 0}</p>
                <p className="text-xs text-muted-foreground">Conversões</p>
                <Badge variant="secondary">{conversions?.rate || 0}%</Badge>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{appointments?.count || 0}</p>
                <p className="text-xs text-muted-foreground">Agendamentos</p>
                <Badge variant="secondary">{appointments?.rate || 0}%</Badge>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{sentiment_analysis?.positive_count || 0}</p>
                <p className="text-xs text-muted-foreground">Sentimentos Positivos</p>
                <Badge variant="secondary">{sentiment_analysis?.positive_rate || 0}%</Badge>
              </div>
              <MessageSquare className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Métricas de Engajamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Tempo Médio de Resposta</p>
              <p className="text-2xl font-bold">{engagement_metrics?.avg_response_time || 0} min</p>
            </div>
            <div>
              <p className="text-sm font-medium">Qualidade da Conversa</p>
              <div className="flex items-center gap-2">
                <Progress 
                  value={parseFloat(engagement_metrics?.conversation_quality || '0')} 
                  className="flex-1" 
                />
                <span className="text-sm">{engagement_metrics?.conversation_quality || 0}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Análise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Fonte dos Dados:</strong> {data_consistency?.processed_metrics > 0 ? 'Tabela de métricas processadas' : 'Estimativa baseada em leads únicos'}
            </p>
            <p>
              <strong>Taxa de Conversão:</strong> {conversions?.rate}% dos leads foram convertidos
            </p>
            <p>
              <strong>Taxa de Agendamento:</strong> {appointments?.rate}% dos leads foram agendados
            </p>
            <p>
              <strong>Qualidade do Atendimento:</strong> {engagement_metrics?.conversation_quality}% de aderência
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
