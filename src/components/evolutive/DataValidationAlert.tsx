
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { DataValidationResult } from '@/utils/dataValidator';

interface DataValidationAlertProps {
  validation: DataValidationResult;
  onApplyCorrections?: (corrections: Record<string, any>) => void;
}

export const DataValidationAlert = ({ validation, onApplyCorrections }: DataValidationAlertProps) => {
  if (validation.isValid && validation.warnings.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Dados Validados</AlertTitle>
        <AlertDescription className="text-green-700">
          Análise passou em todas as verificações de qualidade.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      {validation.errors.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Erros Detectados</AlertTitle>
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
                <p className="text-sm font-medium text-blue-800">Valores Corrigidos Sugeridos:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(validation.correctedValues).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-blue-700">
                      {key}: {value}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {validation.warnings.length > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <Info className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Avisos</AlertTitle>
          <AlertDescription className="text-yellow-700">
            <ul className="mt-2 space-y-1">
              {validation.warnings.map((warning, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full" />
                  {warning}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
