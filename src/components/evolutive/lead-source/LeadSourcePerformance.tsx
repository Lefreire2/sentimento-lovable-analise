
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { getSourceIcon, getSourceColor } from './LeadSourceUtils';

interface LeadSourcePerformanceProps {
  sourceConversionRates: Record<string, any>;
}

export const LeadSourcePerformance = ({ 
  sourceConversionRates 
}: LeadSourcePerformanceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Performance de Conversão por Fonte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Fonte</th>
                <th className="text-center p-2">Taxa Conversão</th>
                <th className="text-center p-2">Eficácia Script</th>
                <th className="text-center p-2">Alta Intensidade</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sourceConversionRates).map(([source, rates]: [string, any]) => (
                <tr key={source} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {getSourceIcon(source)}
                      <span className="font-medium">{source}</span>
                    </div>
                  </td>
                  <td className="text-center p-2">
                    <span className={`font-semibold ${getSourceColor(rates.conversion_rate || '0%')}`}>
                      {rates.conversion_rate || '0%'}
                    </span>
                  </td>
                  <td className="text-center p-2">
                    <span className={`font-semibold ${getSourceColor(rates.script_effectiveness_rate || '0%')}`}>
                      {rates.script_effectiveness_rate || '0%'}
                    </span>
                  </td>
                  <td className="text-center p-2">
                    <span className="text-red-600 font-semibold">
                      {rates.high_intensity_rate || '0%'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
