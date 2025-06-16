
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
    console.log('🎭 FUNIL-DEMO - ATENÇÃO: Criando dados DEMO para:', agentName);
    console.log('⚠️ FUNIL-DEMO - Isso significa que não há dados reais disponíveis');
    
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
    console.log('📊 FUNIL-REAL - CALCULANDO com dados de MÉTRICAS REAIS:', conversations.length, 'conversas');
    
    if (conversations.length === 0) {
        console.log('⚠️ FUNIL-REAL - Nenhuma conversa encontrada nas métricas');
        return createDemoFunnelData('default');
    }

    const totalConversations = conversations.length;
    console.log('📊 FUNIL-REAL - Total de conversas REAIS para análise:', totalConversations);
    
    // Análise detalhada dos dados reais
    let leadRespondido = 0;
    let levantadaMao = 0;
    let apresentacaoOferta = 0;
    let confirmacaoLead = 0;
    let agendamentoConfirmado = 0;
    
    conversations.forEach((conv, index) => {
        if (index < 3) {
            console.log('📊 FUNIL-REAL - Amostra de conversa', index + 1, ':', {
                tempo_primeira_resposta: conv.tempo_primeira_resposta_minutos,
                sentimento_usuario: conv.sentimento_usuario,
                pontuacao_aderencia: conv.pontuacao_aderencia_percentual,
                sentimento_geral: conv.sentimento_geral_conversa,
                conversao_mvp: conv.conversao_indicada_mvp
            });
        }
        
        // Lead respondido - conversas onde houve primeira resposta rápida (< 15 min)
        const tempoResposta = parseFloat(conv.tempo_primeira_resposta_minutos || '999');
        if (tempoResposta < 15) {
            leadRespondido++;
        }
        
        // Levantada de mão - conversas com sentimento positivo do usuário
        if (conv.sentimento_usuario === 'Positivo' || conv.sentimento_usuario === 'positivo') {
            levantadaMao++;
        }
        
        // Apresentação oferta - conversas com alta aderência ao script (>60%)
        const pontuacao = parseFloat(conv.pontuacao_aderencia_percentual || '0');
        if (pontuacao > 60) {
            apresentacaoOferta++;
        }
        
        // Confirmação lead - conversas com sentimento geral positivo
        if (conv.sentimento_geral_conversa === 'Positivo' || conv.sentimento_geral_conversa === 'positivo') {
            confirmacaoLead++;
        }
        
        // Agendamento confirmado - conversas com conversão indicada
        if (conv.conversao_indicada_mvp === 'Sim' || conv.conversao_indicada_mvp === 'sim') {
            agendamentoConfirmado++;
        }
    });

    console.log('📊 FUNIL-REAL - Resultados FINAIS dos dados reais:');
    console.log('- Total de conversas:', totalConversations);
    console.log('- Leads respondidos (< 15min):', leadRespondido);
    console.log('- Levantadas de mão (sentimento positivo):', levantadaMao);
    console.log('- Apresentações de oferta (aderência > 60%):', apresentacaoOferta);
    console.log('- Confirmações de lead (sentimento geral positivo):', confirmacaoLead);
    console.log('- Agendamentos confirmados (conversão = Sim):', agendamentoConfirmado);

    const steps: FunnelStepData[] = [
        { name: "Lead Iniciado", value: totalConversations, color: "#3b82f6", description: "Conversas identificadas nos dados reais" },
        { name: "Lead Respondido", value: leadRespondido, color: "#06b6d4", description: "Resposta em até 15min (dados reais)" },
        { name: "Levantada de Mão", value: levantadaMao, color: "#10b981", description: "Sentimento usuário positivo (dados reais)" },
        { name: "Apresentação Oferta", value: apresentacaoOferta, color: "#f59e0b", description: "Aderência ao script > 60% (dados reais)" },
        { name: "Confirmação Lead", value: confirmacaoLead, color: "#ef4444", description: "Sentimento geral positivo (dados reais)" },
        { name: "Agendamento Confirmado", value: agendamentoConfirmado, color: "#8b5cf6", description: "Conversões confirmadas (dados reais)" }
    ];

    const conversionRate = totalConversations > 0 ? Math.round((agendamentoConfirmado / totalConversations) * 100) : 0;
    console.log('📊 FUNIL-REAL - Taxa de conversão REAL calculada:', conversionRate + '%');

    return { steps, conversionRate };
};

