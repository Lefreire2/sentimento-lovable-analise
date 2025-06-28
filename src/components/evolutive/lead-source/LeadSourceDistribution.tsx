
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Distribuição de Objeções por Fonte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(sourceDistribution).map(([source, count]) => {
            // Safely convert count to number
            const numCount = typeof count === 'number' ? count : Number(count) || 0;
            const percentage = totalObjections > 0 
              ? ((numCount / totalObjections) * 100).toFixed(1) 
              : '0';
            
            return (
              <div key={source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(source)}
                    <span className="font-medium">{source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{numCount} ({percentage}%)</span>
                  </div>
                </div>
                <Progress value={Number(percentage)} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
