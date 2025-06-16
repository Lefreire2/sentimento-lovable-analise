
import { Star, Loader2, RefreshCw, Database, AlertCircle } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePerformanceMetrics } from "@/hooks/usePerformanceMetrics";

interface PerformanceMetricsProps {
    selectedAgent: string;
}

export const PerformanceMetrics = ({ selectedAgent }: PerformanceMetricsProps) => {
    const { data: performanceData, isLoading, isError, refetch, isFetching } = usePerformanceMetrics(selectedAgent);

    const handleReloadData = async () => {
        console.log('🔄 PERFORMANCE - Botão reload clicado para agente:', selectedAgent);
        try {
            await refetch();
            console.log('✅ PERFORMANCE - Dados recarregados com sucesso');
        } catch (error) {
            console.error('❌ PERFORMANCE - Erro ao recarregar dados:', error);
        }
    };

    const hasRealData = performanceData && (
        parseFloat(performanceData.pontuacao_aderencia_percentual) > 0 ||
        parseFloat(performanceData.numero_perguntas_vendedor) > 0
    );

    if (isLoading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-primary" />
                        <CardTitle>Métricas de Performance</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-2 text-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground font-medium">Carregando performance...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError || !performanceData) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-primary" />
                        <CardTitle>Métricas de Performance</CardTitle>
                    </div>
                    <Button onClick={handleReloadData} variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                        <p className="text-muted-foreground mb-2">Erro ao carregar métricas de performance</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Métricas de Performance</h2>
                    {hasRealData && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            Dados Reais
                        </Badge>
                    )}
                    {!hasRealData && (
                        <Badge variant="outline" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Sem Dados
                        </Badge>
                    )}
                </div>
                <Button 
                    onClick={handleReloadData} 
                    variant="outline" 
                    size="sm"
                    disabled={isFetching}
                    title="Recarregar métricas de performance"
                >
                    {isFetching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <RefreshCw className="h-4 w-4" />
                    )}
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard 
                    title="Conversão MVP" 
                    value={performanceData.conversao_indicada_mvp || 'Não'} 
                    icon={Star} 
                />
                <MetricCard 
                    title="Aderência ao Script" 
                    value={`${parseFloat(performanceData.pontuacao_aderencia_percentual || '0').toFixed(1)}%`} 
                    icon={Star} 
                />
                <MetricCard 
                    title="Perguntas do Vendedor" 
                    value={performanceData.numero_perguntas_vendedor || '0'} 
                    icon={Star} 
                />
                <MetricCard 
                    title="Taxa de Mensagens" 
                    value={`${parseFloat(performanceData.taxa_mensagens_vendedor_percentual || '0').toFixed(1)}%`} 
                    icon={Star} 
                />
            </div>
        </div>
    );
};
