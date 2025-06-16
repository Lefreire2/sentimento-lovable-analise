
import { Clock, Loader2, RefreshCw, Database, AlertCircle } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTimeMetrics } from "@/hooks/useTimeMetrics";

interface TimeMetricsProps {
    selectedAgent: string;
}

export const TimeMetrics = ({ selectedAgent }: TimeMetricsProps) => {
    const { data: timeData, isLoading, isError, refetch, isFetching } = useTimeMetrics(selectedAgent);

    const handleReloadData = async () => {
        console.log('🔄 TIME - Botão reload clicado para agente:', selectedAgent);
        try {
            await refetch();
            console.log('✅ TIME - Dados recarregados com sucesso');
        } catch (error) {
            console.error('❌ TIME - Erro ao recarregar dados:', error);
        }
    };

    const hasRealData = timeData && (
        parseFloat(timeData.tempo_primeira_resposta_minutos) > 0 ||
        parseFloat(timeData.tempo_medio_resposta_atendente_minutos) > 0 ||
        parseFloat(timeData.duracao_total_conversa_minutos) > 0
    );

    if (isLoading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <CardTitle>Métricas de Tempo</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-2 text-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground font-medium">Carregando métricas de tempo...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError || !timeData) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <CardTitle>Métricas de Tempo</CardTitle>
                    </div>
                    <Button onClick={handleReloadData} variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                        <p className="text-muted-foreground mb-2">Erro ao carregar métricas de tempo</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Métricas de Tempo</h2>
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
                    title="Recarregar métricas de tempo"
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
                    title="Primeira Resposta" 
                    value={`${parseFloat(timeData.tempo_primeira_resposta_minutos || '0').toFixed(1)} min`} 
                    icon={Clock} 
                />
                <MetricCard 
                    title="Tempo Médio Resposta" 
                    value={`${parseFloat(timeData.tempo_medio_resposta_atendente_minutos || '0').toFixed(1)} min`} 
                    icon={Clock} 
                />
                <MetricCard 
                    title="Tempo Máximo Resposta" 
                    value={`${parseFloat(timeData.tempo_maximo_resposta_atendente_minutos || '0').toFixed(1)} min`} 
                    icon={Clock} 
                />
                <MetricCard 
                    title="Duração Total" 
                    value={`${parseFloat(timeData.duracao_total_conversa_minutos || '0').toFixed(1)} min`} 
                    icon={Clock} 
                />
            </div>
        </div>
    );
};
