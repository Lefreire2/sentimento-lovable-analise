
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getMetricsTableName, getBasicTableName } from "@/lib/agents";

interface FunnelStepData {
    name: string;
    value: number;
    color: string;
    description: string;
}

interface FunnelData {
    steps: FunnelStepData[];
    conversionRate: number;
}

const createDemoFunnelData = (agentName: string): FunnelData => {
    console.log('🎭 FUNIL-DEMO - Criando dados de demonstração para:', agentName);
    
    const demoScenarios = {
        'André Araújo': {
            steps: [
                { name: "Lead Iniciado", value: 85, color: "#3b82f6", description: "Primeiro contato recebido" },
                { name: "Lead Respondido", value: 72, color: "#06b6d4", description: "Secretária respondeu ao lead" },
                { name: "Levantada de Mão", value: 58, color: "#10b981", description: "Lead demonstrou interesse" },
                { name: "Apresentação Oferta", value: 41, color: "#f59e0b", description: "Valores/detalhes apresentados" },
                { name: "Confirmação Lead", value: 28, color: "#ef4444", description: "Lead confirmou interesse" },
                { name: "Agendamento Confirmado", value: 19, color: "#8b5cf6", description: "Consulta agendada" }
            ],
            conversionRate: 22
        },
        default: {
            steps: [
                { name: "Lead Iniciado", value: 50, color: "#3b82f6", description: "Primeiro contato recebido" },
                { name: "Lead Respondido", value: 38, color: "#06b6d4", description: "Secretária respondeu ao lead" },
                { name: "Levantada de Mão", value: 28, color: "#10b981", description: "Lead demonstrou interesse" },
                { name: "Apresentação Oferta", value: 18, color: "#f59e0b", description: "Valores/detalhes apresentados" },
                { name: "Confirmação Lead", value: 12, color: "#ef4444", description: "Lead confirmou interesse" },
                { name: "Agendamento Confirmado", value: 8, color: "#8b5cf6", description: "Consulta agendada" }
            ],
            conversionRate: 16
        }
    };
    
    return demoScenarios[agentName as keyof typeof demoScenarios] || demoScenarios.default;
};

const calculateFunnelFromMetrics = (conversations: any[]): FunnelData => {
    console.log('📊 FUNIL - Calculando funil com dados de métricas:', conversations.length, 'conversas');
    
    if (conversations.length === 0) {
        console.log('⚠️ FUNIL - Nenhuma conversa encontrada nas métricas');
        return {
            steps: [
                { name: "Lead Iniciado", value: 0, color: "#3b82f6", description: "Primeiro contato recebido" },
                { name: "Lead Respondido", value: 0, color: "#06b6d4", description: "Secretária respondeu ao lead" },
                { name: "Levantada de Mão", value: 0, color: "#10b981", description: "Lead demonstrou interesse" },
                { name: "Apresentação Oferta", value: 0, color: "#f59e0b", description: "Valores/detalhes apresentados" },
                { name: "Confirmação Lead", value: 0, color: "#ef4444", description: "Lead confirmou interesse" },
                { name: "Agendamento Confirmado", value: 0, color: "#8b5cf6", description: "Consulta agendada" }
            ],
            conversionRate: 0
        };
    }

    const totalConversations = conversations.length;
    console.log('📊 FUNIL - Total de conversas para análise:', totalConversations);
    
    // Lead respondido - conversas onde houve primeira resposta rápida (< 15 min)
    const leadRespondido = conversations.filter(conv => {
        const tempoResposta = parseFloat(conv.tempo_primeira_resposta_minutos || '999');
        return tempoResposta < 15;
    }).length;
    console.log('📊 FUNIL - Leads respondidos (< 15min):', leadRespondido);
    
    // Levantada de mão - conversas com sentimento positivo do usuário
    const levantadaMao = conversations.filter(conv => 
        conv.sentimento_usuario === 'Positivo' || conv.sentimento_usuario === 'positivo'
    ).length;
    console.log('📊 FUNIL - Levantadas de mão (sentimento positivo):', levantadaMao);
    
    // Apresentação oferta - conversas com alta aderência ao script (>60%)
    const apresentacaoOferta = conversations.filter(conv => {
        const pontuacao = parseFloat(conv.pontuacao_aderencia_percentual || '0');
        return pontuacao > 60;
    }).length;
    console.log('📊 FUNIL - Apresentações de oferta (aderência > 60%):', apresentacaoOferta);
    
    // Confirmação lead - conversas com sentimento geral positivo
    const confirmacaoLead = conversations.filter(conv => 
        conv.sentimento_geral_conversa === 'Positivo' || conv.sentimento_geral_conversa === 'positivo'
    ).length;
    console.log('📊 FUNIL - Confirmações de lead (sentimento geral positivo):', confirmacaoLead);
    
    // Agendamento confirmado - conversas com conversão indicada
    const agendamentoConfirmado = conversations.filter(conv => 
        conv.conversao_indicada_mvp === 'Sim' || conv.conversao_indicada_mvp === 'sim'
    ).length;
    console.log('📊 FUNIL - Agendamentos confirmados (conversão = Sim):', agendamentoConfirmado);

    const steps: FunnelStepData[] = [
        { name: "Lead Iniciado", value: totalConversations, color: "#3b82f6", description: "Primeiro contato recebido" },
        { name: "Lead Respondido", value: leadRespondido, color: "#06b6d4", description: "Secretária respondeu em até 15min" },
        { name: "Levantada de Mão", value: levantadaMao, color: "#10b981", description: "Lead com sentimento positivo" },
        { name: "Apresentação Oferta", value: apresentacaoOferta, color: "#f59e0b", description: "Aderência ao script > 60%" },
        { name: "Confirmação Lead", value: confirmacaoLead, color: "#ef4444", description: "Sentimento geral positivo" },
        { name: "Agendamento Confirmado", value: agendamentoConfirmado, color: "#8b5cf6", description: "Conversões confirmadas" }
    ];

    const conversionRate = totalConversations > 0 ? Math.round((agendamentoConfirmado / totalConversations) * 100) : 0;
    console.log('📊 FUNIL - Taxa de conversão calculada:', conversionRate + '%');

    return { steps, conversionRate };
};

