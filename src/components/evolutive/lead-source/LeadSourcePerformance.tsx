
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertCircle } from 'lucide-react';
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
  const sources = Object.entries(sourceConversionRates || {});
  
  if (sources.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Performance de Conversão por Fonte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Dados de performance não disponíveis</p>
            <p className="text-sm mt-2">Aguarde o processamento dos dados de métricas</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPerformanceColor = (rate: string) => {
    const numRate = parseFloat(rate.replace('%', '')) || 0;
    if (numRate >= 30) return 'text-green-700 bg-green-100 border-green-300';
    if (numRate >= 15) return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    if (numRate >= 5) return 'text-orange-700 bg-orange-100 border-orange-300';
    return 'text-red-700 bg-red-100 border-red-300';
  };

  const getIntensityColor = (rate: string) => {
    const numRate = parseFloat(rate.replace('%', '')) || 0;
    if (numRate >= 25) return 'text-red-700 bg-red-100 border-red-300';
    if (numRate >= 15) return 'text-orange-700 bg-orange-100 border-orange-300';
    if (numRate >= 5) return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    return 'text-green-700 bg-green-100 border-green-300';
  };

  const getScriptColor = (rate: string) => {
    const numRate = parseFloat(rate.replace('%', '')) || 0;
    if (numRate >= 40) return 'text-green-700 bg-green-100 border-green-300';
    if (numRate >= 25) return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    if (numRate >= 10) return 'text-orange-700 bg-orange-100 border-orange-300';
    return 'text-red-700 bg-red-100 border-red-300';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Performance de Conversão por Fonte
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Métricas de eficiência baseadas em dados reais
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">Fonte</TableHead>
                <TableHead className="text-center font-semibold text-gray-700">Taxa Conversão</TableHead>
                <TableHead className="text-center font-semibold text-gray-700">Eficácia Script</TableHead>
                <TableHead className="text-center font-semibold text-gray-700">Alta Intensidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map(([source, rates]) => {
                const conversionRate = rates?.conversion_rate || '0.0%';
                const scriptRate = rates?.script_effectiveness_rate || '0.0%';
                const intensityRate = rates?.high_intensity_rate || '0.0%';
                
                return (
                  <TableRow key={source} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-1 bg-gray-100 rounded">
                          {getSourceIcon(source)}
                        </div>
                        <div>
                          <span className="font-medium capitalize">{source}</span>
                          <div className="text-xs text-gray-500">
                            Fonte {source === 'whatsapp' ? 'direta' : 'externa'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={`font-semibold border ${getPerformanceColor(conversionRate)}`}
                      >
                        {conversionRate}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={`font-semibold border ${getScriptColor(scriptRate)}`}
                      >
                        {scriptRate}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={`font-semibold border ${getIntensityColor(intensityRate)}`}
                      >
                        {intensityRate}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        {/* Legenda */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Interpretação das Métricas:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600">
            <div>
              <strong>Taxa Conversão:</strong> Percentual de leads que realizaram ação desejada
            </div>
            <div>
              <strong>Eficácia Script:</strong> Aderência às melhores práticas de atendimento
            </div>
            <div>
              <strong>Alta Intensidade:</strong> Percentual de leads com alta probabilidade de conversão
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

