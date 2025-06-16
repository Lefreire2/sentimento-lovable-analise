
import { FunnelData, FunnelStepData } from "../types/funnelTypes";
import { createDemoFunnelData } from "../utils/funnelDemoData";

export const calculateFunnelFromMetrics = (conversations: any[]): FunnelData => {
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
