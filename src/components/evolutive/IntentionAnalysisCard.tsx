
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
  CheckCircle,
  Info,
  Shield
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

  // Determinar nível de precisão dos agendamentos
  const getAccuracyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getAccuracyIcon = (level: string) => {
    switch (level) {
      case 'high': return <Shield className="h-4 w-4 text-green-600" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getAccuracyText = (level: string) => {
    switch (level) {
      case 'high': return 'Dados Reais Verificados';
      case 'medium': return 'Estimativa Confiável';
      default: return 'Dados Estimados';
    }
  };

  return (
    <div className="space-y-4">
      {/* Data Consistency Alert */}
      {data_consistency && (
        <Card className={`border-l-4 ${isDataConsistent ? 'border-l-green-500' : 'border-l-blue-500'}`}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              {isDataConsistent ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Info className="h-4 w-4 text-blue-600" />
              )}
              <span className="font-medium">
                {isDataConsistent ? 'Dados Consistentes' : 'Análise Otimizada'}
              </span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Leads únicos (básico): {data_consistency.unique_leads_basic}</p>
              <p>Leads únicos (métricas): {data_consistency.unique_leads_metrics}</p>
              <p>Base utilizada: {data_consistency.base_used}</p>
              {!isDataConsistent && (
                <p className="text-blue-600 font-medium mt-1">
                  Sistema otimizado - usando maior base para cálculos precisos
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appointment Accuracy Indicator */}
      {appointments?.accuracy_level && (
        <Card className={`border-l-4 border-l-purple-500 ${getAccuracyColor(appointments.accuracy_level)}`}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              {getAccuracyIcon(appointments.accuracy_level)}
              <span className="font-bold text-lg">
                MÉTRICA PRINCIPAL - {getAccuracyText(appointments.accuracy_level)}
              </span>
            </div>
            <div className="mt-2 text-sm">
              <p className="font-medium">Fonte dos dados: {appointments.data_source === 'metrics_table' ? 'Tabela de Métricas' : 'Estimativa'}</p>
              {appointments.verification_details && (
                <div className="mt-1 text-xs">
                  <p>Registros de métricas: {appointments.verification_details.total_metrics_records}</p>
                  <p>Agendamentos detectados: {appointments.verification_details.appointments_from_metrics}</p>
                </div>
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
                <p className="text-xs text-blue-600">{total_processed_metrics} registros de métricas</p>
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

        {/* AGENDAMENTOS - MÉTRICA PRINCIPAL */}
        <Card className="ring-2 ring-purple-500 ring-opacity-50 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-purple-700">{appointments?.count || 0}</p>
                <p className="text-xs font-bold text-purple-600">AGENDAMENTOS (PRINCIPAL)</p>
                <div className="flex items-center gap-1">
                  <Badge variant="default" className="bg-purple-600">{appointments?.rate || 0}%</Badge>
                  {appointments?.accuracy_level === 'high' && (
                    <Shield className="h-3 w-3 text-green-600" />
                  )}
                </div>
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
              <strong>Metodologia:</strong> {data_consistency?.base_used > 1 ? 'Análise baseada em dados reais consistentes' : 'Análise com estimativas otimizadas'}
            </p>
            <p className="text-purple-700 font-bold text-base">
              <strong>AGENDAMENTOS (MÉTRICA PRINCIPAL):</strong> {appointments?.rate}% - {getAccuracyText(appointments?.accuracy_level || 'low')}
            </p>
            <p>
              <strong>Taxa de Conversão:</strong> {conversions?.rate}% dos leads foram convertidos
            </p>
            <p>
              <strong>Qualidade do Atendimento:</strong> {engagement_metrics?.conversation_quality}% de aderência
            </p>
            {data_consistency?.tolerance_applied && (
              <p className="text-blue-600">
                <strong>Tolerância aplicada:</strong> ±{data_consistency.tolerance_applied} leads para otimização
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
