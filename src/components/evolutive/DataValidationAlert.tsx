
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { DataValidationResult } from '@/utils/dataValidator';
import { useState } from 'react';

interface DataValidationAlertProps {
  validation: DataValidationResult;
  onApplyCorrections?: (corrections: Record<string, any>) => void;
}

export const DataValidationAlert = ({ validation, onApplyCorrections }: DataValidationAlertProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  if (validation.isValid && validation.warnings.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Análise Validada</AlertTitle>
        <AlertDescription className="text-green-700">
          Todas as etapas de análise passaram nas verificações de qualidade.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      {validation.errors.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Erros nas Etapas de Análise</AlertTitle>
          <AlertDescription className="text-red-700">
            <ul className="mt-2 space-y-1">
              {validation.errors.map((error, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {error}
                </li>
              ))}
            </ul>
            {validation.correctedValues && Object.keys(validation.correctedValues).length > 0 && (
              <div className="mt-3 p-2 bg-blue-50 rounded border">
                <p className="text-sm font-medium text-blue-800">Correções Aplicadas:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(validation.correctedValues).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-blue-700">
                      {key}: {value}
                    </Badge>
                  ))}
                </div>
                {onApplyCorrections && (
                  <Button 
                    onClick={() => onApplyCorrections(validation.correctedValues!)}
                    className="mt-2 text-xs"
                    size="sm"
                  >
                    Aplicar Correções
                  </Button>
                )}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {validation.warnings.length > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <Info className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">
            Avisos das Etapas de Análise
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 text-yellow-700 hover:text-yellow-800"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  Detalhes
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 space-y-2">
                  {validation.warnings.map((warning, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-yellow-100 rounded text-sm">
                      <span className="w-1 h-1 bg-yellow-500 rounded-full mt-2" />
                      {warning}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </AlertTitle>
        </Alert>
      )}

      {/* Detalhes específicos das etapas de análise */}
      {validation.stageAnalysisIssues && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Revisão das Etapas de Análise</AlertTitle>
          <AlertDescription className="text-blue-700">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="mb-3">
                  Ver Detalhes da Revisão
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3">
                {validation.stageAnalysisIssues.funnelStageInconsistencies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-blue-800">Inconsistências no Funil:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {validation.stageAnalysisIssues.funnelStageInconsistencies.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {validation.stageAnalysisIssues.intensityDistributionErrors.length > 0 && (
                  <div>
                    <h4 className="font-medium text-blue-800">Erros na Distribuição de Intensidade:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {validation.stageAnalysisIssues.intensityDistributionErrors.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {validation.stageAnalysisIssues.conversionCalculationErrors.length > 0 && (
                  <div>
                    <h4 className="font-medium text-blue-800">Erros nos Cálculos de Conversão:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {validation.stageAnalysisIssues.conversionCalculationErrors.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
