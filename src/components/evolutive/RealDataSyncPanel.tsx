
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Users,
  MessageSquare,
  BarChart3,
  Zap
} from 'lucide-react';
import { useRealDataSync } from '@/hooks/useRealDataSync';

export const RealDataSyncPanel = () => {
  const { 
    isSync, 
    syncProgress, 
    agentSummaries, 
    syncAllAgentsData,
    getDataQualityColor,
    getDataQualityLabel
  } = useRealDataSync();

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'preparing': return 'Preparando sincronização...';
      case 'fetching': return 'Buscando dados...';
      case 'processing': return 'Processando dados...';
      case 'validating': return 'Validando qualidade...';
      case 'complete': return 'Sincronização completa!';
      default: return 'Processando...';
    }
  };

  const totalValidAgents = agentSummaries.filter(s => s.hasValidData).length;
  const excellentQuality = agentSummaries.filter(s => s.dataQuality === 'excellent').length;
  const totalLeads = agentSummaries.reduce((sum, s) => sum + s.uniqueLeads, 0);
  const totalMessages = agentSummaries.reduce((sum, s) => sum + s.basicMessages, 0);

  return (
    <div className="space-y-6">
      {/* Header de Sincronização */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Sincronização de Dados Reais
            </div>
            <Button 
              onClick={syncAllAgentsData}
              disabled={isSync}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isSync ? 'animate-spin' : ''}`} />
              {isSync ? 'Sincronizando...' : 'Sincronizar Tudo'}
            </Button>
          </CardTitle>
        </CardHeader>
        
        {isSync && syncProgress && (
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>{getStageLabel(syncProgress.stage)}</span>
                <span>{syncProgress.currentAgentIndex}/{syncProgress.totalAgents}</span>
              </div>
              
              <Progress 
                value={(syncProgress.currentAgentIndex / syncProgress.totalAgents) * 100} 
                className="w-full" 
              />
              
              {syncProgress.currentAgent && (
                <div className="text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 inline mr-1" />
                  Processando: {syncProgress.currentAgent}
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Resumo Geral */}
      {agentSummaries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{totalValidAgents}</p>
                  <p className="text-xs text-muted-foreground">Agentes com Dados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{excellentQuality}</p>
                  <p className="text-xs text-muted-foreground">Com Métricas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{totalLeads.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Leads Únicos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{totalMessages.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Mensagens</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lista Detalhada de Agentes */}
      {agentSummaries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Status Detalhado por Agente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {agentSummaries
                .sort((a, b) => {
                  // Primeiro por qualidade, depois por número de leads
                  const qualityOrder = { excellent: 4, good: 3, poor: 2, missing: 1 };
                  const qualityDiff = qualityOrder[b.dataQuality] - qualityOrder[a.dataQuality];
                  if (qualityDiff !== 0) return qualityDiff;
                  return b.uniqueLeads - a.uniqueLeads;
                })
                .map((agent) => (
                  <div 
                    key={agent.agentName} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {agent.hasValidData ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">{agent.agentName}</span>
                      </div>
                      
                      <Badge className={getDataQualityColor(agent.dataQuality)}>
                        {getDataQualityLabel(agent.dataQuality)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{agent.uniqueLeads}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{agent.basicMessages.toLocaleString()}</span>
                      </div>
                      
                      {agent.metricsRecords > 0 && (
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-3 w-3" />
                          <span>{agent.metricsRecords}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alertas e Erros */}
      {syncProgress && syncProgress.stage === 'complete' && (
        <>
          {syncProgress.errors.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  Erros Encontrados ({syncProgress.errors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {syncProgress.errors.map((error, index) => (
                    <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                      {error}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {syncProgress.warnings.length > 0 && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700">
                  <AlertTriangle className="h-5 w-5" />
                  Avisos ({syncProgress.warnings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {syncProgress.warnings.map((warning, index) => (
                    <div key={index} className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                      {warning}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
