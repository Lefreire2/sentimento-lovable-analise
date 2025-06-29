import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, MessageSquare } from 'lucide-react';
import { useEvolutiveSystem, AnalysisSettings } from '@/hooks/useEvolutiveSystem';
import { IntentionAnalysisCard } from './IntentionAnalysisCard';

interface IntentionAnalysisPanelProps {
  analysisSettings?: AnalysisSettings;
}

export const IntentionAnalysisPanel = ({ analysisSettings }: IntentionAnalysisPanelProps) => {
  const { useRealDataAnalysis } = useEvolutiveSystem();
  const [selectedAgent, setSelectedAgent] = useState('Haila');
  
  const { data: intentionData, isLoading, refetch } = useRealDataAnalysis(
    selectedAgent, 
    'intention', 
    analysisSettings
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Análise de Intenção - {selectedAgent}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Visualize a análise de intenção para o agente selecionado.
            </p>
            <Button onClick={() => refetch()}>
              Atualizar Análise
            </Button>
            {isLoading && (
              <Badge variant="secondary">Carregando...</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {intentionData && (
        <IntentionAnalysisCard data={intentionData} />
      )}
    </div>
  );
};
