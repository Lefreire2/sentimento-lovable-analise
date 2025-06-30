
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp } from 'lucide-react';
import { getSourceIcon } from './LeadSourceUtils';

interface LeadSourceDistributionProps {
  sourceDistribution: Record<string, unknown>;
  totalObjections: number;
}

export const LeadSourceDistribution = ({ 
  sourceDistribution, 
  totalObjections 
}: LeadSourceDistributionProps) => {
  // Validar e normalizar dados with proper type conversion
  const validatedDistribution = Object.entries(sourceDistribution)
    .map(([source, countValue]) => {
      // Properly convert unknown to number
      const count = typeof countValue === 'number' 
        ? countValue 
        : typeof countValue === 'string' 
          ? Number(countValue) || 0
          : 0;
      return [source, count] as [string, number];
    })
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a);

  const hasValidData = validatedDistribution.length > 0 && totalObjections > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Distribuição de Leads por Fonte
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {hasValidData 
            ? `Total de ${totalObjections.toLocaleString()} leads analisados`
            : 'Dados de distribuição não disponíveis'
          }
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasValidData ? (
          validatedDistribution.map(([source, count]) => {
            const percentage = (count / totalObjections) * 100;
            const displaySource = source.charAt(0).toUpperCase() + source.slice(1);
            
            return (
              <div key={source} className="space-y-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      {getSourceIcon(source)}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">{displaySource}</span>
                      <div className="text-xs text-gray-500">
                        Fonte de {percentage >= 50 ? 'alta' : percentage >= 20 ? 'média' : 'baixa'} relevância
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-xl text-gray-900">
                        {count.toLocaleString()}
                      </div>
                      {percentage >= 30 && <TrendingUp className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress 
                    value={percentage} 
                    className="h-2 bg-gray-200" 
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span className="font-medium">{percentage.toFixed(1)}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <div className="space-y-2">
              <p className="font-medium">Nenhuma fonte de lead identificada</p>
              <p className="text-sm">
                Verifique se há mensagens disponíveis para este agente
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