const calculateFunnelFromBasicMessages = (messages: any[]): FunnelData => {
    console.log('💬 FUNIL - Calculando funil com dados básicos:', messages.length, 'mensagens');
    
    if (messages.length === 0) {
        console.log('⚠️ FUNIL - Nenhuma mensagem encontrada');
        return {
            steps: [
                { name: "Lead Iniciado", value: 0, color: "#3b82f6", description: "Primeiro contato recebido" },
                { name: "Lead Respondido", value: 0, color: "#06b6d4", description: "Secretária respondeu ao lead" },
                { name: "Levantada de Mão", value: 0, color: "#10b981", description: "Lead demonstrou interesse" },
                { name: "Apresentação Oferta", value: 0, color: "#f59e0b", description: "Valores/detalhes apresentados" },
                { name: "Confirmação Lead", value: 0, color: "#ef4444", description: "Lead confirmou interesse" },
                { name: "Agendamento Confirmado", value: 0, color: "#8b5cf6", description: "Consulta agendada" }
            ],
            conversionRate: 0
        };
    }

    // Analisar conversas únicas baseadas no remoteJid
    const uniqueConversations = new Set();
    const conversationData = new Map();
    
    messages.forEach(msg => {
        const jid = msg.remoteJid || msg.nome || 'unknown';
        uniqueConversations.add(jid);
        
        if (!conversationData.has(jid)) {
            conversationData.set(jid, {
                messages: [],
                firstMessage: msg.Timestamp || msg.timestamp,
            });
        }
        conversationData.get(jid).messages.push(msg);
    });
    
    const totalLeads = uniqueConversations.size;
    console.log('💬 FUNIL - Conversas únicas identificadas:', totalLeads);
    
    // Estimativas baseadas na análise das mensagens
    let leadRespondido = 0;
    let levantadaMao = 0;
    let apresentacaoOferta = 0;
    let confirmacaoLead = 0;
    let agendamentoConfirmado = 0;
    
    conversationData.forEach((data, jid) => {
        const messageCount = data.messages.length;
        const hasMultipleMessages = messageCount > 1;
        
        if (hasMultipleMessages) {
            leadRespondido++;
        }
        
        // Verificar se há interesse baseado no número de mensagens
        if (messageCount >= 3) {
            levantadaMao++;
        }
        
        if (messageCount >= 5) {
            apresentacaoOferta++;
        }
        
        if (messageCount >= 7) {
            confirmacaoLead++;
        }
        
        if (messageCount >= 10) {
            agendamentoConfirmado++;
        }
    });
    
    console.log('💬 FUNIL - Leads respondidos:', leadRespondido);
    console.log('💬 FUNIL - Levantadas de mão:', levantadaMao);
    console.log('💬 FUNIL - Apresentações de oferta:', apresentacaoOferta);
    console.log('💬 FUNIL - Confirmações de lead:', confirmacaoLead);
    console.log('💬 FUNIL - Agendamentos confirmados:', agendamentoConfirmado);

    const steps: FunnelStepData[] = [
        { name: "Lead Iniciado", value: totalLeads, color: "#3b82f6", description: "Conversas iniciadas" },
        { name: "Lead Respondido", value: leadRespondido, color: "#06b6d4", description: "Conversas com resposta" },
        { name: "Levantada de Mão", value: levantadaMao, color: "#10b981", description: "Conversas com engajamento" },
        { name: "Apresentação Oferta", value: apresentacaoOferta, color: "#f59e0b", description: "Conversas desenvolvidas" },
        { name: "Confirmação Lead", value: confirmacaoLead, color: "#ef4444", description: "Conversas avançadas" },
        { name: "Agendamento Confirmado", value: agendamentoConfirmado, color: "#8b5cf6", description: "Conversas longas" }
    ];

    const conversionRate = totalLeads > 0 ? Math.round((agendamentoConfirmado / totalLeads) * 100) : 0;
    console.log('💬 FUNIL - Taxa de conversão estimada:', conversionRate + '%');

    return { steps, conversionRate };
};

