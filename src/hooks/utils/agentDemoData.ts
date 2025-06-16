
import { AgentData } from "../types/agentTypes";

export const createRealisticDemoData = (agentName: string): AgentData => {
    console.log('🎭 DEMO - ATENÇÃO: Criando dados DEMO para:', agentName);
    console.log('⚠️ DEMO - Se você está vendo esta mensagem, significa que não há dados reais no banco');
    
    const demoScenarios = {
        'André Araújo': {
            tempo_primeira_resposta_minutos: '1.8',
            tempo_medio_resposta_atendente_minutos: '3.2',
            tempo_maximo_resposta_atendente_minutos: '8.5',
            sentimento_usuario: 'Positivo',
            sentimento_atendente: 'Positivo',
            sentimento_geral_conversa: 'Positivo',
            duracao_total_conversa_minutos: '28.5',
            conversao_indicada_mvp: 'Sim',
            pontuacao_aderencia_percentual: '87.5',
            numero_perguntas_vendedor: '6',
            aderência_script_nivel: 'Alto',
            termo_chave_conversao: 'oferta especial',
            taxa_mensagens_vendedor_percentual: '68.0',
            contagem_palavras_risco: '1'
        },
        default: {
            tempo_primeira_resposta_minutos: '2.1',
            tempo_medio_resposta_atendente_minutos: '4.0',
            tempo_maximo_resposta_atendente_minutos: '12.0',
            sentimento_usuario: 'Neutro',
            sentimento_atendente: 'Positivo',
            sentimento_geral_conversa: 'Neutro',
            duracao_total_conversa_minutos: '35.0',
            conversao_indicada_mvp: 'Não',
            pontuacao_aderencia_percentual: '75.0',
            numero_perguntas_vendedor: '4',
            aderência_script_nivel: 'Médio',
            termo_chave_conversao: 'informações',
            taxa_mensagens_vendedor_percentual: '60.0',
            contagem_palavras_risco: '2'
        }
    };
    
    return demoScenarios[agentName as keyof typeof demoScenarios] || demoScenarios.default;
};
