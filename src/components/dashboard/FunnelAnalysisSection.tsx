
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingDown, Brain, Funnel } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatAgentName } from "@/lib/agents";
import { useToast } from "@/hooks/use-toast";
import { AgentData } from "@/hooks/useAgentData";

interface FunnelAnalysisSectionProps {
    agentData: AgentData;
    selectedAgent: string;
}

export const FunnelAnalysisSection = ({ agentData, selectedAgent }: FunnelAnalysisSectionProps) => {
    const [analysis, setAnalysis] = useState<string>("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiProvider, setAIProvider] = useState<string>('');
    const { toast } = useToast();

    const handleGenerateFunnelAnalysis = async () => {
        if (!agentData) return;

        setIsAnalyzing(true);
        setAnalysis('');
        setAIProvider('');

        // Criar mensagens simuladas baseadas nos dados agregados
        const simulatedMessages = `
[CONVERSA SIMULADA BASEADA EM DADOS AGREGADOS]

Secretária: Olá! Obrigada por entrar em contato. Como posso te ajudar?
Lead: Oi, vi o anúncio de vocês e gostaria de mais informações sobre consultas.
Secretária: Claro! Que especialidade você está procurando?
Lead: Preciso de uma consulta com ${agentData.termo_chave_conversao || 'dermatologista'}.
Secretária: Perfeito! Temos horários disponíveis. A consulta tem o valor de R$ 200,00.
Lead: ${agentData.conversao_indicada_mvp === 'Sim' ? 'Ok, vou agendar sim!' : 'Deixa eu ver e te retorno...'}
${agentData.conversao_indicada_mvp === 'Sim' ? 'Secretária: Ótimo! Qual dia seria melhor para você?' : ''}
        `.trim();

        const funnelData = {
            remoteJid: `aggregated_${selectedAgent}_${Date.now()}`,
            nome: formatAgentName(selectedAgent),
            data_conversa: new Date().toISOString().split('T')[0],
            origem: 'Dados Agregados Dashboard',
            mensagens_concatenadas: simulatedMessages,
            sentimento_geral_conversa: agentData.sentimento_geral_conversa || 'Neutro',
            sentimento_usuario: agentData.sentimento_usuario || 'Neutro',
            sentimento_atendente: agentData.sentimento_atendente || 'Positivo'
        };

        try {
            console.log('🔍 Iniciando análise de funil para:', formatAgentName(selectedAgent));
            
            const { data, error: invokeError } = await supabase.functions.invoke('analise-funil', {
                body: { 
                    funnelData,
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

            console.log('✅ Análise de funil concluída');
            setAnalysis(data.analise_gerada);
            setAIProvider(data.provider || 'unknown');
            
            toast({
                title: "Análise de Funil Concluída",
                description: "Diagnóstico de etapas do funil gerado com sucesso",
            });

        } catch (e: any) {
            console.error('💥 Erro na análise de funil:', e);
            const errorMessage = `Erro ao gerar análise de funil: ${e.message}`;
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
                    <Funnel className="h-5 w-5 text-primary" />
                    <CardTitle>Análise de Funil Conversacional</CardTitle>
                    {aiProvider && (
                        <Badge variant="secondary" className="ml-2">
                            {aiProvider === 'anthropic' ? (
                                <><Brain className="h-3 w-3 mr-1" /> Claude</>
                            ) : (
                                <><TrendingDown className="h-3 w-3 mr-1" /> GPT</>
                            )}
                        </Badge>
                    )}
                </div>
                <Button onClick={handleGenerateFunnelAnalysis} disabled={isAnalyzing}>
                    {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Funnel className="mr-2 h-4 w-4" />
                    Analisar Funil
                </Button>
            </CardHeader>
            {isAnalyzing && (
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-2 text-center p-8">
                        <Funnel className="h-8 w-8 animate-pulse text-primary" />
                        <p className="text-muted-foreground font-medium">Analisando etapas do funil...</p>
                        <p className="text-sm text-muted-foreground">Identificando pontos de abandono e oportunidades</p>
                    </div>
                </CardContent>
            )}
            {analysis && !isAnalyzing && (
                <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border p-6 bg-gradient-to-br from-orange-50/20 to-red-50/20 dark:from-orange-950/20 dark:to-red-950/20">
                        <pre className="whitespace-pre-wrap font-sans text-sm bg-transparent border-0 p-0 leading-relaxed">{analysis}</pre>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};
