import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Clock,
  Target,
  Brain,
  AlertTriangle
} from 'lucide-react';
import { useEvolutiveSystem, AnalysisSettings } from '@/hooks/useEvolutiveSystem';
import { IntentionAnalysisCard } from './IntentionAnalysisCard';
import { FunnelAnalysisCard } from './FunnelAnalysisCard';
import { PerformanceAnalysisCard } from './PerformanceAnalysisCard';
import { SentimentAnalysisCard } from './SentimentAnalysisCard';
import { SystemMetricsCard } from './SystemMetricsCard';
import { ObjectionAnalysisCard } from './ObjectionAnalysisCard';

interface RealDataAnalysisProps {
  agentName: string;
  analysisSettings?: AnalysisSettings;
}

export const RealDataAnalysis = ({ agentName, analysisSettings }: RealDataAnalysisProps) => {
  const { useRealDataAnalysis } = useEvolutiveSystem();
  const [analysisType, setAnalysisType] = useState('all');
  
  const { data: analysisData, isLoading, refetch } = useRealDataAnalysis(agentName, analysisType, analysisSettings);

  const analysisTypes = [
    { key: 'all', label: 'Análise Completa', icon: Database },
    { key: 'intention', label: 'Análise de Intenção', icon: Brain },
    { key: 'funnel', label: 'Funil de Conversão', icon: BarChart3 },
    { key: 'performance', label: 'Performance', icon: TrendingUp },
    { key: 'sentiment', label: 'Sentimentos', icon: MessageSquare },
    { key: 'objections', label: 'Análise de Objeções', icon: AlertTriangle },
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
          ) : analysisType === 'funnel' && analysisData ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Funil de Conversão - {agentName}</h3>
              <FunnelAnalysisCard data={analysisData} />
            </div>
          ) : analysisType === 'performance' && analysisData ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Análise de Performance - {agentName}</h3>
              <PerformanceAnalysisCard data={analysisData} />
            </div>
          ) : analysisType === 'sentiment' && analysisData ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Análise de Sentimentos - {agentName}</h3>
              <SentimentAnalysisCard data={analysisData} />
            </div>
          ) : analysisType === 'objections' && analysisData ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Análise de Objeções - {agentName}</h3>
              <ObjectionAnalysisCard data={analysisData} />
            </div>
          ) : analysisType === 'system_metrics' && analysisData ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Métricas do Sistema - {agentName}</h3>
              <SystemMetricsCard data={analysisData} />
            </div>
          ) : null}
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

      {/* Funil de Conversão */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Funil de Conversão</h3>
        <FunnelAnalysisCard data={data.funnel} />
      </div>

      {/* Performance */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Análise de Performance</h3>
        <PerformanceAnalysisCard data={data.performance} />
      </div>

      {/* Sentimentos */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Análise de Sentimentos</h3>
        <SentimentAnalysisCard data={data.sentiment} />
      </div>

      {/* Análise de Objeções */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Análise de Objeções</h3>
        <ObjectionAnalysisCard data={data.objections} />
      </div>

      {/* Métricas do Sistema */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Métricas do Sistema</h3>
        <SystemMetricsCard data={data.system_metrics} />
      </div>
    </div>
  );
};
