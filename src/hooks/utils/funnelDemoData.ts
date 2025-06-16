
import { FunnelData } from "../types/funnelTypes";

export const createDemoFunnelData = (agentName: string): FunnelData => {
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
