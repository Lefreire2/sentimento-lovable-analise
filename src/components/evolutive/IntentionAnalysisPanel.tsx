
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, MessageSquare, RefreshCw } from 'lucide-react';
import { useEvolutiveSystem, AnalysisSettings } from '@/hooks/useEvolutiveSystem';
import { IntentionAnalysisCard } from './IntentionAnalysisCard';
import { DataLoadingDebugger } from './DataLoadingDebugger';

interface IntentionAnalysisPanelProps {
  analysisSettings?: AnalysisSettings;
  selectedAgent?: string;
}

export const IntentionAnalysisPanel = ({ analysisSettings, selectedAgent = 'Haila' }: IntentionAnalysisPanelProps) => {
  const { useRealDataAnalysis } = useEvolutiveSystem();
  const [refreshKey, setRefreshKey] = useState(0);
  
  console.log('🎯 INTENTION-PANEL - Iniciando com agente:', selectedAgent);
  console.log('📅 INTENTION-PANEL - Configurações:', analysisSettings);
  
  const { data: analysisData, isLoading, error, refetch } = useRealDataAnalysis(
    selectedAgent, 
    'intention', 
    analysisSettings
  );

  console.log('📊 INTENTION-PANEL - Dados recebidos completos:', analysisData);
  console.log('⚡ INTENTION-PANEL - Status loading:', isLoading);
  console.log('❌ INTENTION-PANEL - Erro:', error);

  // Extrair dados de intenção da estrutura correta
  const intentionData = analysisData?.intention_analysis || 
                       analysisData?.complete_analysis?.intention?.intention_analysis || 
                       analysisData;

  console.log('🧠 INTENTION-PANEL - Dados de intenção extraídos:', intentionData);

  const handleRefresh = async () => {
    console.log('🔄 INTENTION-PANEL - Iniciando refresh manual');
    try {
      await refetch();
      setRefreshKey(prev => prev + 1);
      console.log('✅ INTENTION-PANEL - Refresh concluído');
    } catch (err) {
      console.error('❌ INTENTION-PANEL - Erro no refresh:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Debug Component */}
      <DataLoadingDebugger 
        agentName={selectedAgent}
        analysisType="intention"
      />

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
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleRefresh}
                disabled={isLoading}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Carregando...' : 'Atualizar Análise'}
              </Button>
              
              {isLoading && (
                <Badge variant="secondary">
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Processando...
                </Badge>
              )}
              
              {error && (
                <Badge variant="destructive">
                  Erro no carregamento
                </Badge>
              )}
            </div>

            {/* Status Debug */}
            <div className="mt-4 p-3 bg-gray-50 rounded text-xs font-mono">
              <div>Agente: {selectedAgent}</div>
              <div>Dados Brutos: {analysisData ? 'Disponíveis' : 'Não disponíveis'}</div>
              <div>Dados de Intenção: {intentionData ? 'Disponíveis' : 'Não disponíveis'}</div>
              <div>Loading: {isLoading ? 'Sim' : 'Não'}</div>
              <div>Erro: {error ? error.message : 'Nenhum'}</div>
              <div>Refresh Key: {refreshKey}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mostrar dados ou mensagem de erro */}
      {intentionData ? (
        <IntentionAnalysisCard key={refreshKey} data={intentionData} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Status da Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Carregando análise de intenção...</span>
              </div>
            ) : error ? (
              <div className="text-red-600">
                <p className="font-medium">Erro ao carregar dados:</p>
                <p className="text-sm">{error.message}</p>
                <Button onClick={handleRefresh} className="mt-2" size="sm">
                  Tentar Novamente
                </Button>
              </div>
            ) : (
              <div className="text-yellow-600">
                <p className="font-medium">Dados não disponíveis</p>
                <p className="text-sm">Clique em "Atualizar Análise" para carregar os dados</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
