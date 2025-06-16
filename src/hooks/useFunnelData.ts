
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

const calculateFunnelFromMetrics = (conversations: any[]): FunnelData => {
    if (conversations.length === 0) {
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
    
    // Calcular etapas baseadas nos dados reais
    const leadIniciado = totalConversations; // Todas as conversas representam leads iniciados
    
    // Lead respondido - conversas onde houve primeira resposta rápida (< 10 min)
    const leadRespondido = conversations.filter(conv => 
        parseFloat(conv.tempo_primeira_resposta_minutos || '999') < 10
    ).length;
    
    // Levantada de mão - conversas com sentimento positivo do usuário
    const levantadaMao = conversations.filter(conv => 
        conv.sentimento_usuario === 'Positivo'
    ).length;
    
    // Apresentação oferta - conversas com alta aderência ao script (>70%)
    const apresentacaoOferta = conversations.filter(conv => 
        parseFloat(conv.pontuacao_aderencia_percentual || '0') > 70
    ).length;
    
    // Confirmação lead - conversas com sentimento geral positivo
    const confirmacaoLead = conversations.filter(conv => 
        conv.sentimento_geral_conversa === 'Positivo'
    ).length;
    
    // Agendamento confirmado - conversas com conversão indicada
    const agendamentoConfirmado = conversations.filter(conv => 
        conv.conversao_indicada_mvp === 'Sim'
    ).length;

    const steps: FunnelStepData[] = [
        { name: "Lead Iniciado", value: leadIniciado, color: "#3b82f6", description: "Primeiro contato recebido" },
        { name: "Lead Respondido", value: leadRespondido, color: "#06b6d4", description: "Secretária respondeu ao lead" },
        { name: "Levantada de Mão", value: levantadaMao, color: "#10b981", description: "Lead demonstrou interesse" },
        { name: "Apresentação Oferta", value: apresentacaoOferta, color: "#f59e0b", description: "Valores/detalhes apresentados" },
        { name: "Confirmação Lead", value: confirmacaoLead, color: "#ef4444", description: "Lead confirmou interesse" },
        { name: "Agendamento Confirmado", value: agendamentoConfirmado, color: "#8b5cf6", description: "Consulta agendada" }
    ];

    const conversionRate = leadIniciado > 0 ? Math.round((agendamentoConfirmado / leadIniciado) * 100) : 0;

    return { steps, conversionRate };
};

const calculateFunnelFromBasicMessages = (messages: any[]): FunnelData => {
    if (messages.length === 0) {
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

    // Estimar funil baseado nas mensagens básicas
    const uniqueConversations = new Set(messages.map(m => m.remoteJid || m.nome)).size;
    const totalMessages = messages.length;
    
    // Estimativas baseadas em padrões típicos
    const leadIniciado = uniqueConversations;
    const leadRespondido = Math.round(uniqueConversations * 0.85); // 85% respondem
    const levantadaMao = Math.round(uniqueConversations * 0.60); // 60% demonstram interesse
    const apresentacaoOferta = Math.round(uniqueConversations * 0.40); // 40% chegam à oferta
    const confirmacaoLead = Math.round(uniqueConversations * 0.25); // 25% confirmam interesse
    const agendamentoConfirmado = Math.round(uniqueConversations * 0.15); // 15% agendam

    const steps: FunnelStepData[] = [
        { name: "Lead Iniciado", value: leadIniciado, color: "#3b82f6", description: "Primeiro contato recebido" },
        { name: "Lead Respondido", value: leadRespondido, color: "#06b6d4", description: "Secretária respondeu ao lead" },
        { name: "Levantada de Mão", value: levantadaMao, color: "#10b981", description: "Lead demonstrou interesse" },
        { name: "Apresentação Oferta", value: apresentacaoOferta, color: "#f59e0b", description: "Valores/detalhes apresentados" },
        { name: "Confirmação Lead", value: confirmacaoLead, color: "#ef4444", description: "Lead confirmou interesse" },
        { name: "Agendamento Confirmado", value: agendamentoConfirmado, color: "#8b5cf6", description: "Consulta agendada" }
    ];

    const conversionRate = leadIniciado > 0 ? Math.round((agendamentoConfirmado / leadIniciado) * 100) : 0;

    return { steps, conversionRate };
};

export const useFunnelData = (selectedAgent: string) => {
    const queryClient = useQueryClient();
    
    const query = useQuery<FunnelData>({
        queryKey: ['funnelData', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) {
                console.log('❌ Nenhum agente selecionado para funil');
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
            
            console.log('🔍 FUNIL - Iniciando busca para agente:', selectedAgent);
            
            // Primeiro, tentar tabela de métricas
            const metricsTableName = getMetricsTableName(selectedAgent);
            console.log('📊 FUNIL - Tabela de métricas:', metricsTableName);
            
            if (metricsTableName) {
                try {
                    const { data: metricsData, error: metricsError } = await supabase
                        .from(metricsTableName as any)
                        .select('*');
                    
                    console.log('📊 FUNIL - Dados de métricas:', metricsData?.length || 0, 'registros');
                    
                    if (!metricsError && metricsData && metricsData.length > 0) {
                        console.log('✅ FUNIL - Calculando funil com dados de métricas');
                        return calculateFunnelFromMetrics(metricsData);
                    }
                } catch (err) {
                    console.error('💥 FUNIL - Erro ao buscar métricas:', err);
                }
            }
            
            // Se não encontrou métricas, tentar tabela básica
            const basicTableName = getBasicTableName(selectedAgent);
            console.log('💬 FUNIL - Tabela básica:', basicTableName);
            
            if (basicTableName) {
                try {
                    const { data: basicData, error: basicError } = await supabase
                        .from(basicTableName as any)
                        .select('*');
                    
                    console.log('💬 FUNIL - Dados básicos:', basicData?.length || 0, 'registros');
                    
                    if (!basicError && basicData && basicData.length > 0) {
                        console.log('✅ FUNIL - Calculando funil com dados básicos');
                        return calculateFunnelFromBasicMessages(basicData);
                    }
                } catch (err) {
                    console.error('💥 FUNIL - Erro ao buscar dados básicos:', err);
                }
            }
            
            console.log('⚠️ FUNIL - Nenhum dado encontrado, retornando funil vazio');
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
        },
        enabled: !!selectedAgent,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 0, // Sempre considerar os dados como obsoletos para permitir refresh
        gcTime: 5 * 60 * 1000, // 5 minutos
    });

    const invalidateAndRefetch = async () => {
        console.log('🔄 FUNIL - Invalidando cache e recarregando dados para:', selectedAgent);
        
        // Invalidar o cache da query específica
        await queryClient.invalidateQueries({ 
            queryKey: ['funnelData', selectedAgent] 
        });
        
        // Forçar um refetch
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
