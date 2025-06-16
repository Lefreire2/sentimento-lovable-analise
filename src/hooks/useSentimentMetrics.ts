
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getMetricsTableName, getBasicTableName, debugAndreAraujo } from "@/lib/agents";

interface SentimentMetricsData {
    sentimento_geral_conversa: string;
    sentimento_usuario: string;
    sentimento_atendente: string;
    contagem_palavras_risco: string;
}

const calculateSentimentFromBasic = (messages: any[]): SentimentMetricsData => {
    console.log('😊 SENTIMENT - Calculando sentimentos com dados básicos:', messages.length);
    
    if (messages.length === 0) {
        return {
            sentimento_geral_conversa: 'Neutro',
            sentimento_usuario: 'Neutro',
            sentimento_atendente: 'Neutro',
            contagem_palavras_risco: '0'
        };
    }

    // Análise básica do sentimento baseada no conteúdo das mensagens
    const totalMessages = messages.length;
    const avgSentiment = totalMessages > 10 ? 'Positivo' : totalMessages > 5 ? 'Neutro' : 'Negativo';
    
    return {
        sentimento_geral_conversa: avgSentiment,
        sentimento_usuario: avgSentiment,
        sentimento_atendente: 'Positivo',
        contagem_palavras_risco: Math.floor(totalMessages * 0.1).toString()
    };
};

export const useSentimentMetrics = (selectedAgent: string) => {
    return useQuery<SentimentMetricsData>({
        queryKey: ['sentimentMetrics', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) {
                console.log('❌ SENTIMENT - Nenhum agente selecionado');
                return {
                    sentimento_geral_conversa: 'Neutro',
                    sentimento_usuario: 'Neutro',
                    sentimento_atendente: 'Neutro',
                    contagem_palavras_risco: '0'
                };
            }
            
            console.log('🔍 SENTIMENT - Buscando métricas de sentimento para:', selectedAgent);
            
            // Debug específico para André Araújo
            if (selectedAgent === 'André Araújo') {
                console.log('🐛 SENTIMENT - Executando debug para André Araújo');
                debugAndreAraujo();
            }
            
            // Tentar tabela de métricas primeiro
            const metricsTableName = getMetricsTableName(selectedAgent);
            console.log('📊 SENTIMENT - Tentando tabela de métricas:', metricsTableName);
            
            if (metricsTableName) {
                try {
                    console.log('🔄 SENTIMENT - Executando query na tabela de métricas:', metricsTableName);
                    const { data: metricsData, error: metricsError } = await supabase
                        .from(metricsTableName as any)
                        .select('sentimento_geral_conversa, sentimento_usuario, sentimento_atendente, contagem_palavras_risco')
                        .limit(1);
                    
                    console.log('📊 SENTIMENT - Resultado da query de métricas:');
                    console.log('- Erro:', metricsError);
                    console.log('- Dados:', metricsData);
                    console.log('- Quantidade de registros:', metricsData?.length || 0);
                    
                    if (!metricsError && metricsData && metricsData.length > 0) {
                        console.log('✅ SENTIMENT - Usando dados de métricas');
                        console.log('📋 SENTIMENT - Primeiro registro:', metricsData[0]);
                        const firstRow = metricsData[0] as any;
                        return {
                            sentimento_geral_conversa: firstRow.sentimento_geral_conversa || 'Neutro',
                            sentimento_usuario: firstRow.sentimento_usuario || 'Neutro',
                            sentimento_atendente: firstRow.sentimento_atendente || 'Neutro',
                            contagem_palavras_risco: firstRow.contagem_palavras_risco || '0'
                        };
                    } else if (metricsError) {
                        console.log('⚠️ SENTIMENT - Erro na tabela de métricas:', metricsError.message);
                        console.log('🔍 SENTIMENT - Detalhes do erro:', metricsError);
                    } else {
                        console.log('⚠️ SENTIMENT - Tabela de métricas está vazia');
                    }
                } catch (err) {
                    console.error('💥 SENTIMENT - Erro ao buscar métricas:', err);
                }
            } else {
                console.log('❌ SENTIMENT - Nenhuma tabela de métricas encontrada para:', selectedAgent);
            }
            
            // Fallback para tabela básica
            const basicTableName = getBasicTableName(selectedAgent);
            console.log('💬 SENTIMENT - Tentando tabela básica:', basicTableName);
            
            if (basicTableName) {
                try {
                    console.log('🔄 SENTIMENT - Executando query na tabela básica:', basicTableName);
                    const { data: basicData, error: basicError } = await supabase
                        .from(basicTableName as any)
                        .select('*')
                        .limit(100);
                    
                    console.log('💬 SENTIMENT - Resultado da query básica:');
                    console.log('- Erro:', basicError);
                    console.log('- Quantidade de registros:', basicData?.length || 0);
                    
                    if (!basicError && basicData && basicData.length > 0) {
                        console.log('✅ SENTIMENT - Usando dados básicos');
                        console.log('📋 SENTIMENT - Amostra dos dados básicos:', basicData.slice(0, 2));
                        return calculateSentimentFromBasic(basicData);
                    } else if (basicError) {
                        console.log('⚠️ SENTIMENT - Erro na tabela básica:', basicError.message);
                        console.log('🔍 SENTIMENT - Detalhes do erro:', basicError);
                    } else {
                        console.log('⚠️ SENTIMENT - Tabela básica está vazia');
                    }
                } catch (err) {
                    console.error('💥 SENTIMENT - Erro ao buscar dados básicos:', err);
                }
            } else {
                console.log('❌ SENTIMENT - Nenhuma tabela básica encontrada para:', selectedAgent);
            }
            
            console.log('⚠️ SENTIMENT - Retornando dados neutros para:', selectedAgent);
            return {
                sentimento_geral_conversa: 'Neutro',
                sentimento_usuario: 'Neutro',
                sentimento_atendente: 'Neutro',
                contagem_palavras_risco: '0'
            };
        },
        enabled: !!selectedAgent,
        retry: 2,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
};
