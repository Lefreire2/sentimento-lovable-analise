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
import { StrategicAnalysisSection } from "@/components/dashboard/StrategicAnalysisSection";

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
            
            console.log('🔍 Iniciando busca para o agente:', selectedAgent);
            console.log('📊 Tabelas disponíveis:', agentTables);
            console.log('✅ Verificando se a tabela existe na lista:', agentTables.includes(selectedAgent));
            
            try {
                // Buscar dados da tabela do agente selecionado
                console.log(`🔍 Fazendo query na tabela: "${selectedAgent}"`);
                
                const { data, error, count } = await supabase
                    .from(selectedAgent as any)
                    .select('*', { count: 'exact' });
                
                if (error) {
                    console.error("❌ Erro do Supabase:", error);
                    console.error("📋 Detalhes do erro:", {
                        message: error.message,
                        details: error.details,
                        hint: error.hint,
                        code: error.code
                    });
                    throw new Error(`Erro ao buscar dados: ${error.message}`);
                }
                
                console.log('📈 Dados brutos recebidos:', data);
                console.log('📏 Número total de registros:', count);
                console.log('📏 Número de registros no array:', data ? data.length : 0);
                
                if (!data || data.length === 0) {
                    console.log('⚠️ Nenhum dado encontrado para o agente:', selectedAgent);
                    return null;
                }
                
                // Log das colunas disponíveis no primeiro registro
                if (data[0]) {
                    console.log('🗂️ Colunas disponíveis no primeiro registro:', Object.keys(data[0]));
                    
                    // Verificar se as colunas esperadas existem
                    const expectedColumns = [
                        'tempo_primeira_resposta_minutos',
                        'tempo_medio_resposta_atendente_minutos',
                        'tempo_maximo_resposta_atendente_minutos',
                        'sentimento_usuario',
                        'sentimento_atendente',
                        'sentimento_geral_conversa',
                        'duracao_total_conversa_minutos',
                        'conversao_indicada_mvp',
                        'pontuacao_aderencia_percentual',
                        'numero_perguntas_vendedor',
                        'aderência_script_nivel',
                        'termo_chave_conversao'
                    ];
                    
                    const missingColumns = expectedColumns.filter(col => !(col in data[0]));
                    const availableColumns = expectedColumns.filter(col => col in data[0]);
                    
                    console.log('✅ Colunas encontradas:', availableColumns);
                    console.log('❌ Colunas faltando:', missingColumns);
                    
                    // Log de sample data para entender melhor a estrutura
                    console.log('📝 Sample dos primeiros 3 registros:', data.slice(0, 3));
                }
                
                // Aggregate the data from multiple conversations
                const aggregatedData = aggregateAgentData(data);
                console.log('🔄 Dados agregados finais:', aggregatedData);
                
                return aggregatedData;
            } catch (err) {
                console.error('💥 Erro durante a execução da query:', err);
                throw err;
            }
        },
        enabled: !!selectedAgent,
        retry: 1, // Reduzir tentativas para debug mais rápido
        refetchOnWindowFocus: false, // Evitar refetch desnecessário
    });

    const aggregateAgentData = (conversations: any[]): AgentData => {
        console.log('🔄 Iniciando agregação de dados...');
        console.log('📊 Total de conversas para agregar:', conversations.length);
        
        const validConversations = conversations.filter(conv => {
            const isValid = conv && Object.keys(conv).length > 0;
            if (!isValid) {
                console.log('⚠️ Conversa inválida encontrada:', conv);
            }
            return isValid;
        });
        
        console.log('✅ Conversas válidas após filtro:', validConversations.length);
        
        if (validConversations.length === 0) {
            console.log('❌ Nenhuma conversa válida encontrada, retornando dados padrão');
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

        // Log sample data to understand structure
        console.log('🔍 Amostra de dados da primeira conversa válida:', validConversations[0]);

        // Função helper para lidar com valores que podem estar em diferentes formatos
        const getNumericValue = (value: any, fieldName: string): number => {
            if (value === null || value === undefined || value === '') {
                console.log(`⚠️ Valor vazio/nulo para ${fieldName}:`, value);
                return 0;
            }
            
            const numValue = parseFloat(String(value));
            if (isNaN(numValue)) {
                console.log(`⚠️ Valor não numérico para ${fieldName}:`, value);
                return 0;
            }
            
            console.log(`✅ Valor convertido para ${fieldName}: ${value} -> ${numValue}`);
            return numValue;
        };

        // Calculate averages and aggregates with improved error handling
        const avgFirstResponse = validConversations.reduce((sum, conv) => {
            return sum + getNumericValue(conv.tempo_primeira_resposta_minutos, 'tempo_primeira_resposta_minutos');
        }, 0) / validConversations.length;
        
        const avgResponseTime = validConversations.reduce((sum, conv) => {
            return sum + getNumericValue(conv.tempo_medio_resposta_atendente_minutos, 'tempo_medio_resposta_atendente_minutos');
        }, 0) / validConversations.length;
        
        const maxResponseTime = Math.max(...validConversations.map(conv => {
            return getNumericValue(conv.tempo_maximo_resposta_atendente_minutos, 'tempo_maximo_resposta_atendente_minutos');
        }));
        
        const totalDuration = validConversations.reduce((sum, conv) => {
            return sum + getNumericValue(conv.duracao_total_conversa_minutos, 'duracao_total_conversa_minutos');
        }, 0);
        
        const avgAdherence = validConversations.reduce((sum, conv) => {
            return sum + getNumericValue(conv.pontuacao_aderencia_percentual, 'pontuacao_aderencia_percentual');
        }, 0) / validConversations.length;
        
        const totalQuestions = validConversations.reduce((sum, conv) => {
            return sum + getNumericValue(conv.numero_perguntas_vendedor, 'numero_perguntas_vendedor');
        }, 0);
        
        // Get most common sentiment with better error handling
        const sentiments = validConversations
            .map(conv => conv.sentimento_geral_conversa)
            .filter(s => s && s !== null && s !== undefined && s !== '');
        const mostCommonSentiment = getMostCommon(sentiments) || 'N/A';
        console.log('😊 Sentimentos gerais encontrados:', sentiments);
        console.log('😊 Sentimento mais comum:', mostCommonSentiment);
        
        const userSentiments = validConversations
            .map(conv => conv.sentimento_usuario)
            .filter(s => s && s !== null && s !== undefined && s !== '');
        const mostCommonUserSentiment = getMostCommon(userSentiments) || 'N/A';
        console.log('👤 Sentimentos do usuário:', userSentiments);
        
        const agentSentiments = validConversations
            .map(conv => conv.sentimento_atendente)
            .filter(s => s && s !== null && s !== undefined && s !== '');
        const mostCommonAgentSentiment = getMostCommon(agentSentiments) || 'N/A';
        console.log('🎧 Sentimentos do atendente:', agentSentiments);
        
        // Check conversion rate with better error handling
        const conversions = validConversations.filter(conv => 
            conv.conversao_indicada_mvp && 
            (conv.conversao_indicada_mvp.toLowerCase() === 'sim' || 
             conv.conversao_indicada_mvp.toLowerCase() === 'yes' ||
             conv.conversao_indicada_mvp === '1')
        ).length;
        const conversionRate = validConversations.length > 0 ? 
            `${((conversions / validConversations.length) * 100).toFixed(1)}%` : '0%';
        console.log(`💰 Conversões: ${conversions}/${validConversations.length} = ${conversionRate}`);
        
        // Get most common adherence level
        const adherenceLevels = validConversations
            .map(conv => conv.aderência_script_nivel)
            .filter(s => s && s !== null && s !== undefined && s !== '');
        const mostCommonAdherence = getMostCommon(adherenceLevels) || 'N/A';
        console.log('📋 Níveis de aderência:', adherenceLevels);
        
        // Get most common conversion term
        const conversionTerms = validConversations
            .map(conv => conv.termo_chave_conversao)
            .filter(s => s && s !== null && s !== undefined && s !== '');
        const mostCommonTerm = getMostCommon(conversionTerms) || 'N/A';
        console.log('🔑 Termos de conversão:', conversionTerms);

        const finalData = {
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

        console.log('🎯 Dados finais agregados:', finalData);
        return finalData;
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
                        <p className="mt-2 text-xs text-gray-400">Verifique os logs do console para mais detalhes sobre a consulta.</p>
                    </div>
                )}

                {agentData && !isLoading && !isError && (
                    <div className="space-y-8">
                        <StrategicAnalysisSection agentData={agentData} selectedAgent={selectedAgent} />
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
