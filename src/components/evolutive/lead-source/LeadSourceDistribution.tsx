
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users } from 'lucide-react';
import { getSourceIcon } from './LeadSourceUtils';

interface LeadSourceDistributionProps {
  sourceDistribution: Record<string, unknown>;
  totalObjections: number;
}

export const LeadSourceDistribution = ({ 
  sourceDistribution, 
  totalObjections 
}: LeadSourceDistributionProps) => {
  // Ordenar fontes por quantidade (maior para menor)
  const sortedSources = Object.entries(sourceDistribution)
    .sort(([, a], [, b]) => {
      const numA = typeof a === 'number' ? a : Number(a) || 0;
      const numB = typeof b === 'number' ? b : Number(b) || 0;
      return numB - numA;
    })
    .filter(([, count]) => {
      const numCount = typeof count === 'number' ? count : Number(count) || 0;
      return numCount > 0;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Distribuição de Objeções por Fonte
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Total de {totalObjections.toLocaleString()} objeções analisadas
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedSources.map(([source, count]) => {
          const numCount = typeof count === 'number' ? count : Number(count) || 0;
          const percentage = totalObjections > 0 
            ? ((numCount / totalObjections) * 100)
            : 0;
          
          return (
            <div key={source} className="space-y-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getSourceIcon(source)}
                  <span className="font-semibold text-gray-800 capitalize">{source}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">
                    {numCount.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
              <Progress 
                value={percentage} 
                className="h-3 bg-gray-200" 
              />
            </div>
          );
        })}
        
        {sortedSources.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma fonte de lead identificada</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
