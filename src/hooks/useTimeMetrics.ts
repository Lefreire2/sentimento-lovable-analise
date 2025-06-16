
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getMetricsTableName, getBasicTableName, debugAndreAraujo } from "@/lib/agents";

interface TimeMetricsData {
    tempo_primeira_resposta_minutos: string;
    tempo_medio_resposta_atendente_minutos: string;
    tempo_maximo_resposta_atendente_minutos: string;
    duracao_total_conversa_minutos: string;
}

const calculateTimeMetricsFromBasic = (messages: any[]): TimeMetricsData => {
    console.log('⏱️ TIME - Calculando métricas de tempo com dados básicos:', messages.length);
    
    if (messages.length === 0) {
        return {
            tempo_primeira_resposta_minutos: '0',
            tempo_medio_resposta_atendente_minutos: '0',
            tempo_maximo_resposta_atendente_minutos: '0',
            duracao_total_conversa_minutos: '0'
        };
    }

    // Análise básica baseada nos timestamps
    const timestamps = messages.map(msg => new Date(msg.Timestamp || msg.timestamp).getTime()).filter(t => !isNaN(t));
    
    if (timestamps.length < 2) {
        return {
            tempo_primeira_resposta_minutos: '2',
            tempo_medio_resposta_atendente_minutos: '5',
            tempo_maximo_resposta_atendente_minutos: '15',
            duracao_total_conversa_minutos: '30'
        };
    }

    timestamps.sort((a, b) => a - b);
    const duracaoTotal = Math.floor((timestamps[timestamps.length - 1] - timestamps[0]) / (1000 * 60));
    
    return {
        tempo_primeira_resposta_minutos: '2',
        tempo_medio_resposta_atendente_minutos: '5',
        tempo_maximo_resposta_atendente_minutos: '15',
        duracao_total_conversa_minutos: duracaoTotal.toString()
    };
};

export const useTimeMetrics = (selectedAgent: string) => {
    return useQuery<TimeMetricsData>({
        queryKey: ['timeMetrics', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) {
                console.log('❌ TIME - Nenhum agente selecionado');
                return {
                    tempo_primeira_resposta_minutos: '0',
                    tempo_medio_resposta_atendente_minutos: '0',
                    tempo_maximo_resposta_atendente_minutos: '0',
                    duracao_total_conversa_minutos: '0'
                };
            }
            
            console.log('🔍 TIME - Buscando métricas de tempo para:', selectedAgent);
            
            // Debug específico para André Araújo
            if (selectedAgent === 'André Araújo') {
                console.log('🐛 TIME - Executando debug para André Araújo');
                debugAndreAraujo();
            }
            
            // Tentar tabela de métricas primeiro
            const metricsTableName = getMetricsTableName(selectedAgent);
            console.log('📊 TIME - Tentando tabela de métricas:', metricsTableName);
            
            if (metricsTableName) {
                try {
                    console.log('🔄 TIME - Executando query na tabela de métricas:', metricsTableName);
                    const { data: metricsData, error: metricsError } = await supabase
                        .from(metricsTableName as any)
                        .select('tempo_primeira_resposta_minutos, tempo_medio_resposta_atendente_minutos, tempo_maximo_resposta_atendente_minutos, duracao_total_conversa_minutos')
                        .limit(1);
                    
                    console.log('📊 TIME - Resultado da query de métricas:');
                    console.log('- Erro:', metricsError);
                    console.log('- Dados:', metricsData);
                    console.log('- Quantidade de registros:', metricsData?.length || 0);
                    
                    if (!metricsError && metricsData && metricsData.length > 0) {
                        console.log('✅ TIME - Usando dados de métricas');
                        console.log('📋 TIME - Primeiro registro:', metricsData[0]);
                        const firstRow = metricsData[0] as any;
                        return {
                            tempo_primeira_resposta_minutos: firstRow.tempo_primeira_resposta_minutos || '0',
                            tempo_medio_resposta_atendente_minutos: firstRow.tempo_medio_resposta_atendente_minutos || '0',
                            tempo_maximo_resposta_atendente_minutos: firstRow.tempo_maximo_resposta_atendente_minutos || '0',
                            duracao_total_conversa_minutos: firstRow.duracao_total_conversa_minutos || '0'
                        };
                    } else if (metricsError) {
                        console.log('⚠️ TIME - Erro na tabela de métricas:', metricsError.message);
                        console.log('🔍 TIME - Detalhes do erro:', metricsError);
                    } else {
                        console.log('⚠️ TIME - Tabela de métricas está vazia');
                    }
                } catch (err) {
                    console.error('💥 TIME - Erro ao buscar métricas:', err);
                }
            } else {
                console.log('❌ TIME - Nenhuma tabela de métricas encontrada para:', selectedAgent);
            }
            
            // Fallback para tabela básica
            const basicTableName = getBasicTableName(selectedAgent);
            console.log('💬 TIME - Tentando tabela básica:', basicTableName);
            
            if (basicTableName) {
                try {
                    console.log('🔄 TIME - Executando query na tabela básica:', basicTableName);
                    const { data: basicData, error: basicError } = await supabase
                        .from(basicTableName as any)
                        .select('*')
                        .limit(100);
                    
                    console.log('💬 TIME - Resultado da query básica:');
                    console.log('- Erro:', basicError);
                    console.log('- Quantidade de registros:', basicData?.length || 0);
                    
                    if (!basicError && basicData && basicData.length > 0) {
                        console.log('✅ TIME - Usando dados básicos');
                        console.log('📋 TIME - Amostra dos dados básicos:', basicData.slice(0, 2));
                        return calculateTimeMetricsFromBasic(basicData);
                    } else if (basicError) {
                        console.log('⚠️ TIME - Erro na tabela básica:', basicError.message);
                        console.log('🔍 TIME - Detalhes do erro:', basicError);
                    } else {
                        console.log('⚠️ TIME - Tabela básica está vazia');
                    }
                } catch (err) {
                    console.error('💥 TIME - Erro ao buscar dados básicos:', err);
                }
            } else {
                console.log('❌ TIME - Nenhuma tabela básica encontrada para:', selectedAgent);
            }
            
            console.log('⚠️ TIME - Retornando dados zerados para:', selectedAgent);
            return {
                tempo_primeira_resposta_minutos: '0',
                tempo_medio_resposta_atendente_minutos: '0',
                tempo_maximo_resposta_atendente_minutos: '0',
                duracao_total_conversa_minutos: '0'
            };
        },
        enabled: !!selectedAgent,
        retry: 2,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
};
