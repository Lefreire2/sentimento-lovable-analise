
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Loader2, RefreshCw, Database, AlertCircle, BarChart3 } from "lucide-react";
import { useTimeMetrics } from "@/hooks/useTimeMetrics";

interface ResponseTimeChartProps {
    selectedAgent: string;
}

export const ResponseTimeChart = ({ selectedAgent }: ResponseTimeChartProps) => {
    const { data: timeData, isLoading, isError, refetch, isFetching } = useTimeMetrics(selectedAgent);

    const handleReloadData = async () => {
        console.log('🔄 CHART - Botão reload clicado para agente:', selectedAgent);
        try {
            await refetch();
            console.log('✅ CHART - Dados recarregados com sucesso');
        } catch (error) {
            console.error('❌ CHART - Erro ao recarregar dados:', error);
        }
    };

    const hasRealData = timeData && (
        parseFloat(timeData.tempo_primeira_resposta_minutos) > 0 ||
        parseFloat(timeData.tempo_medio_resposta_atendente_minutos) > 0
    );

    if (isLoading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <CardTitle>Gráfico de Tempos de Resposta</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-2 text-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground font-medium">Carregando gráfico...</p>
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
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <CardTitle>Gráfico de Tempos de Resposta</CardTitle>
                    </div>
                    <Button onClick={handleReloadData} variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                        <p className="text-muted-foreground mb-2">Erro ao carregar gráfico</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const chartData = [
        { 
            name: 'Primeira Resposta', 
            minutos: parseFloat(timeData.tempo_primeira_resposta_minutos) || 0 
        },
        { 
            name: 'Resposta Média', 
            minutos: parseFloat(timeData.tempo_medio_resposta_atendente_minutos) || 0 
        },
        { 
            name: 'Resposta Máxima', 
            minutos: parseFloat(timeData.tempo_maximo_resposta_atendente_minutos) || 0 
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Gráfico de Tempos de Resposta</h2>
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
                    title="Recarregar gráfico"
                >
                    {isFetching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <RefreshCw className="h-4 w-4" />
                    )}
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="minutos" fill="#8884d8" name="Minutos" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};
