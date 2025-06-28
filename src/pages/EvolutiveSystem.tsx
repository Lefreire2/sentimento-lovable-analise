
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Target, 
  BarChart3, 
  RefreshCw,
  Zap,
  TrendingUp,
  Users,
  Settings
} from 'lucide-react';

import { SystemMetricsDashboard } from '@/components/evolutive/SystemMetricsDashboard';
import { IntentionAnalysisPanel } from '@/components/evolutive/IntentionAnalysisPanel';
import { AppointmentOptimizer } from '@/components/evolutive/AppointmentOptimizer';
import { useEvolutiveSystem } from '@/hooks/useEvolutiveSystem';

const EvolutiveSystem = () => {
  const { systemStatus, useClosedLoopData } = useEvolutiveSystem();
  const { data: closedLoopData, refetch } = useClosedLoopData();
  const [selectedPeriod, setSelectedPeriod] = useState('last30days');
  const [selectedLeadId, setSelectedLeadId] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'optimizing': return 'bg-blue-500';
      case 'initializing': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Sistema Ativo';
      case 'optimizing': return 'Otimizando';
      case 'initializing': return 'Inicializando';
      case 'error': return 'Erro';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sistema Evolutivo</h1>
            <p className="text-muted-foreground">
              Análise de Intenção e Otimização de Agendamentos
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className={`${getStatusColor(systemStatus)} text-white`}>
              {getStatusText(systemStatus)}
            </Badge>
            
            <Button onClick={() => refetch()} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Análises IA</p>
                <p className="text-xl font-bold">Ativo</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Otimização</p>
                <p className="text-xl font-bold">Funcionando</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Closed-Loop</p>
                <p className="text-xl font-bold">Ativo</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Predição</p>
                <p className="text-xl font-bold">ML Ativo</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="metrics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Métricas
            </TabsTrigger>
            <TabsTrigger value="intention" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Análise Intenção
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Otimização
            </TabsTrigger>
            <TabsTrigger value="closed-loop" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Closed-Loop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-6">
            <SystemMetricsDashboard period={selectedPeriod} />
          </TabsContent>

          <TabsContent value="intention" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selecionar Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="ID do Lead ou Conversa"
                      value={selectedLeadId}
                      onChange={(e) => setSelectedLeadId(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <p className="text-sm text-muted-foreground">
                      Insira o ID de um lead para análise de intenção personalizada
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {selectedLeadId && (
                <IntentionAnalysisPanel leadId={selectedLeadId} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Otimizar Agendamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="ID do Lead"
                      value={selectedLeadId}
                      onChange={(e) => setSelectedLeadId(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <p className="text-sm text-muted-foreground">
                      Gere estratégias personalizadas de agendamento
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {selectedLeadId && (
                <AppointmentOptimizer leadId={selectedLeadId} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="closed-loop" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Sistema Closed-Loop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Marketing Input</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Campanhas gerando leads qualificados
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Análise & Conversão</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          IA otimizando agendamentos
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Feedback Loop</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Insights retornando ao marketing
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center py-8">
                    <RefreshCw className="h-16 w-16 mx-auto text-muted-foreground mb-4 animate-spin" />
                    <h3 className="text-lg font-semibold mb-2">
                      Sistema de Feedback Contínuo Ativo
                    </h3>
                    <p className="text-muted-foreground">
                      Dados de conversão alimentando otimizações de marketing em tempo real
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EvolutiveSystem;
