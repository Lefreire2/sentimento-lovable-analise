import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  Clock,
  RefreshCw
} from 'lucide-react';
import { DataValidationAlert } from './DataValidationAlert';
import { validateAnalysisData, validateAndreAraujoAnalysis, correctConversionCalculations } from '@/utils/dataValidator';
import { useState } from 'react';

interface IntentionAnalysisCardProps {
  data: any;
}

export const IntentionAnalysisCard = ({ data }: IntentionAnalysisCardProps) => {
  const [correctedData, setCorrectedData] = useState(data?.data);
  const [isRecalculating, setIsRecalculating] = useState(false);

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

  // Usar dados corrigidos se disponíveis, senão usar dados originais
  const analysisData = correctedData || data.data;
  
  // Validar dados com foco específico no André Araújo se for o caso
  const isAndreAraujo = analysisData.agent_name?.toLowerCase().includes('andré') || 
                       analysisData.agent_name?.toLowerCase().includes('andre');
  
  const validation = isAndreAraujo ? 
    validateAndreAraujoAnalysis(analysisData) : 
    validateAnalysisData(analysisData);

  const handleApplyCorrections = async (corrections: Record<string, any>) => {
    setIsRecalculating(true);
    try {
      const newCorrectedData = correctConversionCalculations(analysisData);
      setCorrectedData(newCorrectedData);
    } catch (error) {
      console.error('Erro ao aplicar correções:', error);
    } finally {
      setIsRecalculating(false);
    }
  };

  const handleRecalculateAnalysis = () => {
    setIsRecalculating(true);
    // Simular recálculo
    setTimeout(() => {
      const recalculatedData = correctConversionCalculations(data.data);
      setCorrectedData(recalculatedData);
      setIsRecalculating(false);
    }, 2000);
  };

  const {
    total_conversations,
    total_processed_metrics,
    data_consistency,
    conversions,
    sentiment_analysis,
    appointments,
    engagement_metrics
  } = analysisData;

  const isDataConsistent = data_consistency?.is_consistent;
  const analysisPeriod = appointments?.analysis_period;

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

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      {/* Data Validation Alert with Enhanced Features */}
      <DataValidationAlert 
        validation={validation} 
        onApplyCorrections={handleApplyCorrections}
      />

      {/* Recalculation Controls for André Araújo */}
      {isAndreAraujo && !validation.isValid && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-800">Revisão Necessária - André Araújo</h3>
                <p className="text-sm text-orange-700">
                  Foram detectadas inconsistências nas etapas de análise que requerem correção.
                </p>
              </div>
              <Button 
                onClick={handleRecalculateAnalysis}
                disabled={isRecalculating}
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                {isRecalculating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Recalculando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Recalcular Análise
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Period Info */}
      {analysisPeriod && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-bold text-lg text-blue-900">
                PERÍODO DE ANÁLISE
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Descrição:</p>
                <p className="text-blue-700">{analysisPeriod.period_description}</p>
              </div>
              {(analysisPeriod.start_date || analysisPeriod.end_date) && (
                <div>
                  <p className="font-medium">Período:</p>
                  <p className="text-blue-700">
                    {analysisPeriod.start_date && formatDate(analysisPeriod.start_date)}
                    {analysisPeriod.start_date && analysisPeriod.end_date && ' até '}
                    {analysisPeriod.end_date && formatDate(analysisPeriod.end_date)}
                  </p>
                </div>
              )}
              {analysisPeriod.real_validation && (
                <div className="col-span-1 md:col-span-2">
                  <p className="font-medium text-green-700">Validação Real:</p>
                  <p className="text-green-600">
                    ✅ {analysisPeriod.real_validation.validated_count} agendamentos confirmados 
                    via {analysisPeriod.real_validation.validation_source}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
              <p className="font-medium">
                Fonte dos dados: {
                  appointments.data_source === 'metrics_table' ? 'Tabela de Métricas' : 
                  appointments.data_source === 'real_validation' ? 'Validação Real' :
                  'Estimativa'
                }
              </p>
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

      {/* Main Metrics - UPDATED WITH CORRECTED DATA */}
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

        <Card className={validation.errors.some(e => e.includes('conversão')) ? 'ring-2 ring-red-500' : ''}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{conversions?.count || 0}</p>
                <p className="text-xs text-muted-foreground">Conversões</p>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary">{conversions?.rate || 0}%</Badge>
                  {validation.errors.some(e => e.includes('conversão')) && (
                    <AlertTriangle className="h-3 w-3 text-red-500" />
                  )}
                </div>
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
                  {analysisPeriod?.real_validation && (
                    <Badge variant="outline" className="text-xs border-green-500 text-green-700">
                      VALIDADO
                    </Badge>
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
            {analysisPeriod?.real_validation && (
              <p className="text-green-700 font-bold">
                <strong>VALIDAÇÃO REAL:</strong> {analysisPeriod.real_validation.validated_count} agendamentos confirmados via {analysisPeriod.real_validation.validation_source}
              </p>
            )}
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

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('pt-BR');
  } catch {
    return dateString;
  }
};
