
import { Heart, Loader2, RefreshCw, Database, AlertCircle } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSentimentMetrics } from "@/hooks/useSentimentMetrics";

interface SentimentMetricsProps {
    selectedAgent: string;
}

export const SentimentMetrics = ({ selectedAgent }: SentimentMetricsProps) => {
    const { data: sentimentData, isLoading, isError, refetch, isFetching } = useSentimentMetrics(selectedAgent);

    const handleReloadData = async () => {
        console.log('🔄 SENTIMENT - Botão reload clicado para agente:', selectedAgent);
        try {
            await refetch();
            console.log('✅ SENTIMENT - Dados recarregados com sucesso');
        } catch (error) {
            console.error('❌ SENTIMENT - Erro ao recarregar dados:', error);
        }
    };

    const hasRealData = sentimentData && sentimentData.sentimento_geral_conversa !== 'Neutro';

    if (isLoading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-primary" />
                        <CardTitle>Análise de Sentimento</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-2 text-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground font-medium">Analisando sentimentos...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError || !sentimentData) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-primary" />
                        <CardTitle>Análise de Sentimento</CardTitle>
                    </div>
                    <Button onClick={handleReloadData} variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                        <p className="text-muted-foreground mb-2">Erro ao carregar análise de sentimento</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Análise de Sentimento</h2>
                    {hasRealData && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            Dados Reais
                        </Badge>
                    )}
                    {!hasRealData && (
                        <Badge variant="outline" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Neutro
                        </Badge>
                    )}
                </div>
                <Button 
                    onClick={handleReloadData} 
                    variant="outline" 
                    size="sm"
                    disabled={isFetching}
                    title="Recarregar análise de sentimento"
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
                    title="Sentimento Geral" 
                    value={sentimentData.sentimento_geral_conversa || 'Neutro'} 
                    icon={Heart} 
                />
                <MetricCard 
                    title="Sentimento do Usuário" 
                    value={sentimentData.sentimento_usuario || 'Neutro'} 
                    icon={Heart} 
                />
                <MetricCard 
                    title="Sentimento do Atendente" 
                    value={sentimentData.sentimento_atendente || 'Neutro'} 
                    icon={Heart} 
                />
                <MetricCard 
                    title="Palavras de Risco" 
                    value={sentimentData.contagem_palavras_risco || '0'} 
                    icon={Heart} 
                />
            </div>
        </div>
    );
};
