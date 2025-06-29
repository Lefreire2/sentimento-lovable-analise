
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';

interface LeadSourceRecommendationsProps {
  recommendations: string[];
}

export const LeadSourceRecommendations = ({ 
  recommendations 
}: LeadSourceRecommendationsProps) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Recomendações por Fonte de Lead
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma recomendação disponível</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          Recomendações por Fonte de Lead
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Insights baseados na análise dos dados reais
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation: string, index: number) => {
            // Determinar o tipo de recomendação baseado no conteúdo
            const isWarning = recommendation.toLowerCase().includes('diversificar') || 
                            recommendation.toLowerCase().includes('considere');
            const isPositive = recommendation.toLowerCase().includes('boa qualidade') ||
                             recommendation.toLowerCase().includes('engajados');
            
            return (
              <div 
                key={index} 
                className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${
                  isPositive ? 'bg-green-50 border-green-400' :
                  isWarning ? 'bg-yellow-50 border-yellow-400' :
                  'bg-blue-50 border-blue-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 ${
                  isPositive ? 'bg-green-500 text-white' :
                  isWarning ? 'bg-yellow-500 text-white' :
                  'bg-blue-500 text-white'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    {isPositive && <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />}
                    {isWarning && <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                    {!isPositive && !isWarning && <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />}
                  </div>
                  
                  <p className={`text-sm leading-relaxed ${
                    isPositive ? 'text-green-800' :
                    isWarning ? 'text-yellow-800' :
                    'text-blue-800'
                  }`}>
                    {recommendation}
                  </p>
                  
                  <Badge 
                    variant="outline" 
                    className={`mt-2 text-xs ${
                      isPositive ? 'bg-green-100 text-green-700 border-green-300' :
                      isWarning ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                      'bg-blue-100 text-blue-700 border-blue-300'
                    }`}
                  >
                    {isPositive ? 'Ponto Forte' : isWarning ? 'Atenção' : 'Insight'}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
