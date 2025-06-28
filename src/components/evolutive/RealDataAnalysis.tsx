
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Clock,
  Target,
  Brain
} from 'lucide-react';
import { useEvolutiveSystem } from '@/hooks/useEvolutiveSystem';
import { IntentionAnalysisCard } from './IntentionAnalysisCard';

interface RealDataAnalysisProps {
  agentName: string;
}

export const RealDataAnalysis = ({ agentName }: RealDataAnalysisProps) => {
  const { useRealDataAnalysis } = useEvolutiveSystem();
  const [analysisType, setAnalysisType] = useState('all');
  
  const { data: analysisData, isLoading, refetch } = useRealDataAnalysis(agentName, analysisType);

  const analysisTypes = [
    { key: 'all', label: 'Análise Completa', icon: Database },
    { key: 'intention', label: 'Análise de Intenção', icon: Brain },
    { key: 'funnel', label: 'Funil de Conversão', icon: BarChart3 },
    { key: 'performance', label: 'Performance', icon: TrendingUp },
    { key: 'sentiment', label: 'Sentimentos', icon: MessageSquare },
    { key: 'system_metrics', label: 'Métricas Sistema', icon: Target }
  ];

  const handleAnalysisTypeChange = (type: string) => {
    setAnalysisType(type);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 animate-pulse" />
            Analisando Dados Reais...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={75} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Processando dados do banco para {agentName}...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Seletor de Tipo de Análise */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Análise de Dados Reais - {agentName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {analysisTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.key}
                  variant={analysisType === type.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAnalysisTypeChange(type.key)}
                  className="justify-start"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {type.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resultados da Análise */}
      {analysisData && (
        <div className="space-y-4">
          {analysisData.complete_analysis ? (
            <CompleteAnalysisDisplay data={analysisData.complete_analysis} />
          ) : analysisType === 'intention' && analysisData ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Análise de Intenção - {agentName}</h3>
              <IntentionAnalysisCard data={analysisData} />
            </div>
          ) : (
            <SingleAnalysisDisplay data={analysisData} type={analysisType} />
          )}
        </div>
      )}

      {/* Botão para Atualizar */}
      <Card>
        <CardContent className="pt-6">
          <Button onClick={() => refetch()} className="w-full">
            <Database className="h-4 w-4 mr-2" />
            Atualizar Análise
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const CompleteAnalysisDisplay = ({ data }: { data: any }) => {
  return (
    <div className="space-y-6">
      {/* Análise de Intenção */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Análise de Intenção</h3>
        <IntentionAnalysisCard data={data.intention} />
      </div>

      {/* Outras análises em formato de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Funil de Conversão */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Funil de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Leads:</span>
              <Badge variant="outline">{data.funnel.funnel_data.leads}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Qualificados:</span>
              <Badge variant="secondary">{data.funnel.funnel_data.qualified}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Agendamentos:</span>
              <Badge variant="default">{data.funnel.funnel_data.appointments}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Conversões:</span>
              <Badge className="bg-green-500">{data.funnel.funnel_data.conversions}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Tempo Médio Resposta:</span>
              <Badge variant="outline">{data.performance.performance_metrics.avg_response_time} min</Badge>
            </div>
            <div className="flex justify-between">
              <span>Taxa Conversão:</span>
              <Badge variant="default">{data.performance.performance_metrics.conversion_rate}%</Badge>
            </div>
            <div className="flex justify-between">
              <span>Score Aderência:</span>
              <Badge variant="secondary">{data.performance.performance_metrics.adherence_score}%</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Sentimentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Análise de Sentimentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Sentimento Geral:</span>
              <Badge variant="outline">{data.sentiment.sentiment_analysis.overall}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Usuário:</span>
              <Badge variant="secondary">{data.sentiment.sentiment_analysis.user}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Atendente:</span>
              <Badge variant="default">{data.sentiment.sentiment_analysis.agent}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Palavras de Risco:</span>
              <Badge variant="destructive">{data.sentiment.sentiment_analysis.risk_words}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Métricas do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Métricas do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Total de Leads:</span>
              <Badge variant="outline">{data.system_metrics.system_metrics.leads_totais}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Taxa Qualificação:</span>
              <Badge variant="default">{data.system_metrics.system_metrics.taxa_qualificacao}%</Badge>
            </div>
            <div className="flex justify-between">
              <span>Taxa Agendamento:</span>
              <Badge variant="secondary">{data.system_metrics.system_metrics.taxa_conversao_agendamento}%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SingleAnalysisDisplay = ({ data, type }: { data: any; type: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultado da Análise - {type}</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
};
