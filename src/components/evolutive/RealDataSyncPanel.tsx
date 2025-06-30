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
  Zap,
  Eye,
  Table,
  AlertCircle,
  Inbox
} from 'lucide-react';
import { useRealDataSync } from '@/hooks/useRealDataSync';

export const RealDataSyncPanel = () => {
  const { 
    isSync, 
    syncProgress, 
    agentSummaries, 
    syncAllAgentsData,
    getDataQualityColor,
    getDataQualityLabel,
    totalAgents
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
  const goodQuality = agentSummaries.filter(s => s.dataQuality === 'good').length;
  const tablesExistButEmpty = agentSummaries.filter(s => 
    (s.tableStatus.basicExists && s.tableStatus.basicEmpty) || 
    (s.tableStatus.metricsExists && s.tableStatus.metricsEmpty)
  ).length;
  const tablesNotFound = agentSummaries.filter(s => 
    !s.tableStatus.basicExists && !s.tableStatus.metricsExists
  ).length;
  const totalLeads = agentSummaries.reduce((sum, s) => sum + s.uniqueLeads, 0);
  const totalMessages = agentSummaries.reduce((sum, s) => sum + s.basicMessages, 0);
  const totalMetrics = agentSummaries.reduce((sum, s) => sum + s.metricsRecords, 0);

  return (
    <div className="space-y-6">
      {/* Header de Sincronização */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Sincronização de Dados Reais
              <Badge variant="outline" className="ml-2">
                {totalAgents} agentes
              </Badge>
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
                  Validando: {syncProgress.currentAgent}
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Resumo Geral com foco em diagnóstico de dados */}
      {agentSummaries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{totalValidAgents}</p>
                  <p className="text-xs text-muted-foreground">Com Dados Válidos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Inbox className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-700">{tablesExistButEmpty}</p>
                  <p className="text-xs text-yellow-600">Tabelas Vazias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-700">{tablesNotFound}</p>
                  <p className="text-xs text-red-600">Tabelas Não Encontradas</p>
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
        </div>
      )}

      {/* Diagnóstico detalhado sobre dados ausentes */}
      {tablesExistButEmpty > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="h-5 w-5" />
              Diagnóstico: Tabelas Vazias Detectadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-orange-800 space-y-3">
              <p className="font-medium">
                {tablesExistButEmpty} agentes têm tabelas criadas no Supabase mas sem dados importados.
              </p>
              <div className="bg-orange-100 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Status do Sistema:</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>✅ Conexão com Supabase funcionando</li>
                  <li>✅ Tabelas criadas corretamente no banco</li>
                  <li>✅ Permissões de acesso configuradas</li>
                  <li>❌ Dados não foram importados para essas tabelas</li>
                </ul>
              </div>
              <div className="bg-white border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Próximos Passos:</h4>
                <ul className="text-sm space-y-1 list-decimal list-inside">
                  <li>Verificar o processo de importação de dados</li>
                  <li>Confirmar se os arquivos CSV foram processados</li>
                  <li>Executar novamente a importação para os agentes afetados</li>
                  <li>Fazer nova sincronização após importação</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista Detalhada de Agentes com diagnóstico aprimorado */}
      {agentSummaries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table className="h-5 w-5" />
              Status Detalhado por Agente ({agentSummaries.length})
            </CardTitle>
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
                .map((agent) => {
                  const hasEmptyTables = (agent.tableStatus.basicExists && agent.tableStatus.basicEmpty) || 
                                       (agent.tableStatus.metricsExists && agent.tableStatus.metricsEmpty);
                  const hasNotFoundTables = !agent.tableStatus.basicExists && !agent.tableStatus.metricsExists;
                  
                  return (
                    <div 
                      key={agent.agentName} 
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        hasEmptyTables ? 'bg-yellow-50 border-yellow-200' : 
                        hasNotFoundTables ? 'bg-red-50 border-red-200' :
                        'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {agent.hasValidData ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : hasNotFoundTables ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className="font-medium">{agent.agentName}</span>
                        </div>
                        
                        <Badge className={`${getDataQualityColor(agent.dataQuality)} border`}>
                          {getDataQualityLabel(agent.dataQuality)}
                        </Badge>

                        {/* Indicadores específicos de diagnóstico */}
                        {hasEmptyTables && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                            <Inbox className="h-3 w-3 mr-1" />
                            Dados Não Importados
                          </Badge>
                        )}
                        
                        {hasNotFoundTables && (
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
                            <XCircle className="h-3 w-3 mr-1" />
                            Tabelas Não Encontradas
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Estatísticas */}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1" title="Leads únicos">
                            <Users className="h-3 w-3" />
                            <span className="font-medium">{agent.uniqueLeads}</span>
                          </div>
                          
                          <div className="flex items-center gap-1" title="Mensagens básicas">
                            <MessageSquare className="h-3 w-3" />
                            <span className="font-medium">{agent.basicMessages.toLocaleString()}</span>
                          </div>
                          
                          {agent.metricsRecords > 0 && (
                            <div className="flex items-center gap-1" title="Registros de métricas">
                              <BarChart3 className="h-3 w-3" />
                              <span className="font-medium">{agent.metricsRecords}</span>
                            </div>
                          )}
                        </div>

                        {/* Status das Tabelas com diagnóstico detalhado */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs">
                            <div className={`w-2 h-2 rounded-full ${
                              !agent.tableStatus.basicExists ? 'bg-red-500' :
                              agent.tableStatus.basicEmpty ? 'bg-yellow-500' : 'bg-green-500'
                            }`} 
                                 title={`Tabela básica: ${agent.tableStatus.basicTable} - ${
                                   !agent.tableStatus.basicExists ? 'Não encontrada' :
                                   agent.tableStatus.basicEmpty ? 'Vazia (sem dados)' : 'Com dados'
                                 }${agent.tableStatus.basicError ? ` (Erro: ${agent.tableStatus.basicError})` : ''}`}></div>
                            <span className="text-gray-500">B</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <div className={`w-2 h-2 rounded-full ${
                              !agent.tableStatus.metricsExists ? 'bg-red-500' :
                              agent.tableStatus.metricsEmpty ? 'bg-yellow-500' : 'bg-green-500'
                            }`} 
                                 title={`Tabela métricas: ${agent.tableStatus.metricsTable} - ${
                                   !agent.tableStatus.metricsExists ? 'Não encontrada' :
                                   agent.tableStatus.metricsEmpty ? 'Vazia (sem dados)' : 'Com dados'
                                 }${agent.tableStatus.metricsError ? ` (Erro: ${agent.tableStatus.metricsError})` : ''}`}></div>
                            <span className="text-gray-500">M</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            
            {/* Legenda Atualizada com diagnóstico */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-6 text-xs text-blue-700 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Verde = Com dados</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>Amarelo = Tabela vazia (dados não importados)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Vermelho = Tabela não encontrada</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>B = Básica | M = Métricas</span>
                </div>
              </div>
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
                  Erros Críticos ({syncProgress.errors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {syncProgress.errors.map((error, index) => (
                    <div key={index} className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
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
                  Avisos de Atenção ({syncProgress.warnings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {syncProgress.warnings.map((warning, index) => (
                    <div key={index} className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded border border-yellow-200">
                      {warning}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Estatísticas Detalhadas */}
      {agentSummaries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Estatísticas Completas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">{excellentQuality}</div>
                <div className="text-green-700">Excelente</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">{goodQuality}</div>
                <div className="text-blue-700">Boa</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded">
                <div className="text-2xl font-bold text-yellow-600">
                  {agentSummaries.filter(s => s.dataQuality === 'poor').length}
                </div>
                <div className="text-yellow-700">Limitada</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded">
                <div className="text-2xl font-bold text-red-600">
                  {agentSummaries.filter(s => s.dataQuality === 'missing').length}
                </div>
                <div className="text-red-700">Sem Dados</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-xl font-bold">{totalMetrics.toLocaleString()}</div>
                <div className="text-gray-600">Total Métricas</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-xl font-bold">{Math.round((totalValidAgents / totalAgents) * 100)}%</div>
                <div className="text-gray-600">Taxa de Sucesso</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-xl font-bold">{Math.round(totalLeads / Math.max(totalValidAgents, 1))}</div>
                <div className="text-gray-600">Leads por Agente</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
