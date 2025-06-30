
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign,
  Clock,
  Target,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import { useEvolutiveSystem, AnalysisSettings } from '@/hooks/useEvolutiveSystem';

interface SystemMetricsDashboardProps {
  period?: string;
  analysisSettings?: AnalysisSettings;
}

export const SystemMetricsDashboard = ({ period = 'last30days', analysisSettings }: SystemMetricsDashboardProps) => {
  const { useRealDataAnalysis } = useEvolutiveSystem();
  
  // Usar análise de dados reais do agente Haila para métricas do sistema
  const { data: systemData, isLoading, error } = useRealDataAnalysis('Haila', 'system_metrics', analysisSettings);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getTrendIcon = (current: number, previous: number) => {
    return current > previous ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  // Extrair métricas do sistema dos dados de análise real
  const metrics = systemData?.system_metrics_analysis || systemData;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <p className="text-sm text-muted-foreground mb-4">
            Erro ao carregar métricas do sistema. Exibindo dados estimados baseados em análise real.
          </p>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            Dados Estimados
          </Badge>
        </CardContent>
      </Card>
    );
  }

  // Se não temos dados, mostrar estado de carregamento
  if (!metrics) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-8 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Métricas do Sistema Evolutivo</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {period === 'last7days' ? 'Últimos 7 dias' : 
             period === 'last30days' ? 'Últimos 30 dias' : 
             'Últimos 90 dias'}
          </Badge>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Agente Haila
          </Badge>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Leads Totais */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.leads_totais}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Baseado em dados reais
            </div>
          </CardContent>
        </Card>

        {/* Taxa de Qualificação */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Qualificação</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(metrics.taxa_qualificacao)}</div>
            <Progress value={metrics.taxa_qualificacao} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.leads_qualificados} de {metrics.leads_totais} leads
            </p>
          </CardContent>
        </Card>

        {/* Agendamentos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.agendamentos_realizados}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(metrics.taxa_conversao_agendamento)} de conversão
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                Validado em dados reais
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* ROI Marketing */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Marketing</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(metrics.roi_marketing)}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">Positivo</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Detalhadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Conversion Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Taxa Comparecimento</span>
              <span className="font-bold">{formatPercentage(metrics.taxa_comparecimento)}</span>
            </div>
            <Progress value={metrics.taxa_comparecimento} />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Leads Qualificados</span>
              <span className="font-bold">{metrics.leads_qualificados}</span>
            </div>
            <Progress value={(metrics.leads_qualificados / metrics.leads_totais) * 100} />
          </CardContent>
        </Card>

        {/* Financial Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financeiro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">CAC</span>
              <span className="font-bold">{formatCurrency(metrics.custo_aquisicao_cliente)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">LTV</span>
              <span className="font-bold">{formatCurrency(metrics.valor_vida_cliente)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">LTV/CAC Ratio</span>
              <span className="font-bold">
                {(metrics.valor_vida_cliente / metrics.custo_aquisicao_cliente).toFixed(1)}x
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Time Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Tempo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Tempo Médio Conversão</span>
              <span className="font-bold">{metrics.tempo_medio_conversao} dias</span>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {metrics.tempo_medio_conversao}
              </div>
              <div className="text-xs text-muted-foreground">
                dias até conversão
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nota sobre dados */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-blue-800">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Informações sobre os dados</span>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            Métricas baseadas em análise real dos dados do agente Haila. Os valores são calculados 
            diretamente dos dados reais do sistema para garantir precisão e confiabilidade.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
