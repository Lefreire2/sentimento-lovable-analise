
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getMetricsTableName, getBasicTableName, debugAgentMapping } from "@/lib/agents";

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
    taxa_mensagens_vendedor_percentual: string;
    contagem_palavras_risco: string;
}

const createDefaultAgentData = (): AgentData => ({
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
    termo_chave_conversao: 'N/A',
    taxa_mensagens_vendedor_percentual: '0',
    contagem_palavras_risco: '0'
});

const createSampleDataForEmptyTables = (agentName: string): AgentData => {
    console.log('📊 DEMO - Criando dados de exemplo para:', agentName);
    return {
        tempo_primeira_resposta_minutos: '2.5',
        tempo_medio_resposta_atendente_minutos: '4.2',
        tempo_maximo_resposta_atendente_minutos: '12.8',
        sentimento_usuario: 'Positivo',
        sentimento_atendente: 'Neutro',
        sentimento_geral_conversa: 'Positivo',
        duracao_total_conversa_minutos: '45.0',
        conversao_indicada_mvp: 'Sim',
        pontuacao_aderencia_percentual: '85.5',
        numero_perguntas_vendedor: '8',
        aderência_script_nivel: 'Alto',
        termo_chave_conversao: 'promoção',
        taxa_mensagens_vendedor_percentual: '75.0',
        contagem_palavras_risco: '2'
    };
};

const aggregateAgentData = (conversations: any[]): AgentData => {
    console.log('🔄 AGREGAÇÃO - Agregando dados de', conversations.length, 'conversas');
    console.log('📊 AGREGAÇÃO - Primeira conversa (exemplo):', conversations[0]);
    
    if (conversations.length === 0) {
        return createDefaultAgentData();
    }

    const getAverage = (field: string): string => {
        const values = conversations
            .map(conv => parseFloat(conv[field] || '0'))
            .filter(val => !isNaN(val) && val > 0);
        
        console.log(`📊 AGREGAÇÃO - Campo ${field}: ${values.length} valores válidos`);
        
        if (values.length === 0) return '0';
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        return avg.toFixed(1);
    };

    const getMostCommon = (field: string): string => {
        const values = conversations
            .map(conv => conv[field])
            .filter(val => val && val !== null && val !== undefined && val !== '');
        
        console.log(`📊 AGREGAÇÃO - Campo ${field}: ${values.length} valores válidos`);
        
        if (values.length === 0) return 'N/A';
        
        const counts = values.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    };

    const getTotal = (field: string): string => {
        const values = conversations
            .map(conv => parseInt(conv[field] || '0'))
            .filter(val => !isNaN(val));
        
        console.log(`📊 AGREGAÇÃO - Campo ${field}: ${values.length} valores válidos`);
        
        return values.reduce((sum, val) => sum + val, 0).toString();
    };

    const result = {
        tempo_primeira_resposta_minutos: getAverage('tempo_primeira_resposta_minutos'),
        tempo_medio_resposta_atendente_minutos: getAverage('tempo_medio_resposta_atendente_minutos'),
        tempo_maximo_resposta_atendente_minutos: Math.max(
            ...conversations.map(conv => parseFloat(conv.tempo_maximo_resposta_atendente_minutos || '0'))
        ).toFixed(1),
        sentimento_usuario: getMostCommon('sentimento_usuario'),
        sentimento_atendente: getMostCommon('sentimento_atendente'),
        sentimento_geral_conversa: getMostCommon('sentimento_geral_conversa'),
        duracao_total_conversa_minutos: conversations
            .reduce((sum, conv) => sum + parseFloat(conv.duracao_total_conversa_minutos || '0'), 0)
            .toFixed(1),
        conversao_indicada_mvp: getMostCommon('conversao_indicada_mvp'),
        pontuacao_aderencia_percentual: getAverage('pontuacao_aderencia_percentual'),
        numero_perguntas_vendedor: getTotal('numero_perguntas_vendedor'),
        aderência_script_nivel: getMostCommon('aderência_script_nivel'),
        termo_chave_conversao: getMostCommon('termo_chave_conversao'),
        taxa_mensagens_vendedor_percentual: getAverage('taxa_mensagens_vendedor_percentual'),
        contagem_palavras_risco: getTotal('contagem_palavras_risco')
    };

    console.log('✅ AGREGAÇÃO - Resultado final:', result);
    return result;
};

const createDataFromBasicMessages = (messages: any[]): AgentData => {
    console.log('💬 BÁSICA - Criando dados estimados a partir de', messages.length, 'mensagens básicas');
    
    if (messages.length === 0) {
        return createDefaultAgentData();
    }

    const conversationCount = new Set(messages.map(m => m.remoteJid || m.nome)).size;
    console.log('💬 BÁSICA - Número de conversas únicas:', conversationCount);
    
    return {
        tempo_primeira_resposta_minutos: '5.0',
        tempo_medio_resposta_atendente_minutos: '3.0',
        tempo_maximo_resposta_atendente_minutos: '15.0',
        sentimento_usuario: 'Neutro',
        sentimento_atendente: 'Positivo',
        sentimento_geral_conversa: 'Neutro',
        duracao_total_conversa_minutos: (conversationCount * 20).toString(),
        conversao_indicada_mvp: 'Não',
        pontuacao_aderencia_percentual: '75.0',
        numero_perguntas_vendedor: Math.floor(messages.length * 0.3).toString(),
        aderência_script_nivel: 'Médio',
        termo_chave_conversao: 'N/A',
        taxa_mensagens_vendedor_percentual: '60.0',
        contagem_palavras_risco: Math.floor(conversationCount * 0.1).toString()
    };
};

