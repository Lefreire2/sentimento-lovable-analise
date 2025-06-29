
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  Users,
  MessageSquare
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
    <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Target className="h-6 w-6 text-blue-600" />
          Análise de Fontes de Lead - {agentName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Fontes Ativas */}
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalSources}</div>
            <div className="text-sm font-medium text-gray-600">Fontes Ativas</div>
          </div>

          {/* Total de Objeções */}
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center justify-center mb-2">
              <MessageSquare className="h-5 w-5 text-purple-500 mr-2" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">{totalObjections.toLocaleString()}</div>
            <div className="text-sm font-medium text-gray-600">Total de Objeções</div>
          </div>

          {/* Melhor Fonte */}
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1">
              {bestPerformingSource}
            </Badge>
            <div className="text-sm font-medium text-gray-600 mt-2">Melhor Fonte</div>
          </div>

          {/* Pior Fonte */}
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center justify-center mb-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1">
              {worstPerformingSource}
            </Badge>
            <div className="text-sm font-medium text-gray-600 mt-2">Pior Fonte</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
