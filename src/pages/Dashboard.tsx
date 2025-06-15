
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { agentTables, formatAgentName } from "@/lib/agents";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, BarChart2, Users } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AIAnalysisSection } from "@/components/dashboard/AIAnalysisSection";
import { SentimentMetrics } from "@/components/dashboard/SentimentMetrics";
import { TimeMetrics } from "@/components/dashboard/TimeMetrics";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { ResponseTimeChart } from "@/components/dashboard/ResponseTimeChart";

interface AgentData {
    tempo_primeira_resposta_minutos: string;
    tempo_medio_resposta_atendente_minutos: string;
    tempo_maximo_resposta_atendente_minutos: string;
    sentimento_usuario: string;
    sentimento_atendente: string;
    sentimento_geral_conversa: string;
    duracao_total_conversa_minutos: string;
    conversao_indicada_mvp: string;
    pontuacao_aderencia_percentual: string;
    numero_perguntas_vendedor: string;
    aderência_script_nivel: string;
    termo_chave_conversao: string;
}

const Dashboard = () => {
    const [selectedAgent, setSelectedAgent] = useState<string>('');

    const { data: agentData, isLoading, isError, error } = useQuery<AgentData | null>({
        queryKey: ['agentMetrics', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) return null;
            const { data, error } = await supabase
                .from(selectedAgent as any)
                .select()
                .maybeSingle();
            if (error) {
                console.error("Supabase error:", error);
                throw new Error(error.message);
            }
            return data as unknown as AgentData | null;
        },
        enabled: !!selectedAgent,
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-6">
                    <Button asChild variant="outline" size="icon" className="mr-4">
                        <Link to="/"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard de Métricas</h1>
                </div>

                <div className="mb-6 max-w-sm">
                    <Select onValueChange={setSelectedAgent} value={selectedAgent}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um atendente..." />
                        </SelectTrigger>
                        <SelectContent>
                            {agentTables.map(table => (
                                <SelectItem key={table} value={table}>
                                    {formatAgentName(table)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="ml-4 text-muted-foreground">Carregando dados do atendente...</p>
                    </div>
                )}
                
                {isError && (
                    <Card className="bg-destructive/10 border-destructive">
                        <CardHeader>
                            <CardTitle>Erro ao carregar dados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Não foi possível buscar as métricas. Por favor, tente novamente mais tarde.</p>
                            {error && <p className="text-sm text-muted-foreground mt-2">{error.message}</p>}
                        </CardContent>
                    </Card>
                )}
                
                {!selectedAgent && !isLoading && (
                     <div className="text-center py-16">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nenhum atendente selecionado</h3>
                        <p className="mt-1 text-sm text-gray-500">Por favor, selecione um atendente para visualizar as métricas.</p>
                    </div>
                )}

                {selectedAgent && !isLoading && !isError && !agentData && (
                    <div className="text-center py-16">
                        <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Sem dados para este atendente</h3>
                        <p className="mt-1 text-sm text-gray-500">Não foram encontrados dados de métricas para o atendente selecionado.</p>
                    </div>
                )}

                {agentData && !isLoading && !isError && (
                    <div className="space-y-8">
                        <AIAnalysisSection agentData={agentData} selectedAgent={selectedAgent} />
                        <SentimentMetrics agentData={agentData} />
                        <TimeMetrics agentData={agentData} />
                        <PerformanceMetrics agentData={agentData} />
                        <ResponseTimeChart agentData={agentData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
