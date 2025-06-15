
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatAgentName } from "@/lib/agents";

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

interface AIAnalysisSectionProps {
    agentData: AgentData;
    selectedAgent: string;
}

export const AIAnalysisSection = ({ agentData, selectedAgent }: AIAnalysisSectionProps) => {
    const [analysis, setAnalysis] = useState<string>("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiProvider, setAIProvider] = useState<string>('');

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
                    provider: 'anthropic'
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

    return (
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
    );
};
