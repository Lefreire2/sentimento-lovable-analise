
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { getSourceIcon } from './LeadSourceUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface LeadSourcePerformanceProps {
  sourceConversionRates: Record<string, any>;
}

export const LeadSourcePerformance = ({ 
  sourceConversionRates 
}: LeadSourcePerformanceProps) => {
  const sources = Object.entries(sourceConversionRates);
  
  if (sources.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance de Conversão por Fonte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Dados de performance não disponíveis</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPerformanceColor = (rate: string) => {
    const numRate = parseFloat(rate);
    if (numRate >= 80) return 'text-green-600 bg-green-50';
    if (numRate >= 50) return 'text-yellow-600 bg-yellow-50';
    if (numRate >= 20) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getIntensityColor = (rate: string) => {
    const numRate = parseFloat(rate);
    if (numRate >= 30) return 'text-red-600 bg-red-50';
    if (numRate >= 20) return 'text-orange-600 bg-orange-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Performance de Conversão por Fonte
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Métricas de eficiência para cada fonte de lead
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Fonte</TableHead>
                <TableHead className="text-center font-semibold">Taxa Conversão</TableHead>
                <TableHead className="text-center font-semibold">Eficácia Script</TableHead>
                <TableHead className="text-center font-semibold">Alta Intensidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map(([source, rates]) => (
                <TableRow key={source} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getSourceIcon(source)}
                      <span className="font-medium capitalize">{source}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="secondary" 
                      className={`font-semibold ${getPerformanceColor(rates.conversion_rate || '0%')}`}
                    >
                      {rates.conversion_rate || '0%'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="secondary" 
                      className={`font-semibold ${getPerformanceColor(rates.script_effectiveness_rate || '0%')}`}
                    >
                      {rates.script_effectiveness_rate || '0%'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="secondary" 
                      className={`font-semibold ${getIntensityColor(rates.high_intensity_rate || '0%')}`}
                    >
                      {rates.high_intensity_rate || '0%'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