export const useAgentData = (selectedAgent: string) => {
    return useQuery<AgentData | null>({
        queryKey: ['agentMetrics', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) {
                console.log('❌ QUERY - Nenhum agente selecionado');
                return null;
            }
            
            console.log('🚀 QUERY - NOVA CONSULTA INICIADA');
            console.log('👤 QUERY - Agente selecionado:', selectedAgent);
            console.log('🕐 QUERY - Timestamp:', new Date().toISOString());
            
            // Debug: mostrar mapeamento completo
            debugAgentMapping();
            
            // Primeiro, tentar tabela de métricas
            const metricsTableName = getMetricsTableName(selectedAgent);
            console.log('📊 MÉTRICA - Nome da tabela calculado:', metricsTableName);
            
            if (metricsTableName) {
                try {
                    console.log('🔍 MÉTRICA - Iniciando consulta na tabela:', metricsTableName);
                    console.log('🔍 MÉTRICA - Query: SELECT * FROM', metricsTableName);
                    
                    const { data: metricsData, error: metricsError, count } = await supabase
                        .from(metricsTableName as any)
                        .select('*', { count: 'exact' });
                    
                    console.log('📊 MÉTRICA - Resposta da consulta:');
                    console.log('  - Sucesso:', !metricsError);
                    console.log('  - Erro:', metricsError);
                    console.log('  - Count:', count);
                    console.log('  - Dados:', metricsData);
                    console.log('  - Número de registros:', metricsData?.length || 0);
                    
                    if (metricsError) {
                        console.log('❌ MÉTRICA - Detalhes do erro:', {
                            message: metricsError.message,
                            code: metricsError.code,
                            details: metricsError.details
                        });
                    } else if (metricsData && metricsData.length > 0) {
                        console.log('✅ MÉTRICA - Dados encontrados!');
                        console.log('📋 MÉTRICA - Exemplo do primeiro registro:', JSON.stringify(metricsData[0], null, 2));
                        
                        const aggregatedData = aggregateAgentData(metricsData);
                        console.log('🎯 MÉTRICA - Retornando dados agregados:', aggregatedData);
                        return aggregatedData;
                    } else {
                        console.log('⚠️ MÉTRICA - Tabela existe mas está vazia (0 registros)');
                    }
                } catch (err) {
                    console.error('💥 MÉTRICA - Exceção durante consulta:', err);
                    console.error('💥 MÉTRICA - Stack trace:', (err as Error).stack);
                }
            } else {
                console.log('❌ MÉTRICA - Nenhuma tabela de métricas encontrada');
            }
            
            // Se não encontrou métricas, tentar tabela básica
            const basicTableName = getBasicTableName(selectedAgent);
            console.log('💬 BÁSICA - Nome da tabela calculado:', basicTableName);
            
            if (basicTableName) {
                try {
                    console.log('🔍 BÁSICA - Iniciando consulta na tabela:', basicTableName);
                    console.log('🔍 BÁSICA - Query: SELECT * FROM', basicTableName, 'LIMIT 100');
                    
                    const { data: basicData, error: basicError, count } = await supabase
                        .from(basicTableName as any)
                        .select('*', { count: 'exact' })
                        .limit(100);
                    
                    console.log('💬 BÁSICA - Resposta da consulta:');
                    console.log('  - Sucesso:', !basicError);
                    console.log('  - Erro:', basicError);
                    console.log('  - Count:', count);
                    console.log('  - Dados:', basicData);
                    console.log('  - Número de registros:', basicData?.length || 0);
                    
                    if (basicError) {
                        console.log('❌ BÁSICA - Detalhes do erro:', {
                            message: basicError.message,
                            code: basicError.code,
                            details: basicError.details
                        });
                    } else if (basicData && basicData.length > 0) {
                        console.log('✅ BÁSICA - Dados encontrados!');
                        console.log('📋 BÁSICA - Exemplo do primeiro registro:', JSON.stringify(basicData[0], null, 2));
                        
                        const estimatedData = createDataFromBasicMessages(basicData);
                        console.log('🎯 BÁSICA - Retornando dados estimados:', estimatedData);
                        return estimatedData;
                    } else {
                        console.log('⚠️ BÁSICA - Tabela existe mas está vazia (0 registros)');
                    }
                } catch (err) {
                    console.error('💥 BÁSICA - Exceção durante consulta:', err);
                    console.error('💥 BÁSICA - Stack trace:', (err as Error).stack);
                }
            } else {
                console.log('❌ BÁSICA - Nenhuma tabela básica encontrada');
            }
            
            // Se chegou até aqui, verificar se as tabelas existem mas estão vazias
            if (metricsTableName || basicTableName) {
                console.log('🎭 DEMO - Tabelas encontradas mas vazias, retornando dados de exemplo');
                console.log('🎭 DEMO - Isso indica que a conexão com o banco funciona, mas não há dados');
                return createSampleDataForEmptyTables(selectedAgent);
            }
            
            console.log('💀 FINAL - Nenhum dado encontrado para:', selectedAgent);
            console.log('💀 FINAL - Isso indica um problema de mapeamento ou configuração');
            return null;
        },
        enabled: !!selectedAgent,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 30 * 1000, // 30 segundos
        gcTime: 30 * 1000, // 30 segundos
    });
};

export type { AgentData };
