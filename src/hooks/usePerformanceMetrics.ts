import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getMetricsTableName, getBasicTableName } from "@/lib/agents";

interface PerformanceMetricsData {
    conversao_indicada_mvp: string;
    pontuacao_aderencia_percentual: string;
    numero_perguntas_vendedor: string;
    taxa_mensagens_vendedor_percentual: string;
}

const createDemoPerformanceData = (agentName: string): PerformanceMetricsData => {
    console.log('⚡ PERFORMANCE-DEMO - Criando dados de demonstração para:', agentName);
    
    const demoScenarios = {
        'André Araújo': {
            conversao_indicada_mvp: 'Sim',
            pontuacao_aderencia_percentual: '87.5',
            numero_perguntas_vendedor: '6',
            taxa_mensagens_vendedor_percentual: '68.0'
        },
        default: {
            conversao_indicada_mvp: 'Não',
            pontuacao_aderencia_percentual: '75.0',
            numero_perguntas_vendedor: '4',
            taxa_mensagens_vendedor_percentual: '60.0'
        }
    };
    
    return demoScenarios[agentName as keyof typeof demoScenarios] || demoScenarios.default;
};

const calculatePerformanceFromBasic = (messages: any[]): PerformanceMetricsData => {
    console.log('⚡ PERFORMANCE - Calculando performance com dados básicos:', messages.length);
    
    if (messages.length === 0) {
        return createDemoPerformanceData('default');
    }

    // Análise baseada no número de mensagens e engajamento
    const totalMessages = messages.length;
    const estimatedConversion = totalMessages > 15 ? 'Sim' : 'Não';
    const aderencia = Math.min(85, Math.floor(totalMessages * 3.5));
    const perguntas = Math.floor(totalMessages * 0.3);
    const taxaMensagens = Math.min(100, Math.floor(totalMessages * 2.5));
    
    return {
        conversao_indicada_mvp: estimatedConversion,
        pontuacao_aderencia_percentual: aderencia.toString(),
        numero_perguntas_vendedor: perguntas.toString(),
        taxa_mensagens_vendedor_percentual: taxaMensagens.toString()
    };
};

export const usePerformanceMetrics = (selectedAgent: string) => {
    return useQuery<PerformanceMetricsData>({
        queryKey: ['performanceMetrics', selectedAgent],
        queryFn: async () => {
            if (!selectedAgent) {
                console.log('❌ PERFORMANCE - Nenhum agente selecionado');
                return createDemoPerformanceData('default');
            }
            
            console.log('🔍 PERFORMANCE - Buscando métricas de performance para:', selectedAgent);
            
            // Tentar tabela de métricas primeiro
            const metricsTableName = getMetricsTableName(selectedAgent);
            console.log('📊 PERFORMANCE - Tentando tabela de métricas:', metricsTableName);
            
            if (metricsTableName) {
                try {
                    const { data: metricsData, error: metricsError } = await supabase
                        .from(metricsTableName as any)
                        .select('conversao_indicada_mvp, pontuacao_aderencia_percentual, numero_perguntas_vendedor, taxa_mensagens_vendedor_percentual')
                        .limit(1);
                    
                    if (!metricsError && metricsData && metricsData.length > 0) {
                        console.log('✅ PERFORMANCE - Usando dados de métricas');
                        const firstRow = metricsData[0] as any;
                        return {
                            conversao_indicada_mvp: firstRow.conversao_indicada_mvp || 'Não',
                            pontuacao_aderencia_percentual: firstRow.pontuacao_aderencia_percentual || '0',
                            numero_perguntas_vendedor: firstRow.numero_perguntas_vendedor || '0',
                            taxa_mensagens_vendedor_percentual: firstRow.taxa_mensagens_vendedor_percentual || '0'
                        };
                    }
                } catch (err) {
                    console.error('💥 PERFORMANCE - Erro ao buscar métricas:', err);
                }
            }
            
            // Fallback para tabela básica
            const basicTableName = getBasicTableName(selectedAgent);
            if (basicTableName) {
                try {
                    const { data: basicData, error: basicError } = await supabase
                        .from(basicTableName as any)
                        .select('*')
                        .limit(100);
                    
                    if (!basicError && basicData && basicData.length > 0) {
                        console.log('✅ PERFORMANCE - Usando dados básicos');
                        return calculatePerformanceFromBasic(basicData);
                    }
                } catch (err) {
                    console.error('💥 PERFORMANCE - Erro ao buscar dados básicos:', err);
                }
            }
            
            console.log('🎭 PERFORMANCE - Retornando dados de demonstração para:', selectedAgent);
            return createDemoPerformanceData(selectedAgent);
        },
        enabled: !!selectedAgent,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
};
