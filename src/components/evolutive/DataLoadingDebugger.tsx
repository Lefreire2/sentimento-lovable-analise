
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bug, 
  RefreshCw, 
  Database, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useEvolutiveSystem } from '@/hooks/useEvolutiveSystem';

interface DataLoadingDebuggerProps {
  agentName: string;
  analysisType?: string;
}

export const DataLoadingDebugger = ({ agentName, analysisType = 'intention' }: DataLoadingDebuggerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { useRealDataAnalysis, forceRefreshData } = useEvolutiveSystem();
  
  // Mock analysis settings para teste
  const mockAnalysisSettings = {
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString(),
    period: 'Últimos 30 dias'
  };

  const { data, isLoading, error, isSuccess, isFetching, dataUpdatedAt } = useRealDataAnalysis(
    agentName, 
    analysisType, 
    mockAnalysisSettings
  );

  const handleForceRefresh = async () => {
    setIsRefreshing(true);
    try {
      console.log('🔧 DEBUGGER - Forçando refresh manual dos dados');
      await forceRefreshData(agentName, analysisType);
      console.log('✅ DEBUGGER - Refresh manual concluído');
    } catch (error) {
      console.error('❌ DEBUGGER - Erro no refresh manual:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusIcon = () => {
    if (isLoading || isFetching || isRefreshing) return <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />;
    if (error) return <XCircle className="h-4 w-4 text-red-600" />;
    if (isSuccess && data) return <CheckCircle className="h-4 w-4 text-green-600" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
  };

  const getStatusText = () => {
    if (isRefreshing) return 'Atualizando...';
    if (isLoading) return 'Carregando...';
    if (isFetching) return 'Buscando...';
    if (error) return 'Erro';
    if (isSuccess && data) return 'Dados Carregados';
    return 'Aguardando';
  };

  const getStatusColor = () => {
    if (isLoading || isFetching || isRefreshing) return 'bg-blue-50 border-blue-200';
    if (error) return 'bg-red-50 border-red-200';
    if (isSuccess && data) return 'bg-green-50 border-green-200';
    return 'bg-yellow-50 border-yellow-200';
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="mb-4"
      >
        <Bug className="h-4 w-4 mr-2" />
        Debug Carregamento
      </Button>
    );
  }

  return (
    <Card className={`mb-4 border-2 ${getStatusColor()}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Bug className="h-4 w-4" />
            Debugger de Carregamento
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleForceRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              <EyeOff className="h-3 w-3" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Status Principal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
          <Badge variant="outline">
            {agentName} - {analysisType}
          </Badge>
        </div>

        {/* Detalhes do Estado */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Loading:</span>
              <Badge variant={isLoading ? "default" : "secondary"}>
                {isLoading ? "SIM" : "NÃO"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Fetching:</span>
              <Badge variant={isFetching ? "default" : "secondary"}>
                {isFetching ? "SIM" : "NÃO"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Success:</span>
              <Badge variant={isSuccess ? "default" : "secondary"}>
                {isSuccess ? "SIM" : "NÃO"}
              </Badge>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Tem Dados:</span>
              <Badge variant={data ? "default" : "secondary"}>
                {data ? "SIM" : "NÃO"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Erro:</span>
              <Badge variant={error ? "destructive" : "secondary"}>
                {error ? "SIM" : "NÃO"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Última Atualização:</span>
              <span className="text-xs">
                {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Dados ou Erro */}
        {error && (
          <div className="p-2 bg-red-100 border border-red-200 rounded text-xs">
            <strong>Erro:</strong> {error.message}
          </div>
        )}

        {data && (
          <div className="p-2 bg-green-100 border border-green-200 rounded text-xs">
            <strong>Dados Disponíveis:</strong>
            <pre className="mt-1 whitespace-pre-wrap">
              {JSON.stringify(data, null, 2).substring(0, 200)}...
            </pre>
          </div>
        )}

        {/* Configurações de Análise */}
        <div className="p-2 bg-blue-100 border border-blue-200 rounded text-xs">
          <strong>Configurações:</strong>
          <div className="mt-1">
            Agente: {agentName}<br/>
            Tipo: {analysisType}<br/>
            Período: {mockAnalysisSettings.period}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
