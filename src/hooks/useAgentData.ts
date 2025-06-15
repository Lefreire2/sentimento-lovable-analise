
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

const aggregateAgentData = (conversations: any[]): AgentData => {
    console.log('🔄 Iniciando agregação de dados...');
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
        return {
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
        };
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
        
        console.log(`✅ Valor convertido para ${fieldName}: ${value} -> ${numValue}`);
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
    console.log('😊 Sentimentos gerais encontrados:', sentiments);
    console.log('😊 Sentimento mais comum:', mostCommonSentiment);
    
    const userSentiments = validConversations
        .map(conv => conv.sentimento_usuario)
        .filter(s => s && s !== null && s !== undefined && s !== '');
    const mostCommonUserSentiment = getMostCommon(userSentiments) || 'N/A';
    console.log('👤 Sentimentos do usuário:', userSentiments);
    
    const agentSentiments = validConversations
        .map(conv => conv.sentimento_atendente)
        .filter(s => s && s !== null && s !== undefined && s !== '');
    const mostCommonAgentSentiment = getMostCommon(agentSentiments) || 'N/A';
    console.log('🎧 Sentimentos do atendente:', agentSentiments);
    
    const conversions = validConversations.filter(conv => 
        conv.conversao_indicada_mvp && 
        (conv.conversao_indicada_mvp.toLowerCase() === 'sim' || 
         conv.conversao_indicada_mvp.toLowerCase() === 'yes' ||
         conv.conversao_indicada_mvp === '1')
    ).length;
    const conversionRate = validConversations.length > 0 ? 
        `${((conversions / validConversations.length) * 100).toFixed(1)}%` : '0%';
    console.log(`💰 Conversões: ${conversions}/${validConversations.length} = ${conversionRate}`);
    
    const adherenceLevels = validConversations
        .map(conv => conv.aderência_script_nivel)
        .filter(s => s && s !== null && s !== undefined && s !== '');
    const mostCommonAdherence = getMostCommon(adherenceLevels) || 'N/A';
    console.log('📋 Níveis de aderência:', adherenceLevels);
    
    const conversionTerms = validConversations
        .map(conv => conv.termo_chave_conversao)
        .filter(s => s && s !== null && s !== undefined && s !== '');
    const mostCommonTerm = getMostCommon(conversionTerms) || 'N/A';
    console.log('🔑 Termos de conversão:', conversionTerms);

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
            console.log('📋 Tabelas disponíveis:', getAllAvailableTables());
            
            // Converte o nome formatado para o nome da tabela
            const tableName = getTableNameFromFormattedName(selectedAgent);
            console.log('📋 Nome da tabela resolvido:', tableName);
            
            // Verifica se a tabela é válida
            if (!isValidTableName(tableName)) {
                console.error('❌ Tabela não encontrada na lista de tabelas válidas:', tableName);
                console.log('📝 Tabelas válidas:', getAllAvailableTables());
                throw new Error(`Tabela não encontrada: ${tableName}`);
            }
            
            try {
                console.log(`🔍 Fazendo query na tabela: "${tableName}"`);
                
                // Primeiro, vamos verificar se a tabela existe fazendo uma query simples
                const { data, error, count } = await supabase
                    .from(tableName as any)
                    .select('*', { count: 'exact' });
                
                if (error) {
                    console.error("❌ Erro do Supabase:", error);
                    console.error("❌ Detalhes do erro:", {
                        message: error.message,
                        details: error.details,
                        hint: error.hint,
                        code: error.code
                    });
                    throw new Error(`Erro ao buscar dados: ${error.message}`);
                }
                
                console.log('📈 Dados brutos recebidos:', data);
                console.log('📏 Número total de registros:', count);
                console.log('📏 Número de registros no array:', data ? data.length : 0);
                
                if (!data || data.length === 0) {
                    console.log('⚠️ Nenhum dado encontrado para o agente:', selectedAgent);
                    console.log('📋 Tabela consultada:', tableName);
                    
                    // Vamos tentar uma query alternativa para verificar se há dados de mensagens básicas
                    console.log('🔄 Tentando buscar dados básicos de mensagens...');
                    const basicTableName = tableName.replace('Lista_mensagens_', 'Lista_de_Mensagens_');
                    console.log('🔄 Testando tabela alternativa:', basicTableName);
                    
                    const { data: basicData, error: basicError } = await supabase
                        .from(basicTableName as any)
                        .select('*', { count: 'exact' });
                    
                    if (basicData && basicData.length > 0) {
                        console.log('✅ Dados encontrados na tabela alternativa:', basicData.length);
                    } else {
                        console.log('❌ Nenhum dado na tabela alternativa também');
                    }
                    
                    return null;
                }
                
                if (data[0]) {
                    console.log('🗂️ Colunas disponíveis no primeiro registro:', Object.keys(data[0]));
                    console.log('📝 Sample dos primeiros 3 registros:', data.slice(0, 3));
                }
                
                const aggregatedData = aggregateAgentData(data);
                console.log('🔄 Dados agregados finais:', aggregatedData);
                
                return aggregatedData;
            } catch (err) {
                console.error('💥 Erro durante a execução da query:', err);
                throw err;
            }
        },
        enabled: !!selectedAgent,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};

export type { AgentData };
