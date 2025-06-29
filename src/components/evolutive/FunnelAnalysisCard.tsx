
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Users, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { DataValidationAlert } from './DataValidationAlert';
import { validateUniversalAnalysis, correctConversionCalculations } from '@/utils/dataValidator';
import { useState } from 'react';

interface FunnelAnalysisCardProps {
  data: any;
}

export const FunnelAnalysisCard = ({ data }: FunnelAnalysisCardProps) => {
  const [correctedData, setCorrectedData] = useState(data?.funnel_data);
  
  if (!data || !data.funnel_data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Análise de Funil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Dados não disponíveis</p>
        </CardContent>
      </Card>
    );
  }

  const funnelData = correctedData || data.funnel_data;
  
  // Validar dados do funil universalmente
  const validation = validateUniversalAnalysis(funnelData);

  const handleApplyCorrections = async (corrections: Record<string, any>) => {
    try {
      const newCorrectedData = correctConversionCalculations(funnelData);
      setCorrectedData(newCorrectedData);
    } catch (error) {
      console.error('Erro ao aplicar correções no funil:', error);
    }
  };

  const {
    leads,
    qualified,
    appointments,
    conversions,
    rates,
    data_source,
    consistency
  } = funnelData;

  const stages = [
    { label: 'Leads', value: leads, icon: Users, color: 'text-blue-600' },
    { label: 'Qualificados', value: qualified, icon: Target, color: 'text-green-600' },
    { label: 'Agendamentos', value: appointments, icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Conversões', value: conversions, icon: TrendingDown, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-4">
      {/* Data Validation Alert */}
      <DataValidationAlert 
        validation={validation} 
        onApplyCorrections={handleApplyCorrections}
      />

      {/* Funil Visual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Funil de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const percentage = index === 0 ? 100 : ((stage.value / leads) * 100);
              
              return (
                <div key={stage.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${stage.color}`} />
                      <span className="font-medium">{stage.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{stage.value}</span>
                      <Badge variant="outline" className="text-sm">
                        {percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Taxas de Conversão */}
      <Card>
        <CardHeader>
          <CardTitle>Taxas de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{rates.qualification}%</div>
              <div className="text-sm text-muted-foreground">Taxa de Qualificação</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{rates.appointment}%</div>
              <div className="text-sm text-muted-foreground">Taxa de Agendamento</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{rates.conversion}%</div>
              <div className="text-sm text-muted-foreground">Taxa de Conversão Final</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consistência dos Dados */}
      {consistency && (
        <Card>
          <CardHeader>
            <CardTitle>Consistência dos Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Fonte dos dados:</strong> {data_source === 'metrics_table' ? 'Tabela de Métricas' : 'Estimado a partir de leads'}</p>
              <p><strong>Leads únicos (básico):</strong> {consistency.unique_leads_basic}</p>
              <p><strong>Leads únicos (métricas):</strong> {consistency.unique_leads_metrics}</p>
              <p><strong>Base utilizada:</strong> {consistency.base_used}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
