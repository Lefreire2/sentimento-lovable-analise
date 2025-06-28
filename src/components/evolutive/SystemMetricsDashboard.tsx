
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
  BarChart3
} from 'lucide-react';
import { useEvolutiveSystem } from '@/hooks/useEvolutiveSystem';

interface SystemMetricsDashboardProps {
  period?: string;
}

export const SystemMetricsDashboard = ({ period = 'last30days' }: SystemMetricsDashboardProps) => {
  const { useSystemMetrics } = useEvolutiveSystem();
  const { data: metrics, isLoading } = useSystemMetrics(period);

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

  if (!metrics) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            Métricas do sistema não disponíveis
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Métricas do Sistema Evolutivo</h2>
        <Badge variant="outline">
          {period === 'last7days' ? 'Últimos 7 dias' : 
           period === 'last30days' ? 'Últimos 30 dias' : 
           'Últimos 90 dias'}
        </Badge>
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
            <div className="text-2xl font-bold">{metrics.leads_totais.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              vs período anterior
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
              {formatPercentage(metrics.taxa_conversao_agendamento)} conversão
            </p>
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
              {metrics.roi_marketing > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={metrics.roi_marketing > 0 ? 'text-green-600' : 'text-red-600'}>
                {metrics.roi_marketing > 0 ? 'Positivo' : 'Negativo'}
              </span>
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
    </div>
  );
};
