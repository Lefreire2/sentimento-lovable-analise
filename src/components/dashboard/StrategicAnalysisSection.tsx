
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, TrendingUp, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatAgentName } from "@/lib/agents";
import { useToast } from "@/hooks/use-toast";
import { AgentData } from "@/hooks/useAgentData";
import { PeriodFilter } from "./PeriodSelector";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface StrategicAnalysisSectionProps {
    agentData: AgentData;
    selectedAgent: string;
    selectedPeriod: PeriodFilter;
}

export const StrategicAnalysisSection = ({ agentData, selectedAgent, selectedPeriod }: StrategicAnalysisSectionProps) => {
    const [analysis, setAnalysis] = useState<string>("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiProvider, setAIProvider] = useState<string>('');
    const { toast } = useToast();

    const getPeriodDescription = () => {
        switch (selectedPeriod.type) {
            case 'last7days':
                return 'últimos 7 dias';
            case 'last30days':
                return 'últimos 30 dias';
            case 'last90days':
                return 'últimos 90 dias';
            case 'custom':
                if (selectedPeriod.startDate && selectedPeriod.endDate) {
                    return `${format(selectedPeriod.startDate, "dd/MM/yyyy", { locale: ptBR })} até ${format(selectedPeriod.endDate, "dd/MM/yyyy", { locale: ptBR })}`;
                }
                return 'período personalizado';
            default:
                return 'período selecionado';
        }
    };

    const handleGenerateStrategicAnalysis = async () => {
        if (!agentData) return;

        setIsAnalyzing(true);
        setAnalysis('');
        setAIProvider('');

        const periodDescription = getPeriodDescription();
        const conversationData = {
            remoteJid: `dashboard_${selectedAgent}_${selectedPeriod.type}_${Date.now()}`,
            nome: formatAgentName(selectedAgent),
            origem: `Dashboard Agregado - ${periodDescription}`,
            levantada_de_mao: agentData.conversao_indicada_mvp === 'Sim' ? 'Sim' : 'Não',
            agendou: agentData.conversao_indicada_mvp === 'Sim' ? 'Sim' : 'Não',
            sentimento_geral_conversa: agentData.sentimento_geral_conversa || 'N/A',
            sentimento_atendente: agentData.sentimento_atendente || 'N/A',
            sentimento_usuario: agentData.sentimento_usuario || 'N/A',
            tempo_primeira_resposta: parseFloat(agentData.tempo_primeira_resposta_minutos || '0'),
            tempo_medio_resposta: parseFloat(agentData.tempo_medio_resposta_atendente_minutos || '0'),
            duracao_total_conversa: parseFloat(agentData.duracao_total_conversa_minutos || '0'),
            aderencia_script_nivel: agentData.aderência_script_nivel || 'N/A',
            pontuacao_aderencia_script: parseFloat(agentData.pontuacao_aderencia_percentual || '0'),
            termo_chave_conversao: agentData.termo_chave_conversao || 'N/A',
            data_conversa: new Date().toISOString().split('T')[0],
            periodo_analise: periodDescription
        };

        try {
            console.log('📊 Iniciando análise estratégica para:', formatAgentName(selectedAgent));
            console.log('📊 Período:', periodDescription);
            
            const { data, error: invokeError } = await supabase.functions.invoke('analise-estrategica', {
                body: { 
                    conversationData,
                    provider: 'anthropic'
                },
            });

            if (invokeError) {
                console.error('❌ Erro ao invocar função:', invokeError);
                throw new Error(`Falha na invocação: ${invokeError.message}`);
            }

            if (data.error) {
                console.error('❌ Erro na análise:', data.error);
                throw new Error(`Falha na análise: ${data.error}`);
            }

            console.log('✅ Análise estratégica concluída');
            setAnalysis(data.analise_gerada);
            setAIProvider(data.provider || 'unknown');
            
            toast({
                title: "Análise Concluída",
                description: `Análise estratégica gerada para ${periodDescription}`,
            });

        } catch (e: any) {
            console.error('💥 Erro na análise estratégica:', e);
            const errorMessage = `Erro ao gerar análise estratégica: ${e.message}`;
            setAnalysis(errorMessage);
            
            toast({
                title: "Erro na Análise",
                description: e.message,
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <CardTitle>Análise Estratégica de Performance</CardTitle>
                    <Badge variant="outline" className="ml-2">
                        {getPeriodDescription()}
                    </Badge>
                    {aiProvider && (
                        <Badge variant="secondary" className="ml-2">
                            {aiProvider === 'anthropic' ? (
                                <><Brain className="h-3 w-3 mr-1" /> Claude</>
                            ) : (
                                <><Users className="h-3 w-3 mr-1" /> GPT</>
                            )}
                        </Badge>
                    )}
                </div>
                <Button onClick={handleGenerateStrategicAnalysis} disabled={isAnalyzing}>
                    {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Análise Estratégica
                </Button>
            </CardHeader>
            {isAnalyzing && (
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-2 text-center p-8">
                        <TrendingUp className="h-8 w-8 animate-pulse text-primary" />
                        <p className="text-muted-foreground font-medium">Analisando estratégia comercial...</p>
                        <p className="text-sm text-muted-foreground">
                            Avaliando performance para {getPeriodDescription()}
                        </p>
                    </div>
                </CardContent>
            )}
            {analysis && !isAnalyzing && (
                <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border p-6 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-950/20 dark:to-purple-950/20">
                        <pre className="whitespace-pre-wrap font-sans text-sm bg-transparent border-0 p-0 leading-relaxed">{analysis}</pre>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};
