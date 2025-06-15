
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { agentTables, formatAgentName } from "@/lib/agents";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Loader2, ArrowLeft, BarChart2, Smile, Clock, Star, Users } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MetricCard = ({ title, value, unit, icon: Icon }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value} {unit}</div>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const [selectedAgent, setSelectedAgent] = useState<string>('');

    const { data: agentData, isLoading, isError, error } = useQuery({
        queryKey: ['agentMetrics', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) return null;
            const { data, error } = await supabase
                .from(selectedAgent)
                .select()
                .single();
            if (error) {
                console.error("Supabase error:", error);
                throw new Error(error.message);
            }
            return data;
        },
        enabled: !!selectedAgent,
    });

    const chartData = agentData ? [
        { name: 'Primeira Resposta', minutos: parseFloat(agentData.tempo_primeira_resposta_minutos) || 0 },
        { name: 'Resposta Média', minutos: parseFloat(agentData.tempo_medio_resposta_atendente_minutos) || 0 },
        { name: 'Resposta Máxima', minutos: parseFloat(agentData.tempo_maximo_resposta_atendente_minutos) || 0 },
    ] : [];

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
                            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
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

                {agentData && !isLoading && !isError && (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center"><Smile className="mr-2" /> Análise de Sentimento</h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <MetricCard title="Sentimento do Usuário" value={agentData.sentimento_usuario || 'N/A'} icon={Users} />
                                <MetricCard title="Sentimento do Atendente" value={agentData.sentimento_atendente || 'N/A'} icon={Smile} />
                                <MetricCard title="Sentimento Geral" value={agentData.sentimento_geral_conversa || 'N/A'} icon={BarChart2} />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center"><Clock className="mr-2" /> Métricas de Tempo (minutos)</h2>
                             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <MetricCard title="Duração Total" value={parseFloat(agentData.duracao_total_conversa_minutos).toFixed(1)} unit="min" icon={Clock} />
                                <MetricCard title="1ª Resposta" value={parseFloat(agentData.tempo_primeira_resposta_minutos).toFixed(1)} unit="min" icon={Clock} />
                                <MetricCard title="Resposta Média" value={parseFloat(agentData.tempo_medio_resposta_atendente_minutos).toFixed(1)} unit="min" icon={Clock} />
                                <MetricCard title="Resposta Máxima" value={parseFloat(agentData.tempo_maximo_resposta_atendente_minutos).toFixed(1)} unit="min" icon={Clock} />
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center"><Star className="mr-2" /> Métricas de Performance</h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <MetricCard title="Conversão MVP" value={agentData.conversao_indicada_mvp || 'N/A'} icon={Star} />
                                <MetricCard title="Aderência ao Script" value={`${parseFloat(agentData.pontuacao_aderencia_percentual).toFixed(1)}%`} icon={Star} />
                                <MetricCard title="Perguntas do Vendedor" value={agentData.numero_perguntas_vendedor || '0'} icon={Star} />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Gráfico de Tempos de Resposta</h2>
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
