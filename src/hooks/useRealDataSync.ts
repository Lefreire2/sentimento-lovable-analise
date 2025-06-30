import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getMetricsTableName, getBasicTableName } from '@/lib/agents';

interface SyncProgress {
  currentAgent: string;
  totalAgents: number;
  currentAgentIndex: number;
  stage: 'preparing' | 'fetching' | 'processing' | 'validating' | 'complete';
  errors: string[];
  warnings: string[];
}

interface AgentDataSummary {
  agentName: string;
  basicMessages: number;
  metricsRecords: number;
  uniqueLeads: number;
  hasValidData: boolean;
  dataQuality: 'excellent' | 'good' | 'poor' | 'missing';
  lastUpdate: string;
  tableStatus: {
    basicTable: string;
    metricsTable: string;
    basicExists: boolean;
    metricsExists: boolean;
    basicEmpty: boolean;
    metricsEmpty: boolean;
    basicError?: string;
    metricsError?: string;
  };
}

// Lista completa de agentes baseada nos dados reais das tabelas (31 agentes)
const AGENT_NAMES = [
  'André Araújo',
  'Adiney Esteves', 
  'Alana Meneses',
  'Aline Bigatão',
  'Aline Franzotti',
  'Amanda Mota',
  'Ana Beatriz',
  'Carlos Antunes',
  'Danilo Chammas',
  'Diego Cabrejos',
  'Haila',
  'Henrique Maffei',
  'Jorge Mendes',
  'Julia Jorge',
  'Karla Fazollo',
  'Karla Resende',
  'Luiza Murad',
  'Marcelo Soeiro',
  'Marco Antonio',
  'Mariana Araújo',
  'Michelle Meleck',
  'Patricia Lima',
  'Rachel Carmo',
  'Raiany Pimentel',
  'Roberta Xavier',
  'Roberto Pigini',
  'Roclides Lima',
  'Rodrigo Pastore',
  'Samuel Nolasco',
  'Silvia Joly',
  'Stefanie Lee'
];

