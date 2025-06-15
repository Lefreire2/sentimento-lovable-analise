import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { agentTables, formatAgentName } from "@/lib/agents";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Loader2, ArrowLeft, BarChart2, Smile, Clock, Star, Users, Brain, Zap } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

const MetricCard = ({ title, value, unit, icon: Icon }: { title: string; value: string | number; unit?: string; icon: React.ComponentType<{ className?: string }> }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}{unit && ` ${unit}`}</div>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const [selectedAgent, setSelectedAgent] = useState<string>('');
    const [analysis, setAnalysis] = useState<string>("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiProvider, setAIProvider] = useState<string>('');

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

    const handleGenerateAnalysis = async () => {
        if (!agentData) return;

        setIsAnalyzing(true);
        setAnalysis('');
        setAIProvider('');

        const promptTemplate = `Você é um analista sênior especializado em atendimento via WhatsApp em clínicas médicas. Receberá os dados de uma conversa com um lead e deverá fazer uma análise completa, respondendo com clareza e foco em melhoria contínua.

DADOS DA CONVERSA:
- Atendente: {{nome}}
- Sentimento Geral: {{sentimento_geral_conversa}}
- Sentimento do Atendente: {{sentimento_atendente}}
- Sentimento do Usuário: {{sentimento_usuario}}
- Tempo Médio de Resposta: {{tempo_medio_resposta}} minutos
- Tempo Primeira Resposta: {{tempo_primeira_resposta}} minutos
- Tempo Máximo de Resposta: {{tempo_maximo_resposta}} minutos
- Duração Total: {{duracao_total}} minutos
- Aderência ao Script: {{aderência_script_nivel}} ({{pontuacao_aderencia_script}}%)
- Conversão Identificada: {{conversao_indicada_sim_nao}}
- Número de Perguntas do Vendedor: {{numero_perguntas}}
- Termos-chave: {{termo_chave_conversao}}

AVALIE CRITICAMENTE:

1. **QUALIDADE EMOCIONAL** (0-10):
   - Empatia e acolhimento demonstrados
   - Consistência do tom durante a conversa
   - Gestão adequada das emoções do lead

2. **PERFORMANCE TÉCNICA** (0-10):
   - Aderência ao script e protocolo
   - Qualidade das perguntas de qualificação
   - Tempo de resposta e agilidade

3. **POTENCIAL DE CONVERSÃO** (0-10):
   - Identificação correta de interesse
   - Condução adequada para fechamento
   - Superação de objeções

4. **PROBLEMAS IDENTIFICADOS**:
   - Pontos específicos de melhoria
   - Oportunidades perdidas
   - Comportamentos inadequados

Responda no seguinte formato EXATO:

---

### 📊 ANÁLISE: {{nome}}

**🎯 RESUMO EXECUTIVO**
Sentimento: {{sentimento_geral_conversa}} | Tempo Médio: {{tempo_medio_resposta}}min | Aderência: {{pontuacao_aderencia_script}}% | Conversão: {{conversao_indicada_sim_nao}}

---

### ✅ PONTOS FORTES
• [Listar 3-4 pontos específicos bem executados]

### ⚠️ OPORTUNIDADES DE MELHORIA
• [Listar 3-4 pontos específicos para melhorar]

### 📈 NOTAS POR CATEGORIA
• **Qualidade Emocional:** X.X/10
• **Performance Técnica:** X.X/10  
• **Potencial de Conversão:** X.X/10

### 🎯 NOTA GERAL: X.X/10

### 💡 AÇÕES RECOMENDADAS
1. [Ação específica e prática]
2. [Ação específica e prática]
3. [Ação específica e prática]

---
*Análise gerada por IA para melhoria contínua*`;

        const prompt = promptTemplate
            .replace(/{{nome}}/g, formatAgentName(selectedAgent))
            .replace('{{sentimento_geral_conversa}}', agentData.sentimento_geral_conversa || 'N/A')
            .replace('{{sentimento_atendente}}', agentData.sentimento_atendente || 'N/A')
            .replace('{{sentimento_usuario}}', agentData.sentimento_usuario || 'N/A')
            .replace('{{tempo_medio_resposta}}', parseFloat(agentData.tempo_medio_resposta_atendente_minutos || '0').toFixed(1))
            .replace('{{tempo_primeira_resposta}}', parseFloat(agentData.tempo_primeira_resposta_minutos || '0').toFixed(1))
            .replace('{{tempo_maximo_resposta}}', parseFloat(agentData.tempo_maximo_resposta_atendente_minutos || '0').toFixed(1))
            .replace('{{duracao_total}}', parseFloat(agentData.duracao_total_conversa_minutos || '0').toFixed(1))
            .replace('{{aderência_script_nivel}}', agentData.aderência_script_nivel || 'N/A')
            .replace('{{pontuacao_aderencia_script}}', parseFloat(agentData.pontuacao_aderencia_percentual || '0').toFixed(1))
            .replace('{{conversao_indicada_sim_nao}}', agentData.conversao_indicada_mvp || 'N/A')
            .replace('{{numero_perguntas}}', agentData.numero_perguntas_vendedor || '0')
            .replace('{{termo_chave_conversao}}', agentData.termo_chave_conversao || 'N/A');

        try {
            const { data, error: invokeError } = await supabase.functions.invoke('generate-analysis', {
                body: { 
                    prompt,
                    provider: 'anthropic' // Preferir Anthropic
                },
            });

            if (invokeError) {
                throw new Error(`A invocação da função falhou: ${invokeError.message}`);
            }

            if (data.error) {
                throw new Error(`A geração da análise falhou: ${data.error}`);
            }

            setAnalysis(data.generatedText);
            setAIProvider(data.provider || 'unknown');
        } catch (e: any) {
            console.error('Error generating analysis:', e);
            setAnalysis(`Ocorreu um erro ao gerar a análise: ${e.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

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
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div className="flex items-center space-x-2">
                                    <Brain className="h-5 w-5 text-primary" />
                                    <CardTitle>Análise Inteligente de Performance</CardTitle>
                                    {aiProvider && (
                                        <Badge variant="secondary" className="ml-2">
                                            {aiProvider === 'anthropic' ? (
                                                <><Brain className="h-3 w-3 mr-1" /> Claude</>
                                            ) : (
                                                <><Zap className="h-3 w-3 mr-1" /> GPT</>
                                            )}
                                        </Badge>
                                    )}
                                </div>
                                <Button onClick={handleGenerateAnalysis} disabled={isAnalyzing}>
                                    {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    <Brain className="mr-2 h-4 w-4" />
                                    Gerar Análise IA
                                </Button>
                            </CardHeader>
                            {isAnalyzing && (
                                <CardContent>
                                    <div className="flex flex-col items-center justify-center gap-2 text-center p-8">
                                        <Brain className="h-8 w-8 animate-pulse text-primary" />
                                        <p className="text-muted-foreground font-medium">IA analisando performance...</p>
                                        <p className="text-sm text-muted-foreground">Processando dados e gerando insights personalizados</p>
                                    </div>
                                </CardContent>
                            )}
                            {analysis && !isAnalyzing && (
                                <CardContent>
                                    <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border p-6 bg-gradient-to-br from-muted/20 to-muted/5">
                                        <pre className="whitespace-pre-wrap font-sans text-sm bg-transparent border-0 p-0 leading-relaxed">{analysis}</pre>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                        
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
                                <MetricCard title="Duração Total" value={parseFloat(agentData.duracao_total_conversa_minutos || '0').toFixed(1)} unit="min" icon={Clock} />
                                <MetricCard title="1ª Resposta" value={parseFloat(agentData.tempo_primeira_resposta_minutos || '0').toFixed(1)} unit="min" icon={Clock} />
                                <MetricCard title="Resposta Média" value={parseFloat(agentData.tempo_medio_resposta_atendente_minutos || '0').toFixed(1)} unit="min" icon={Clock} />
                                <MetricCard title="Resposta Máxima" value={parseFloat(agentData.tempo_maximo_resposta_atendente_minutos || '0').toFixed(1)} unit="min" icon={Clock} />
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center"><Star className="mr-2" /> Métricas de Performance</h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <MetricCard title="Conversão MVP" value={agentData.conversao_indicada_mvp || 'N/A'} icon={Star} />
                                <MetricCard title="Aderência ao Script" value={`${parseFloat(agentData.pontuacao_aderencia_percentual || '0').toFixed(1)}%`} icon={Star} />
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
