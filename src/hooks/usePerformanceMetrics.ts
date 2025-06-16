
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getMetricsTableName, getBasicTableName, debugAndreAraujo } from "@/lib/agents";

interface PerformanceMetricsData {
    conversao_indicada_mvp: string;
    pontuacao_aderencia_percentual: string;
    numero_perguntas_vendedor: string;
    taxa_mensagens_vendedor_percentual: string;
}

const calculatePerformanceFromBasic = (messages: any[]): PerformanceMetricsData => {
    console.log('⚡ PERFORMANCE - Calculando performance com dados básicos:', messages.length);
    
    if (messages.length === 0) {
        return {
            conversao_indicada_mvp: 'Não',
            pontuacao_aderencia_percentual: '0',
            numero_perguntas_vendedor: '0',
            taxa_mensagens_vendedor_percentual: '0'
        };
    }

    // Análise baseada no número de mensagens e engajamento
    const totalMessages = messages.length;
    const estimatedConversion = totalMessages > 15 ? 'Sim' : 'Não';
    const aderencia = Math.min(85, Math.floor(totalMessages * 3.5));
    const perguntas = Math.floor(totalMessages * 0.3);
    const taxaMensagens = Math.min(100, Math.floor(totalMessages * 2.5));
    
    return {
        conversao_indicada_mvp: estimatedConversion,
        pontuacao_aderencia_percentual: aderencia.toString(),
        numero_perguntas_vendedor: perguntas.toString(),
        taxa_mensagens_vendedor_percentual: taxaMensagens.toString()
    };
};

export const usePerformanceMetrics = (selectedAgent: string) => {
    return useQuery<PerformanceMetricsData>({
        queryKey: ['performanceMetrics', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) {
                console.log('❌ PERFORMANCE - Nenhum agente selecionado');
                return {
                    conversao_indicada_mvp: 'Não',
                    pontuacao_aderencia_percentual: '0',
                    numero_perguntas_vendedor: '0',
                    taxa_mensagens_vendedor_percentual: '0'
                };
            }
            
            console.log('🔍 PERFORMANCE - Buscando métricas de performance para:', selectedAgent);
            
            // Debug específico para André Araújo
            if (selectedAgent === 'André Araújo') {
                console.log('🐛 PERFORMANCE - Executando debug para André Araújo');
                debugAndreAraujo();
            }
            
            // Tentar tabela de métricas primeiro
            const metricsTableName = getMetricsTableName(selectedAgent);
            console.log('📊 PERFORMANCE - Tentando tabela de métricas:', metricsTableName);
            
            if (metricsTableName) {
                try {
                    console.log('🔄 PERFORMANCE - Executando query na tabela de métricas:', metricsTableName);
                    const { data: metricsData, error: metricsError } = await supabase
                        .from(metricsTableName as any)
                        .select('conversao_indicada_mvp, pontuacao_aderencia_percentual, numero_perguntas_vendedor, taxa_mensagens_vendedor_percentual')
                        .limit(1);
                    
                    console.log('📊 PERFORMANCE - Resultado da query de métricas:');
                    console.log('- Erro:', metricsError);
                    console.log('- Dados:', metricsData);
                    console.log('- Quantidade de registros:', metricsData?.length || 0);
                    
                    if (!metricsError && metricsData && metricsData.length > 0) {
                        console.log('✅ PERFORMANCE - Usando dados de métricas');
                        console.log('📋 PERFORMANCE - Primeiro registro:', metricsData[0]);
                        const firstRow = metricsData[0] as any;
                        return {
                            conversao_indicada_mvp: firstRow.conversao_indicada_mvp || 'Não',
                            pontuacao_aderencia_percentual: firstRow.pontuacao_aderencia_percentual || '0',
                            numero_perguntas_vendedor: firstRow.numero_perguntas_vendedor || '0',
                            taxa_mensagens_vendedor_percentual: firstRow.taxa_mensagens_vendedor_percentual || '0'
                        };
                    } else if (metricsError) {
                        console.log('⚠️ PERFORMANCE - Erro na tabela de métricas:', metricsError.message);
                        console.log('🔍 PERFORMANCE - Detalhes do erro:', metricsError);
                    } else {
                        console.log('⚠️ PERFORMANCE - Tabela de métricas está vazia');
                    }
                } catch (err) {
                    console.error('💥 PERFORMANCE - Erro ao buscar métricas:', err);
                }
            } else {
                console.log('❌ PERFORMANCE - Nenhuma tabela de métricas encontrada para:', selectedAgent);
            }
            
            // Fallback para tabela básica
            const basicTableName = getBasicTableName(selectedAgent);
            console.log('💬 PERFORMANCE - Tentando tabela básica:', basicTableName);
            
            if (basicTableName) {
                try {
                    console.log('🔄 PERFORMANCE - Executando query na tabela básica:', basicTableName);
                    const { data: basicData, error: basicError } = await supabase
                        .from(basicTableName as any)
                        .select('*')
                        .limit(100);
                    
                    console.log('💬 PERFORMANCE - Resultado da query básica:');
                    console.log('- Erro:', basicError);
                    console.log('- Quantidade de registros:', basicData?.length || 0);
                    
                    if (!basicError && basicData && basicData.length > 0) {
                        console.log('✅ PERFORMANCE - Usando dados básicos');
                        console.log('📋 PERFORMANCE - Amostra dos dados básicos:', basicData.slice(0, 2));
                        return calculatePerformanceFromBasic(basicData);
                    } else if (basicError) {
                        console.log('⚠️ PERFORMANCE - Erro na tabela básica:', basicError.message);
                        console.log('🔍 PERFORMANCE - Detalhes do erro:', basicError);
                    } else {
                        console.log('⚠️ PERFORMANCE - Tabela básica está vazia');
                    }
                } catch (err) {
                    console.error('💥 PERFORMANCE - Erro ao buscar dados básicos:', err);
                }
            } else {
                console.log('❌ PERFORMANCE - Nenhuma tabela básica encontrada para:', selectedAgent);
            }
            
            console.log('⚠️ PERFORMANCE - Retornando dados zerados para:', selectedAgent);
            return {
                conversao_indicada_mvp: 'Não',
                pontuacao_aderencia_percentual: '0',
                numero_perguntas_vendedor: '0',
                taxa_mensagens_vendedor_percentual: '0'
            };
        },
        enabled: !!selectedAgent,
        retry: 2,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
};
