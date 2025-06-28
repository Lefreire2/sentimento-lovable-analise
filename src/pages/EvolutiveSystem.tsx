
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { RealDataAnalysis } from '@/components/evolutive/RealDataAnalysis';
import { IntentionAnalysisPanel } from '@/components/evolutive/IntentionAnalysisPanel';
import { AppointmentOptimizer } from '@/components/evolutive/AppointmentOptimizer';
import { SystemMetricsDashboard } from '@/components/evolutive/SystemMetricsDashboard';
import { useEvolutiveSystem } from '@/hooks/useEvolutiveSystem';
import { formatAgentName, agentTables } from '@/lib/agents';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Database,
  Activity,
  Calendar,
  BarChart3,
  Users
} from 'lucide-react';

const EvolutiveSystem = () => {
  const { systemStatus } = useEvolutiveSystem();
  const [selectedAgent, setSelectedAgent] = useState('André Araújo');

  // Obter todos os agentes disponíveis do banco de dados
  const availableAgents = agentTables.map(table => formatAgentName(table)).sort();

  console.log('📋 Total de agentes disponíveis:', availableAgents.length);
  console.log('🎯 Agentes carregados:', availableAgents);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'optimizing': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'optimizing': return 'Otimizando';
      case 'error': return 'Erro';
      case 'initializing': return 'Inicializando';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Sistema Evolutivo de IA
              </h1>
              <p className="text-gray-600 text-lg">
                Análise inteligente e otimização contínua de conversões
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus)}`}></div>
              <Badge variant="outline">
                {getStatusText(systemStatus)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Agent Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Seleção de Agente ({availableAgents.length} disponíveis)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-96 overflow-y-auto">
              {availableAgents.map((agent) => (
                <button
                  key={agent}
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-3 rounded-lg border text-sm transition-all ${
                    selectedAgent === agent
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                  title={agent}
                >
                  <div className="truncate">
                    {agent}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Agente Selecionado */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Agente Selecionado:
                </span>
                <span className="text-sm text-blue-700 font-semibold">
                  {selectedAgent}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="real-data" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="real-data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Dados Reais
            </TabsTrigger>
            <TabsTrigger value="intention" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Análise de Intenção
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Otimização
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Métricas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="real-data" className="space-y-6">
            <RealDataAnalysis agentName={selectedAgent} />
          </TabsContent>

          <TabsContent value="intention" className="space-y-6">
            <IntentionAnalysisPanel />
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <AppointmentOptimizer />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <SystemMetricsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EvolutiveSystem;