export const useRealDataSync = () => {
  const [isSync, setIsSync] = useState(false);
  const [syncProgress, setSyncProgress] = useState<SyncProgress | null>(null);
  const [agentSummaries, setAgentSummaries] = useState<AgentDataSummary[]>([]);
  const { toast } = useToast();

  const validateTableExists = async (tableName: string): Promise<{ exists: boolean; error?: string }> => {
    try {
      console.log(`🔍 SYNC - Verificando existência da tabela: ${tableName}`);
      const { error } = await supabase
        .from(tableName as any)
        .select('*', { count: 'exact', head: true })
        .limit(1);
      
      if (error) {
        console.log(`❌ SYNC - Tabela ${tableName} não existe:`, error.message);
        return { exists: false, error: error.message };
      }
      
      console.log(`✅ SYNC - Tabela ${tableName} existe`);
      return { exists: true };
    } catch (error: any) {
      console.error(`💥 SYNC - Erro crítico ao verificar tabela ${tableName}:`, error);
      return { exists: false, error: error.message };
    }
  };

  const checkTableEmpty = async (tableName: string): Promise<{ count: number; empty: boolean; error?: string }> => {
    try {
      console.log(`📊 SYNC - Verificando se tabela ${tableName} tem dados...`);
      const { count, error } = await supabase
        .from(tableName as any)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ SYNC - Erro ao verificar dados da tabela ${tableName}:`, error.message);
        return { count: 0, empty: true, error: error.message };
      }
      
      const isEmpty = (count === 0);
      console.log(`📊 SYNC - Tabela ${tableName}: ${count} registros (${isEmpty ? 'VAZIA' : 'COM DADOS'})`);
      return { count: count || 0, empty: isEmpty };
    } catch (error: any) {
      console.error(`💥 SYNC - Erro crítico ao verificar dados da tabela ${tableName}:`, error);
      return { count: 0, empty: true, error: error.message };
    }
  };

  const validateAgentData = async (agentName: string): Promise<AgentDataSummary> => {
    console.log(`🎯 SYNC - INICIANDO validação completa para: ${agentName}`);
    
    // Obter nomes das tabelas usando as funções corretas
    const basicTableName = getBasicTableName(agentName);
    const metricsTableName = getMetricsTableName(agentName);
    
    console.log(`📊 SYNC - Tabelas mapeadas para ${agentName}:`);
    console.log(`  - Básica: ${basicTableName}`);
    console.log(`  - Métricas: ${metricsTableName}`);
    
    // Inicializar status das tabelas
    const tableStatus = {
      basicTable: basicTableName || 'N/A',
      metricsTable: metricsTableName || 'N/A',
      basicExists: false,
      metricsExists: false,
      basicEmpty: true,
      metricsEmpty: true,
      basicError: undefined as string | undefined,
      metricsError: undefined as string | undefined
    };

    let basicMessages = 0;
    let metricsRecords = 0;
    let uniqueLeads = 0;
    let hasValidData = false;

    // Verificar tabela básica
    if (basicTableName) {
      console.log(`🔍 SYNC - Validando tabela básica: ${basicTableName}`);
      const basicExistsResult = await validateTableExists(basicTableName);
      tableStatus.basicExists = basicExistsResult.exists;
      tableStatus.basicError = basicExistsResult.error;

      if (basicExistsResult.exists) {
        const basicDataResult = await checkTableEmpty(basicTableName);
        tableStatus.basicEmpty = basicDataResult.empty;
        basicMessages = basicDataResult.count;
        
        if (!basicDataResult.empty && basicMessages > 0) {
          // Buscar amostra para contar leads únicos
          try {
            const { data: sampleData, error: sampleError } = await supabase
              .from(basicTableName as any)
              .select('remoteJid')
              .limit(500);

            if (!sampleError && sampleData) {
              const uniqueJids = new Set(
                sampleData
                  .map((row: any) => row.remoteJid)
                  .filter((jid: any) => jid && jid.trim() !== '' && jid !== 'null')
              );
              uniqueLeads = uniqueJids.size;
              hasValidData = basicMessages > 0 && uniqueLeads > 0;
              console.log(`✅ SYNC - Leads únicos encontrados: ${uniqueLeads}`);
            }
          } catch (error) {
            console.error(`💥 SYNC - Erro ao buscar amostra de leads:`, error);
          }
        }
      }
    }

    // Verificar tabela de métricas
    if (metricsTableName) {
      console.log(`🔍 SYNC - Validando tabela de métricas: ${metricsTableName}`);
      const metricsExistsResult = await validateTableExists(metricsTableName);
      tableStatus.metricsExists = metricsExistsResult.exists;
      tableStatus.metricsError = metricsExistsResult.error;

      if (metricsExistsResult.exists) {
        const metricsDataResult = await checkTableEmpty(metricsTableName);
        tableStatus.metricsEmpty = metricsDataResult.empty;
        metricsRecords = metricsDataResult.count;
      }
    }

    // Determinar qualidade dos dados
    let dataQuality: 'excellent' | 'good' | 'poor' | 'missing' = 'missing';
    
    if (hasValidData) {
      if (metricsRecords > 0) {
        dataQuality = 'excellent';
      } else if (uniqueLeads >= 10) {
        dataQuality = 'good';
      } else {
        dataQuality = 'poor';
      }
    } else if (tableStatus.basicExists || tableStatus.metricsExists) {
      // Tabelas existem mas não têm dados válidos
      dataQuality = 'missing';
    }

    const summary: AgentDataSummary = {
      agentName,
      basicMessages,
      metricsRecords,
      uniqueLeads,
      hasValidData,
      dataQuality,
      lastUpdate: new Date().toISOString(),
      tableStatus
    };

    console.log(`✅ SYNC - Validação completa para ${agentName}:`, summary);
    return summary;
  };

  const syncAllAgentsData = useCallback(async () => {
    console.log('🚀 SYNC - INICIANDO sincronização completa de todos os agentes');
    console.log(`📋 SYNC - Total de agentes para processar: ${AGENT_NAMES.length}`);
    
    setIsSync(true);
    
    setSyncProgress({
      currentAgent: '',
      totalAgents: AGENT_NAMES.length,
      currentAgentIndex: 0,
      stage: 'preparing',
      errors: [],
      warnings: []
    });

    const summaries: AgentDataSummary[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    for (let i = 0; i < AGENT_NAMES.length; i++) {
      const agentName = AGENT_NAMES[i];
      
      setSyncProgress(prev => prev ? {
        ...prev,
        currentAgent: agentName,
        currentAgentIndex: i + 1,
        stage: 'validating'
      } : null);

      try {
        console.log(`🎯 SYNC - Processando agente ${i + 1}/${AGENT_NAMES.length}: ${agentName}`);
        
        const summary = await validateAgentData(agentName);
        summaries.push(summary);

        // Gerar avisos específicos baseado no status
        if (!summary.tableStatus.basicExists && !summary.tableStatus.metricsExists) {
          errors.push(`${agentName}: Tabelas não encontradas no banco de dados`);
        } else if (summary.tableStatus.basicExists && summary.tableStatus.metricsExists) {
          if (summary.tableStatus.basicEmpty && summary.tableStatus.metricsEmpty) {
            warnings.push(`${agentName}: Tabelas existem mas ambas estão vazias - dados não foram importados`);
          } else if (summary.tableStatus.basicEmpty && !summary.tableStatus.metricsEmpty) {
            warnings.push(`${agentName}: Tabela básica vazia, mas métricas disponíveis`);
          } else if (!summary.tableStatus.basicEmpty && summary.tableStatus.metricsEmpty) {
            warnings.push(`${agentName}: Dados básicos disponíveis, mas tabela de métricas vazia`);
          }
        } else if (summary.tableStatus.basicExists && !summary.tableStatus.metricsExists) {
          warnings.push(`${agentName}: Apenas tabela básica encontrada - tabela de métricas não existe`);
        } else if (!summary.tableStatus.basicExists && summary.tableStatus.metricsExists) {
          warnings.push(`${agentName}: Apenas tabela de métricas encontrada - tabela básica não existe`);
        }

        // Pausa pequena para não sobrecarregar o banco
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error: any) {
        const errorMsg = `${agentName}: Erro crítico na sincronização - ${error.message}`;
        errors.push(errorMsg);
        console.error(`❌ SYNC - ${errorMsg}`);
        
        // Adicionar um summary com erro para manter consistência
        summaries.push({
          agentName,
          basicMessages: 0,
          metricsRecords: 0,
          uniqueLeads: 0,
          hasValidData: false,
          dataQuality: 'missing',
          lastUpdate: new Date().toISOString(),
          tableStatus: {
            basicTable: 'ERRO',
            metricsTable: 'ERRO',
            basicExists: false,
            metricsExists: false,
            basicEmpty: true,
            metricsEmpty: true,
            basicError: error.message,
            metricsError: error.message
          }
        });
      }
    }

    setAgentSummaries(summaries);
    
    setSyncProgress({
      currentAgent: '',
      totalAgents: AGENT_NAMES.length,
      currentAgentIndex: AGENT_NAMES.length,
      stage: 'complete',
      errors,
      warnings
    });

    // Calcular estatísticas finais
    const validAgents = summaries.filter(s => s.hasValidData).length;
    const excellentData = summaries.filter(s => s.dataQuality === 'excellent').length;
    const goodData = summaries.filter(s => s.dataQuality === 'good').length;
    const poorData = summaries.filter(s => s.dataQuality === 'poor').length;
    const emptyTables = summaries.filter(s => 
      (s.tableStatus.basicExists && s.tableStatus.basicEmpty) || 
      (s.tableStatus.metricsExists && s.tableStatus.metricsEmpty)
    ).length;
    const totalLeads = summaries.reduce((sum, s) => sum + s.uniqueLeads, 0);
    const totalMessages = summaries.reduce((sum, s) => sum + s.basicMessages, 0);
    const totalMetrics = summaries.reduce((sum, s) => sum + s.metricsRecords, 0);

    console.log('🎯 SYNC - RELATÓRIO FINAL DE SINCRONIZAÇÃO (DADOS REAIS):');
    console.log(`📊 Total de agentes processados: ${AGENT_NAMES.length}`);
    console.log(`✅ Agentes com dados válidos: ${validAgents}`);
    console.log(`🥇 Qualidade excelente (com métricas): ${excellentData}`);
    console.log(`🥈 Qualidade boa (dados básicos): ${goodData}`);
    console.log(`🥉 Qualidade pobre (poucos dados): ${poorData}`);
    console.log(`📭 Tabelas vazias: ${emptyTables}`);
    console.log(`👥 Total de leads únicos: ${totalLeads.toLocaleString()}`);
    console.log(`💬 Total de mensagens: ${totalMessages.toLocaleString()}`);
    console.log(`📈 Total de métricas: ${totalMetrics.toLocaleString()}`);
    console.log(`⚠️ Erros críticos: ${errors.length}`);
    console.log(`🔔 Avisos de atenção: ${warnings.length}`);

    // Toast com informações relevantes
    if (emptyTables > 0) {
      toast({
        title: "Sincronização Completa com Avisos",
        description: `${validAgents}/${AGENT_NAMES.length} agentes com dados. ${emptyTables} agentes têm tabelas vazias (dados não importados).`,
        variant: "default"
      });
    } else {
      toast({
        title: "Sincronização Completa",
        description: `${validAgents}/${AGENT_NAMES.length} agentes com dados válidos. ${totalLeads.toLocaleString()} leads processados.`,
      });
    }

    setIsSync(false);
  }, [toast]);

  const getDataQualityColor = (quality: AgentDataSummary['dataQuality']) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'poor': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'missing': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getDataQualityLabel = (quality: AgentDataSummary['dataQuality']) => {
    switch (quality) {
      case 'excellent': return 'Excelente (com métricas)';
      case 'good': return 'Boa (dados básicos)';
      case 'poor': return 'Limitada (poucos dados)';
      case 'missing': return 'Sem dados válidos';
    }
  };

  return {
    isSync,
    syncProgress,
    agentSummaries,
    syncAllAgentsData,
    getDataQualityColor,
    getDataQualityLabel,
    totalAgents: AGENT_NAMES.length
  };
};
