
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Target, 
  AlertCircle,
  CheckCircle,
  Zap
} from 'lucide-react';
import { useEvolutiveSystem } from '@/hooks/useEvolutiveSystem';
import { IntentionAnalysis } from '@/types/evolutiveSystem';

interface IntentionAnalysisPanelProps {
  leadId: string;
  conversationData?: any;
}

export const IntentionAnalysisPanel = ({ leadId, conversationData }: IntentionAnalysisPanelProps) => {
  const { useIntentionAnalysis } = useEvolutiveSystem();
  const { data: analysis, isLoading, refetch } = useIntentionAnalysis(leadId);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeIntention = async () => {
    setIsAnalyzing(true);
    try {
      await refetch();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getIntentionColor = (nivel: string) => {
    switch (nivel) {
      case 'Alta': return 'bg-green-500';
      case 'Média': return 'bg-yellow-500';
      case 'Baixa': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getIntentionIcon = (nivel: string) => {
    switch (nivel) {
      case 'Alta': return <CheckCircle className="h-4 w-4" />;
      case 'Média': return <AlertCircle className="h-4 w-4" />;
      case 'Baixa': return <Target className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 animate-pulse" />
            Analisando Intenção...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={75} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Processando dados conversacionais e comportamentais...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Análise de Intenção
        </CardTitle>
        <Button 
          onClick={handleAnalyzeIntention}
          disabled={isAnalyzing}
          size="sm"
        >
          {isAnalyzing ? (
            <><Zap className="h-4 w-4 animate-spin mr-2" /> Analisando</>
          ) : (
            <><Zap className="h-4 w-4 mr-2" /> Analisar</>
          )}
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {analysis ? (
          <>
            {/* Score e Nível de Intenção */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nível de Intenção</label>
                <Badge 
                  className={`${getIntentionColor(analysis.nivel_intencao)} text-white flex items-center gap-1`}
                >
                  {getIntentionIcon(analysis.nivel_intencao)}
                  {analysis.nivel_intencao}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Score de Intenção</label>
                <div className="flex items-center gap-2">
                  <Progress value={analysis.score_intencao} className="flex-1" />
                  <span className="text-sm font-bold">{analysis.score_intencao}%</span>
                </div>
              </div>
            </div>

            {/* Probabilidade de Conversão */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Probabilidade de Conversão
              </label>
              <div className="flex items-center gap-2">
                <Progress value={analysis.probabilidade_conversao} className="flex-1" />
                <span className="text-sm font-bold">{analysis.probabilidade_conversao}%</span>
              </div>
            </div>

            {/* Momento Ideal de Contato */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Momento Ideal de Contato
              </label>
              <p className="text-sm bg-muted p-2 rounded">
                {analysis.momento_ideal_contato}
              </p>
            </div>

            {/* Abordagem Recomendada */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Abordagem Recomendada</label>
              <p className="text-sm bg-blue-50 dark:bg-blue-950/20 p-2 rounded border-l-2 border-blue-500">
                {analysis.tipo_abordagem_recomendada}
              </p>
            </div>

            {/* Fatores Positivos e Negativos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-700 dark:text-green-300">
                  Fatores Positivos
                </label>
                <div className="space-y-1">
                  {analysis.fatores_positivos.map((fator, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs bg-green-50 dark:bg-green-950/20 p-2 rounded">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {fator}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-red-700 dark:text-red-300">
                  Fatores Negativos
                </label>
                <div className="space-y-1">
                  {analysis.fatores_negativos.map((fator, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs bg-red-50 dark:bg-red-950/20 p-2 rounded">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      {fator}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timestamp da Análise */}
            <div className="text-xs text-muted-foreground border-t pt-2">
              Última análise: {new Date(analysis.data_analise).toLocaleString('pt-BR')}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Nenhuma análise de intenção disponível para este lead
            </p>
            <Button onClick={handleAnalyzeIntention} disabled={isAnalyzing}>
              {isAnalyzing ? 'Analisando...' : 'Iniciar Análise'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