const calculateFunnelFromBasicMessages = (messages: any[]): FunnelData => {
    console.log('💬 FUNIL-BÁSICO - CALCULANDO com dados básicos REAIS:', messages.length, 'mensagens');
    
    if (messages.length === 0) {
        console.log('⚠️ FUNIL-BÁSICO - Nenhuma mensagem encontrada');
        return createDemoFunnelData('default');
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
    console.log('💬 FUNIL-BÁSICO - Conversas únicas REAIS identificadas:', totalLeads);
    
    // Análise baseada em engajamento real das conversas
    let leadRespondido = 0;
    let levantadaMao = 0;
    let apresentacaoOferta = 0;
    let confirmacaoLead = 0;
    let agendamentoConfirmado = 0;
    
    conversationData.forEach((data, jid) => {
        const messageCount = data.messages.length;
        
        // Lead respondido - pelo menos 2 mensagens (ida e volta)
        if (messageCount >= 2) {
            leadRespondido++;
        }
        
        // Levantada de mão - pelo menos 4 mensagens (engajamento inicial)
        if (messageCount >= 4) {
            levantadaMao++;
        }
        
        // Apresentação oferta - pelo menos 6 mensagens (conversa desenvolvida)
        if (messageCount >= 6) {
            apresentacaoOferta++;
        }
        
        // Confirmação lead - pelo menos 8 mensagens (conversa avançada)
        if (messageCount >= 8) {
            confirmacaoLead++;
        }
        
        // Agendamento confirmado - pelo menos 10 mensagens (conversa completa)
        if (messageCount >= 10) {
            agendamentoConfirmado++;
        }
    });
    
    console.log('💬 FUNIL-BÁSICO - Resultados dos dados básicos REAIS:');
    console.log('- Total de conversas:', totalLeads);
    console.log('- Leads respondidos (>=2 msgs):', leadRespondido);
    console.log('- Levantadas de mão (>=4 msgs):', levantadaMao);
    console.log('- Apresentações de oferta (>=6 msgs):', apresentacaoOferta);
    console.log('- Confirmações de lead (>=8 msgs):', confirmacaoLead);
    console.log('- Agendamentos confirmados (>=10 msgs):', agendamentoConfirmado);

    const steps: FunnelStepData[] = [
        { name: "Lead Iniciado", value: totalLeads, color: "#3b82f6", description: "Conversas iniciadas (dados básicos reais)" },
        { name: "Lead Respondido", value: leadRespondido, color: "#06b6d4", description: "Conversas com resposta (>=2 msgs)" },
        { name: "Levantada de Mão", value: levantadaMao, color: "#10b981", description: "Conversas com engajamento (>=4 msgs)" },
        { name: "Apresentação Oferta", value: apresentacaoOferta, color: "#f59e0b", description: "Conversas desenvolvidas (>=6 msgs)" },
        { name: "Confirmação Lead", value: confirmacaoLead, color: "#ef4444", description: "Conversas avançadas (>=8 msgs)" },
        { name: "Agendamento Confirmado", value: agendamentoConfirmado, color: "#8b5cf6", description: "Conversas completas (>=10 msgs)" }
    ];

    const conversionRate = totalLeads > 0 ? Math.round((agendamentoConfirmado / totalLeads) * 100) : 0;
    console.log('💬 FUNIL-BÁSICO - Taxa de conversão estimada dos dados REAIS:', conversionRate + '%');

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
            
            console.log('🔍 FUNIL - INICIANDO busca de dados REAIS para:', selectedAgent);
            console.log('🔄 FUNIL - Cache foi limpo, garantindo dados frescos');
            
            // STEP 1: Tentar tabela de métricas (dados mais detalhados)
            const metricsTableName = getMetricsTableName(selectedAgent);
            console.log('📊 FUNIL - Tentando tabela de métricas:', metricsTableName);
            
            if (metricsTableName) {
                try {
                    console.log('🔍 FUNIL - Executando query FORÇADA na tabela de métricas...');
                    const { data: metricsData, error: metricsError } = await supabase
                        .from(metricsTableName as any)
                        .select('*')
                        .limit(1000);
                    
                    console.log('📊 FUNIL - Resultado FRESCO da consulta de métricas:');
                    console.log('- Erro:', metricsError);
                    console.log('- Dados encontrados:', metricsData?.length || 0, 'registros');
                    
                    if (!metricsError && metricsData && metricsData.length > 0) {
                        console.log('✅ FUNIL - SUCESSO! Usando dados de métricas REAIS para:', selectedAgent);
                        return calculateFunnelFromMetrics(metricsData);
                    } else {
                        console.log('⚠️ FUNIL - Tabela de métricas vazia ou erro para:', selectedAgent);
                    }
                } catch (err) {
                    console.error('💥 FUNIL - Erro ao buscar métricas:', err);
                }
            }
            
            // STEP 2: Tentar tabela básica
            const basicTableName = getBasicTableName(selectedAgent);
            console.log('💬 FUNIL - Tentando tabela básica:', basicTableName);
            
            if (basicTableName) {
                try {
                    console.log('🔍 FUNIL - Executando query FORÇADA na tabela básica...');
                    const { data: basicData, error: basicError } = await supabase
                        .from(basicTableName as any)
                        .select('*')
                        .limit(1000);
                    
                    console.log('💬 FUNIL - Resultado FRESCO da consulta básica:');
                    console.log('- Erro:', basicError);
                    console.log('- Dados encontrados:', basicData?.length || 0, 'registros');
                    
                    if (!basicError && basicData && basicData.length > 0) {
                        console.log('✅ FUNIL - SUCESSO! Usando dados básicos REAIS para:', selectedAgent);
                        return calculateFunnelFromBasicMessages(basicData);
                    } else {
                        console.log('⚠️ FUNIL - Tabela básica vazia ou erro para:', selectedAgent);
                    }
                } catch (err) {
                    console.error('💥 FUNIL - Erro ao buscar dados básicos:', err);
                }
            }
            
            console.log('🎭 FUNIL - FALLBACK: Usando dados DEMO para:', selectedAgent);
            console.log('⚠️ FUNIL - Motivo: Nenhuma tabela encontrada ou todas vazias');
            return createDemoFunnelData(selectedAgent);
        },
        enabled: !!selectedAgent,
        retry: 1,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
        staleTime: 0, // Sempre buscar dados frescos
        gcTime: 0, // Não manter cache
    });

    const invalidateAndRefetch = async () => {
        console.log('🔄 FUNIL - Invalidando cache e recarregando dados FORÇADAMENTE para:', selectedAgent);
        await queryClient.invalidateQueries({ 
            queryKey: ['funnelData', selectedAgent] 
        });
        await queryClient.removeQueries({ 
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
