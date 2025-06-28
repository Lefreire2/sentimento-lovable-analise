
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target
} from 'lucide-react';

interface LeadSourceOverviewProps {
  agentName: string;
  totalSources: number;
  totalObjections: number;
  bestPerformingSource: string;
  worstPerformingSource: string;
}

export const LeadSourceOverview = ({ 
  agentName, 
  totalSources, 
  totalObjections, 
  bestPerformingSource, 
  worstPerformingSource 
}: LeadSourceOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Análise de Fontes de Lead - {agentName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalSources}</div>
            <div className="text-sm text-muted-foreground">Fontes Ativas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalObjections}</div>
            <div className="text-sm text-muted-foreground">Total de Objeções</div>
          </div>
          <div className="text-center">
            <Badge variant="default" className="text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              {bestPerformingSource}
            </Badge>
            <div className="text-sm text-muted-foreground mt-1">Melhor Fonte</div>
          </div>
          <div className="text-center">
            <Badge variant="destructive" className="text-sm">
              <TrendingDown className="h-3 w-3 mr-1" />
              {worstPerformingSource}
            </Badge>
            <div className="text-sm text-muted-foreground mt-1">Pior Fonte</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