export const useFunnelData = (selectedAgent: string) => {
    const queryClient = useQueryClient();
    
    const query = useQuery<FunnelData>({
        queryKey: ['funnelData', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) {
                console.log('❌ FUNIL - Nenhum agente selecionado');
                return createDemoFunnelData('default');
            }
            
            console.log('🔍 FUNIL - Iniciando busca de dados reais para agente:', selectedAgent);
            
            // Primeiro, tentar tabela de métricas (dados mais detalhados)
            const metricsTableName = getMetricsTableName(selectedAgent);
            console.log('📊 FUNIL - Tentando tabela de métricas:', metricsTableName);
            
            if (metricsTableName) {
                try {
                    const { data: metricsData, error: metricsError } = await supabase
                        .from(metricsTableName as any)
                        .select('*')
                        .limit(1000);
                    
                    console.log('📊 FUNIL - Resultado da consulta de métricas:');
                    console.log('- Erro:', metricsError);
                    console.log('- Dados encontrados:', metricsData?.length || 0, 'registros');
                    
                    if (!metricsError && metricsData && metricsData.length > 0) {
                        console.log('✅ FUNIL - Usando dados de métricas para cálculo do funil');
                        return calculateFunnelFromMetrics(metricsData);
                    }
                } catch (err) {
                    console.error('💥 FUNIL - Erro ao buscar métricas:', err);
                }
            }
            
            // Se não encontrou métricas, tentar tabela básica
            const basicTableName = getBasicTableName(selectedAgent);
            console.log('💬 FUNIL - Tentando tabela básica:', basicTableName);
            
            if (basicTableName) {
                try {
                    const { data: basicData, error: basicError } = await supabase
                        .from(basicTableName as any)
                        .select('*')
                        .limit(1000);
                    
                    console.log('💬 FUNIL - Resultado da consulta básica:');
                    console.log('- Erro:', basicError);
                    console.log('- Dados encontrados:', basicData?.length || 0, 'registros');
                    
                    if (!basicError && basicData && basicData.length > 0) {
                        console.log('✅ FUNIL - Usando dados básicos para cálculo do funil');
                        return calculateFunnelFromBasicMessages(basicData);
                    }
                } catch (err) {
                    console.error('💥 FUNIL - Erro ao buscar dados básicos:', err);
                }
            }
            
            console.log('🎭 FUNIL - Retornando dados de demonstração para:', selectedAgent);
            return createDemoFunnelData(selectedAgent);
        },
        enabled: !!selectedAgent,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });

    const invalidateAndRefetch = async () => {
        console.log('🔄 FUNIL - Invalidando cache e recarregando dados para:', selectedAgent);
        await queryClient.invalidateQueries({ 
            queryKey: ['funnelData', selectedAgent] 
        });
        return query.refetch();
    };

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: invalidateAndRefetch,
        isFetching: query.isFetching
    };
};
