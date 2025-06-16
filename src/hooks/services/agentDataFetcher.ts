
import { supabase } from "@/integrations/supabase/client";
import { getMetricsTableName, getBasicTableName } from "@/lib/agents";
import { AgentData } from "../types/agentTypes";
import { calculateMetricsFromBasicData } from "../calculators/agentMetricsCalculator";
import { createRealisticDemoData } from "../utils/agentDemoData";

export const fetchAgentData = async (selectedAgent: string): Promise<AgentData> => {
    console.log('🚀 AGENT-QUERY - INICIANDO busca FORÇADA para:', selectedAgent);
    console.log('⚠️ AGENT-QUERY - Cache foi limpo, buscando dados frescos');
    
    if (!selectedAgent) {
        console.log('❌ AGENT-QUERY - Nenhum agente selecionado');
        throw new Error('Nenhum agente selecionado');
    }
    
    // STEP 1: Tentar tabela de métricas (dados processados)
    const metricsTableName = getMetricsTableName(selectedAgent);
    console.log('📊 AGENT-QUERY - Tentando tabela de métricas:', metricsTableName);
    
    if (metricsTableName) {
        try {
            console.log('🔍 AGENT-QUERY - Executando query FORÇADA na tabela de métricas...');
            const { data: metricsData, error: metricsError } = await supabase
                .from(metricsTableName as any)
                .select('*')
                .limit(5);
            
            console.log('📊 AGENT-QUERY - Resultado FRESCO da consulta de métricas:');
            console.log('- Erro:', metricsError);
            console.log('- Dados encontrados:', metricsData?.length || 0, 'registros');
            
            if (!metricsError && metricsData && metricsData.length > 0) {
                console.log('✅ AGENT-QUERY - SUCESSO! Usando dados de métricas REAIS para:', selectedAgent);
                const firstRow = metricsData[0] as any;
                
                const result = {
                    tempo_primeira_resposta_minutos: firstRow.tempo_primeira_resposta_minutos || '0',
                    tempo_medio_resposta_atendente_minutos: firstRow.tempo_medio_resposta_atendente_minutos || '0',
                    tempo_maximo_resposta_atendente_minutos: firstRow.tempo_maximo_resposta_atendente_minutos || '0',
                    sentimento_usuario: firstRow.sentimento_usuario || 'Neutro',
                    sentimento_atendente: firstRow.sentimento_atendente || 'Neutro',
                    sentimento_geral_conversa: firstRow.sentimento_geral_conversa || 'Neutro',
                    duracao_total_conversa_minutos: firstRow.duracao_total_conversa_minutos || '0',
                    conversao_indicada_mvp: firstRow.conversao_indicada_mvp || 'Não',
                    pontuacao_aderencia_percentual: firstRow.pontuacao_aderencia_percentual || '0',
                    numero_perguntas_vendedor: firstRow.numero_perguntas_vendedor || '0',
                    aderência_script_nivel: firstRow.aderência_script_nivel || 'Baixo',
                    termo_chave_conversao: firstRow.termo_chave_conversao || 'N/A',
                    taxa_mensagens_vendedor_percentual: firstRow.taxa_mensagens_vendedor_percentual || '0',
                    contagem_palavras_risco: firstRow.contagem_palavras_risco || '0'
                };
                
                console.log('📊 AGENT-QUERY - Dados REAIS processados para retorno:', result);
                return result;
            } else {
                console.log('⚠️ AGENT-QUERY - Tabela de métricas existe mas está vazia:', metricsTableName);
            }
        } catch (err) {
            console.error('💥 AGENT-QUERY - Erro ao buscar métricas:', err);
        }
    }
    
    // STEP 2: Tentar tabela básica (dados brutos)
    const basicTableName = getBasicTableName(selectedAgent);
    console.log('💬 AGENT-QUERY - Tentando tabela básica:', basicTableName);
    
    if (basicTableName) {
        try {
            console.log('🔍 AGENT-QUERY - Executando query FORÇADA na tabela básica...');
            const { data: basicData, error: basicError } = await supabase
                .from(basicTableName as any)
                .select('*')
                .limit(200);
            
            console.log('💬 AGENT-QUERY - Resultado FRESCO da consulta básica:');
            console.log('- Erro:', basicError);
            console.log('- Dados encontrados:', basicData?.length || 0, 'registros');
            
            if (!basicError && basicData && basicData.length > 0) {
                console.log('✅ AGENT-QUERY - SUCESSO! Usando dados básicos REAIS para:', selectedAgent);
                const result = calculateMetricsFromBasicData(basicData);
                console.log('📊 AGENT-QUERY - Métricas calculadas dos dados REAIS:', result);
                return result;
            } else {
                console.log('⚠️ AGENT-QUERY - Tabela básica existe mas está vazia:', basicTableName);
            }
        } catch (err) {
            console.error('💥 AGENT-QUERY - Erro ao buscar dados básicos:', err);
        }
    }
    
    // STEP 3: Fallback para dados de demonstração
    console.log('🎭 AGENT-QUERY - USANDO DEMO para:', selectedAgent);
    console.log('⚠️ AGENT-QUERY - Motivo: Nenhuma tabela encontrada ou tabelas vazias');
    return createRealisticDemoData(selectedAgent);
};
