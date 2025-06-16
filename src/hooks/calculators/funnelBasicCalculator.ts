
import { FunnelData, FunnelStepData } from "../types/funnelTypes";
import { createDemoFunnelData } from "../utils/funnelDemoData";

export const calculateFunnelFromBasicMessages = (messages: any[]): FunnelData => {
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
