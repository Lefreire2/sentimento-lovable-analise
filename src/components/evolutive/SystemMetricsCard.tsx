
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  Users, 
  Target,
  Calendar,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface SystemMetricsCardProps {
  data: any;
}

export const SystemMetricsCard = ({ data }: SystemMetricsCardProps) => {
  const systemData = data.system_metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total de Leads */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Total de Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{systemData.leads_totais}</div>
          <p className="text-sm text-muted-foreground">Leads no sistema</p>
        </CardContent>
      </Card>

      {/* Leads Qualificados */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4" />
            Leads Qualificados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-600">{systemData.leads_qualificados}</span>
              <Badge variant="outline">{systemData.taxa_qualificacao}%</Badge>
            </div>
            <Progress value={parseFloat(systemData.taxa_qualificacao)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Agendamentos Realizados */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-600">{systemData.agendamentos_realizados}</span>
              <Badge variant="outline">{systemData.taxa_conversao_agendamento}%</Badge>
            </div>
            <Progress value={parseFloat(systemData.taxa_conversao_agendamento)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Conversões Finais */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Conversões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">{systemData.conversoes}</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {systemData.taxa_conversao}%
              </Badge>
            </div>
            <Progress value={parseFloat(systemData.taxa_conversao)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Período de Análise */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Database className="h-4 w-4" />
            Período de Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">{systemData.periodo_analise}</div>
          <p className="text-sm text-muted-foreground">Base de dados utilizada</p>
        </CardContent>
      </Card>

      {/* Resumo das Métricas */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resumo das Métricas do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-blue-600">
                {systemData.leads_totais}
              </div>
              <div className="text-sm text-muted-foreground">Total Leads</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-600">
                {systemData.leads_qualificados}
              </div>
              <div className="text-sm text-muted-foreground">Qualificados</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-orange-600">
                {systemData.agendamentos_realizados}
              </div>
              <div className="text-sm text-muted-foreground">Agendamentos</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-600">
                {systemData.conversoes}
              </div>
              <div className="text-sm text-muted-foreground">Conversões</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Badge variant="outline">{systemData.taxa_qualificacao}%</Badge>
                <div className="text-xs text-muted-foreground mt-1">Taxa Qualificação</div>
              </div>
              <div>
                <Badge variant="outline">{systemData.taxa_conversao_agendamento}%</Badge>
                <div className="text-xs text-muted-foreground mt-1">Taxa Agendamento</div>
              </div>
              <div>
                <Badge variant="outline" className="bg-green-50 text-green-700">{systemData.taxa_conversao}%</Badge>
                <div className="text-xs text-muted-foreground mt-1">Taxa Conversão</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
