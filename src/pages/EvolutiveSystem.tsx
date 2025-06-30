import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { RealDataAnalysis } from '@/components/evolutive/RealDataAnalysis';
import { IntentionAnalysisPanel } from '@/components/evolutive/IntentionAnalysisPanel';
import { AppointmentOptimizer } from '@/components/evolutive/AppointmentOptimizer';
import { SystemMetricsDashboard } from '@/components/evolutive/SystemMetricsDashboard';
import { SystemRefreshButton } from '@/components/evolutive/SystemRefreshButton';
import { RealDataSyncPanel } from '@/components/evolutive/RealDataSyncPanel';
import { PeriodSelector, PeriodFilter } from '@/components/dashboard/PeriodSelector';
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
  Users,
  Shield,
  RefreshCw
} from 'lucide-react';
import { AppointmentPatternAnalyzer } from '@/components/evolutive/AppointmentPatternAnalyzer';
import { DataSanitizer } from '@/components/evolutive/DataSanitizer';

const EvolutiveSystem = () => {
  const { systemStatus, forceRefreshData } = useEvolutiveSystem();
  const [selectedAgent, setSelectedAgent] = useState('Haila'); // Mudado para Haila como padrão
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>({
    type: 'last30days'
  });

  // Lista completa de agentes baseada nos dados reais das tabelas (31 agentes)
  const availableAgents = [
    'André Araújo',
    'Adiney Esteves', 
    'Alana Meneses',
    'Aline Bigatão',
    'Aline Franzotti',
    'Amanda Mota',
    'Ana Beatriz',
    'Carlos Antunes',
    'Danilo Chammas',
    'Diego Cabrejos',
    'Haila',
    'Henrique Maffei',
    'Jorge Mendes',
    'Julia Jorge',
    'Karla Fazollo',
    'Karla Resende',
    'Luiza Murad',
    'Marcelo Soeiro',
    'Marco Antonio',
    'Mariana Araújo',
    'Michelle Meleck',
    'Patricia Lima',
    'Rachel Carmo',
    'Raiany Pimentel',
    'Roberta Xavier',
    'Roberto Pigini',
    'Roclides Lima',
    'Rodrigo Pastore',
    'Samuel Nolasco',
    'Silvia Joly',
    'Stefanie Lee'
  ].sort();

  console.log('📋 EVOLUTIVE-SYSTEM - Total de agentes disponíveis:', availableAgents.length);
  console.log('🎯 EVOLUTIVE-SYSTEM - Agente selecionado:', selectedAgent);
  console.log('📅 EVOLUTIVE-SYSTEM - Período selecionado:', selectedPeriod);

  const handleRefreshComplete = async () => {
    console.log('🔄 EVOLUTIVE-SYSTEM - Forçando re-render dos componentes');
    
    // Forçar atualização de dados no sistema evolutivo
    await forceRefreshData(selectedAgent, 'intention');
    
    // Forçar re-render dos componentes
    setRefreshKey(prev => prev + 1);
    
    console.log('✅ EVOLUTIVE-SYSTEM - Re-render concluído');
  };

  const handlePeriodChange = async (period: PeriodFilter) => {
    console.log('📅 EVOLUTIVE-SYSTEM - Alteração de período detectada:', period);
    setSelectedPeriod(period);
    
    // Forçar atualização dos dados para o novo período
    await forceRefreshData(selectedAgent, 'intention');
    
    // Forçar atualização dos componentes
    setRefreshKey(prev => prev + 1);
  };

  const handleAgentChange = async (newAgent: string) => {
    console.log('👤 EVOLUTIVE-SYSTEM - Alteração de agente:', selectedAgent, '->', newAgent);
    setSelectedAgent(newAgent);
    
    // Forçar atualização dos dados para o novo agente
    await forceRefreshData(newAgent, 'intention');
    
    // Forçar atualização dos componentes
    setRefreshKey(prev => prev + 1);
  };

  // ... keep existing code (getStatusColor, getStatusText functions)

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

  // Converter período para configurações de análise
  const getAnalysisSettings = () => {
    const now = new Date();
    let startDate: string | undefined;
    let endDate: string | undefined;
    let periodDescription = '';

    switch (selectedPeriod.type) {
      case 'last7days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        endDate = now.toISOString();
        periodDescription = 'Últimos 7 dias';
        break;
      case 'last30days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        endDate = now.toISOString();
        periodDescription = 'Últimos 30 dias';
        break;
      case 'last90days':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
        endDate = now.toISOString();
        periodDescription = 'Últimos 90 dias';
        break;
      case 'custom':
        startDate = selectedPeriod.startDate?.toISOString();
        endDate = selectedPeriod.endDate?.toISOString();
        periodDescription = 'Período personalizado';
        break;
    }

    return {
      startDate,
      endDate,
      period: periodDescription
    };
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
            <div className="flex items-center gap-4">
              <SystemRefreshButton 
                selectedAgent={selectedAgent}
                onRefreshComplete={handleRefreshComplete}
              />
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus)}`}></div>
                <Badge variant="outline">
                  {getStatusText(systemStatus)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <PeriodSelector 
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />

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
                  onClick={() => handleAgentChange(agent)}
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
        <Tabs defaultValue="sync" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="sync" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Sincronização
            </TabsTrigger>
            <TabsTrigger value="real-data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Dados Reais
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Padrões
            </TabsTrigger>
            <TabsTrigger value="intention" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Intenção
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Otimização
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Métricas
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sync" className="space-y-6">
            <RealDataSyncPanel />
          </TabsContent>

          <TabsContent value="real-data" className="space-y-6">
            <RealDataAnalysis 
              key={`real-data-${refreshKey}-${selectedAgent}`} 
              agentName={selectedAgent}
              analysisSettings={getAnalysisSettings()}
            />
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <AppointmentPatternAnalyzer 
              key={`patterns-${refreshKey}-${selectedAgent}`}
              agentName={selectedAgent}
            />
          </TabsContent>

          <TabsContent value="intention" className="space-y-6">
            <IntentionAnalysisPanel 
              key={`intention-${refreshKey}-${selectedAgent}-${selectedPeriod.type}`}
              analysisSettings={getAnalysisSettings()}
              selectedAgent={selectedAgent}
            />
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <AppointmentOptimizer key={`optimization-${refreshKey}`} />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <SystemMetricsDashboard key={`metrics-${refreshKey}`} />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <DataSanitizer key={`security-${refreshKey}`} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EvolutiveSystem;
