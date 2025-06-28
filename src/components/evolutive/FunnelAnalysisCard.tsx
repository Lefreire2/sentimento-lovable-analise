
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  Target,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

interface FunnelAnalysisCardProps {
  data: any;
}

export const FunnelAnalysisCard = ({ data }: FunnelAnalysisCardProps) => {
  const funnelData = data.funnel_data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total de Leads */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Total de Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{funnelData.leads}</div>
          <p className="text-sm text-muted-foreground">Leads iniciais</p>
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
              <span className="text-2xl font-bold text-purple-600">{funnelData.qualified}</span>
              <Badge variant="outline">{funnelData.rates.qualification}%</Badge>
            </div>
            <Progress value={parseFloat(funnelData.rates.qualification)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Agendamentos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-600">{funnelData.appointments}</span>
              <Badge variant="outline">{funnelData.rates.appointment}%</Badge>
            </div>
            <Progress value={parseFloat(funnelData.rates.appointment)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Conversões */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Conversões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">{funnelData.conversions}</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {funnelData.rates.conversion}%
              </Badge>
            </div>
            <Progress value={parseFloat(funnelData.rates.conversion)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Resumo do Funil */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Resumo do Funil de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-blue-600">
                {funnelData.leads}
              </div>
              <div className="text-sm text-muted-foreground">Leads Iniciais</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-600">
                {funnelData.qualified}
              </div>
              <div className="text-sm text-muted-foreground">Qualificados</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-orange-600">
                {funnelData.appointments}
              </div>
              <div className="text-sm text-muted-foreground">Agendamentos</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-600">
                {funnelData.conversions}
              </div>
              <div className="text-sm text-muted-foreground">Conversões</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
