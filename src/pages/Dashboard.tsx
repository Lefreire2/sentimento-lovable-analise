
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
            
            console.log('Fetching data for agent:', selectedAgent);
            
            const { data, error } = await supabase
                .from(selectedAgent as any)
                .select('*');
            
            if (error) {
                console.error("Supabase error:", error);
                throw new Error(error.message);
            }
            
            console.log('Raw data received:', data);
            
            if (!data || data.length === 0) {
                console.log('No data found for agent:', selectedAgent);
                return null;
            }
            
            // Aggregate the data from multiple conversations
            const aggregatedData = aggregateAgentData(data);
            console.log('Aggregated data:', aggregatedData);
            
            return aggregatedData;
        },
        enabled: !!selectedAgent,
    });

    const aggregateAgentData = (conversations: any[]): AgentData => {
        const validConversations = conversations.filter(conv => conv && Object.keys(conv).length > 0);
        
        if (validConversations.length === 0) {
            return {
                tempo_primeira_resposta_minutos: '0',
                tempo_medio_resposta_atendente_minutos: '0',
                tempo_maximo_resposta_atendente_minutos: '0',
                sentimento_usuario: 'N/A',
                sentimento_atendente: 'N/A',
                sentimento_geral_conversa: 'N/A',
                duracao_total_conversa_minutos: '0',
                conversao_indicada_mvp: 'N/A',
                pontuacao_aderencia_percentual: '0',
                numero_perguntas_vendedor: '0',
                aderência_script_nivel: 'N/A',
                termo_chave_conversao: 'N/A'
            };
        }

        // Calculate averages and aggregates
        const avgFirstResponse = validConversations.reduce((sum, conv) => 
            sum + (parseFloat(conv.tempo_primeira_resposta_minutos) || 0), 0) / validConversations.length;
        
        const avgResponseTime = validConversations.reduce((sum, conv) => 
            sum + (parseFloat(conv.tempo_medio_resposta_atendente_minutos) || 0), 0) / validConversations.length;
        
        const maxResponseTime = Math.max(...validConversations.map(conv => 
            parseFloat(conv.tempo_maximo_resposta_atendente_minutos) || 0));
        
        const totalDuration = validConversations.reduce((sum, conv) => 
            sum + (parseFloat(conv.duracao_total_conversa_minutos) || 0), 0);
        
        const avgAdherence = validConversations.reduce((sum, conv) => 
            sum + (parseFloat(conv.pontuacao_aderencia_percentual) || 0), 0) / validConversations.length;
        
        const totalQuestions = validConversations.reduce((sum, conv) => 
            sum + (parseInt(conv.numero_perguntas_vendedor) || 0), 0);
        
        // Get most common sentiment
        const sentiments = validConversations.map(conv => conv.sentimento_geral_conversa).filter(Boolean);
        const mostCommonSentiment = getMostCommon(sentiments) || 'N/A';
        
        const userSentiments = validConversations.map(conv => conv.sentimento_usuario).filter(Boolean);
        const mostCommonUserSentiment = getMostCommon(userSentiments) || 'N/A';
        
        const agentSentiments = validConversations.map(conv => conv.sentimento_atendente).filter(Boolean);
        const mostCommonAgentSentiment = getMostCommon(agentSentiments) || 'N/A';
        
        // Check conversion rate
        const conversions = validConversations.filter(conv => conv.conversao_indicada_mvp === 'Sim').length;
        const conversionRate = `${((conversions / validConversations.length) * 100).toFixed(1)}%`;
        
        // Get most common adherence level
        const adherenceLevels = validConversations.map(conv => conv.aderência_script_nivel).filter(Boolean);
        const mostCommonAdherence = getMostCommon(adherenceLevels) || 'N/A';
        
        // Get most common conversion term
        const conversionTerms = validConversations.map(conv => conv.termo_chave_conversao).filter(Boolean);
        const mostCommonTerm = getMostCommon(conversionTerms) || 'N/A';

        return {
            tempo_primeira_resposta_minutos: avgFirstResponse.toFixed(1),
            tempo_medio_resposta_atendente_minutos: avgResponseTime.toFixed(1),
            tempo_maximo_resposta_atendente_minutos: maxResponseTime.toFixed(1),
            sentimento_usuario: mostCommonUserSentiment,
            sentimento_atendente: mostCommonAgentSentiment,
            sentimento_geral_conversa: mostCommonSentiment,
            duracao_total_conversa_minutos: totalDuration.toFixed(1),
            conversao_indicada_mvp: conversionRate,
            pontuacao_aderencia_percentual: avgAdherence.toFixed(1),
            numero_perguntas_vendedor: totalQuestions.toString(),
            aderência_script_nivel: mostCommonAdherence,
            termo_chave_conversao: mostCommonTerm
        };
    };

    const getMostCommon = (arr: string[]): string | null => {
        if (arr.length === 0) return null;
        const counts = arr.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    };

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
