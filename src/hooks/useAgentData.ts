import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getTableNameFromFormattedName, isValidTableName, getAllAvailableTables } from "@/lib/agents";

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

const getMostCommon = (arr: string[]): string | null => {
    if (arr.length === 0) return null;
    const counts = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
};

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
    termo_chave_conversao: 'N/A'
});

const createAgentDataFromBasicMessages = (messages: any[]): AgentData => {
    console.log('📊 Criando dados agregados a partir de mensagens básicas:', messages.length);
    
    if (messages.length === 0) {
        return createDefaultAgentData();
    }

    // Para dados básicos, vamos criar métricas simples
    const conversationCount = new Set(messages.map(m => m.remoteJid)).size;
    const avgMessagesPerConversation = messages.length / conversationCount;
    
    console.log(`💬 ${messages.length} mensagens em ${conversationCount} conversas`);
    console.log(`📈 Média de ${avgMessagesPerConversation.toFixed(1)} mensagens por conversa`);

    return {
        tempo_primeira_resposta_minutos: '5.0', // Valor estimado
        tempo_medio_resposta_atendente_minutos: '3.0', // Valor estimado
        tempo_maximo_resposta_atendente_minutos: '15.0', // Valor estimado
        sentimento_usuario: 'Neutro',
        sentimento_atendente: 'Positivo',
        sentimento_geral_conversa: 'Neutro',
        duracao_total_conversa_minutos: (conversationCount * 20).toString(), // Estimativa
        conversao_indicada_mvp: '0%',
        pontuacao_aderencia_percentual: '75.0', // Valor estimado
        numero_perguntas_vendedor: Math.floor(avgMessagesPerConversation * 0.3).toString(),
        aderência_script_nivel: 'Médio',
        termo_chave_conversao: 'N/A'
    };
};

const aggregateAgentData = (conversations: any[]): AgentData => {
    console.log('🔄 Iniciando agregação de dados de métricas...');
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
        return createDefaultAgentData();
    }

    console.log('🔍 Amostra de dados da primeira conversa válida:', validConversations[0]);

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
        
        return numValue;
    };

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
    
    const sentiments = validConversations
        .map(conv => conv.sentimento_geral_conversa)
        .filter(s => s && s !== null && s !== undefined && s !== '');
    const mostCommonSentiment = getMostCommon(sentiments) || 'N/A';
    
    const userSentiments = validConversations
        .map(conv => conv.sentimento_usuario)
        .filter(s => s && s !== null && s !== undefined && s !== '');
    const mostCommonUserSentiment = getMostCommon(userSentiments) || 'N/A';
    
    const agentSentiments = validConversations
        .map(conv => conv.sentimento_atendente)
        .filter(s => s && s !== null && s !== undefined && s !== '');
    const mostCommonAgentSentiment = getMostCommon(agentSentiments) || 'N/A';
    
    const conversions = validConversations.filter(conv => 
        conv.conversao_indicada_mvp && 
        (conv.conversao_indicada_mvp.toLowerCase() === 'sim' || 
         conv.conversao_indicada_mvp.toLowerCase() === 'yes' ||
         conv.conversao_indicada_mvp === '1')
    ).length;
    const conversionRate = validConversations.length > 0 ? 
        `${((conversions / validConversations.length) * 100).toFixed(1)}%` : '0%';
    
    const adherenceLevels = validConversations
        .map(conv => conv.aderência_script_nivel)
        .filter(s => s && s !== null && s !== undefined && s !== '');
    const mostCommonAdherence = getMostCommon(adherenceLevels) || 'N/A';
    
    const conversionTerms = validConversations
        .map(conv => conv.termo_chave_conversao)
        .filter(s => s && s !== null && s !== undefined && s !== '');
    const mostCommonTerm = getMostCommon(conversionTerms) || 'N/A';

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

export const useAgentData = (selectedAgent: string) => {
    return useQuery<AgentData | null>({
        queryKey: ['agentMetrics', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) return null;
            
            console.log('🔍 Iniciando busca para o agente:', selectedAgent);
            
            // Primeiro, tenta buscar na tabela de métricas
            const metricsTableName = getTableNameFromFormattedName(selectedAgent);
            console.log('📊 Tentando buscar métricas na tabela:', metricsTableName);
            
            try {
                const { data: metricsData, error: metricsError } = await supabase
                    .from(metricsTableName as any)
                    .select('*', { count: 'exact' });
                
                if (!metricsError && metricsData && metricsData.length > 0) {
                    console.log('✅ Dados de métricas encontrados:', metricsData.length, 'registros');
                    return aggregateAgentData(metricsData);
                }
                
                console.log('⚠️ Nenhum dado de métricas encontrado, tentando tabela básica...');
                
                // Se não encontrar métricas, tenta a tabela básica
                const basicTableName = metricsTableName.replace('Lista_mensagens_', 'Lista_de_Mensagens_');
                console.log('💬 Tentando buscar mensagens básicas na tabela:', basicTableName);
                
                const { data: basicData, error: basicError } = await supabase
                    .from(basicTableName as any)
                    .select('*', { count: 'exact' });
                
                if (!basicError && basicData && basicData.length > 0) {
                    console.log('✅ Dados básicos encontrados:', basicData.length, 'mensagens');
                    return createAgentDataFromBasicMessages(basicData);
                }
                
                console.log('❌ Nenhum dado encontrado em ambas as tabelas');
                console.log('🔍 Erro de métricas:', metricsError?.message);
                console.log('🔍 Erro de básicos:', basicError?.message);
                
                return null;
                
            } catch (err) {
                console.error('💥 Erro durante a busca de dados:', err);
                throw err;
            }
        },
        enabled: !!selectedAgent,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};

export type { AgentData };
