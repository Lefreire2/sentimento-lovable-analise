
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeadSourceRecommendationsProps {
  recommendations: string[];
}

export const LeadSourceRecommendations = ({ 
  recommendations 
}: LeadSourceRecommendationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendações por Fonte de Lead</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations?.map((recommendation: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm">{recommendation}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
