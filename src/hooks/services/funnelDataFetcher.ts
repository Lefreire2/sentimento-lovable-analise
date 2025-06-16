
import { supabase } from "@/integrations/supabase/client";
import { getMetricsTableName, getBasicTableName } from "@/lib/agents";
import { FunnelData } from "../types/funnelTypes";
import { calculateFunnelFromMetrics } from "../calculators/funnelMetricsCalculator";
import { calculateFunnelFromBasicMessages } from "../calculators/funnelBasicCalculator";
import { createDemoFunnelData } from "../utils/funnelDemoData";

export const fetchFunnelData = async (selectedAgent: string): Promise<FunnelData> => {
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
};
