
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
  };
}

// Lista completa de agentes baseada na imagem fornecida
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
  'Raiany Pimentel',
  'Roberta Xavier',
  'Roberto Pigini',
  'Roclides Lima',
  'Rodrigo Pastore',
  'Silvia Joly',
  'Stefanie Lee'
];

export const useRealDataSync = () => {
  const [isSync, setIsSync] = useState(false);
  const [syncProgress, setSyncProgress] = useState<SyncProgress | null>(null);
  const [agentSummaries, setAgentSummaries] = useState<AgentDataSummary[]>([]);
  const { toast } = useToast();

  const validateTableExists = async (tableName: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from(tableName as any)
        .select('*', { count: 'exact', head: true })
        .limit(1);
      
      return !error;
    } catch (error) {
      console.error(`❌ SYNC - Erro ao verificar tabela ${tableName}:`, error);
      return false;
    }
  };

  const validateAgentData = async (agentName: string): Promise<AgentDataSummary> => {
    console.log(`🔍 SYNC - Validando dados para ${agentName}`);
    
    // Obter nomes das tabelas usando as funções corretas
    const basicTableName = getBasicTableName(agentName);
    const metricsTableName = getMetricsTableName(agentName);
    
    console.log(`📊 SYNC - Tabelas para ${agentName}:`);
    console.log(`  - Básica: ${basicTableName}`);
    console.log(`  - Métricas: ${metricsTableName}`);
    
    // Verificar se as tabelas existem
    const basicExists = basicTableName ? await validateTableExists(basicTableName) : false;
    const metricsExists = metricsTableName ? await validateTableExists(metricsTableName) : false;
    
    console.log(`✅ SYNC - Existência das tabelas para ${agentName}:`);
    console.log(`  - Básica (${basicTableName}): ${basicExists ? '✅' : '❌'}`);
    console.log(`  - Métricas (${metricsTableName}): ${metricsExists ? '✅' : '❌'}`);

    let basicMessages = 0;
    let metricsRecords = 0;
    let uniqueLeads = 0;
    let hasValidData = false;

    // Processar tabela básica se existir
    if (basicExists && basicTableName) {
      try {
        console.log(`📊 SYNC - Processando tabela básica: ${basicTableName}`);
        
        // Contar mensagens totais
        const { count: basicCount, error: countError } = await supabase
          .from(basicTableName as any)
          .select('*', { count: 'exact', head: true });

        if (!countError && basicCount !== null) {
          basicMessages = basicCount;
          console.log(`✅ SYNC - Mensagens básicas encontradas: ${basicMessages}`);
        }

        // Buscar dados para contar leads únicos
        const { data: leadsData, error: leadsError } = await supabase
          .from(basicTableName as any)
          .select('*')
          .limit(1000);

        if (!leadsError && leadsData) {
          // Extrair leads únicos de forma robusta
          const uniqueJids = new Set(leadsData
            .map((row: any) => row.remoteJid || row.remotejid || row.remote_jid)
            .filter((jid: any) => jid && jid.trim() !== '' && jid !== 'null')
          );
          
          uniqueLeads = uniqueJids.size;
          console.log(`✅ SYNC - Leads únicos encontrados: ${uniqueLeads}`);
        }

        hasValidData = basicMessages > 0 && uniqueLeads > 0;
      } catch (error) {
        console.error(`❌ SYNC - Erro ao processar tabela básica ${basicTableName}:`, error);
      }
    }

    // Processar tabela de métricas se existir
    if (metricsExists && metricsTableName) {
      try {
        console.log(`📊 SYNC - Processando tabela de métricas: ${metricsTableName}`);
        
        const { count: metricsCount, error: metricsError } = await supabase
          .from(metricsTableName as any)
          .select('*', { count: 'exact', head: true });

        if (!metricsError && metricsCount !== null) {
          metricsRecords = metricsCount;
          console.log(`✅ SYNC - Registros de métricas encontrados: ${metricsRecords}`);
        }
      } catch (error) {
        console.error(`❌ SYNC - Erro ao processar tabela de métricas ${metricsTableName}:`, error);
      }
    }

    // Determinar qualidade dos dados
    let dataQuality: 'excellent' | 'good' | 'poor' | 'missing' = 'missing';
    
    if (hasValidData) {
      if (metricsRecords > 0) {
        dataQuality = 'excellent';
      } else if (uniqueLeads >= 50) {
        dataQuality = 'good';
      } else {
        dataQuality = 'poor';
      }
    }

    const summary: AgentDataSummary = {
      agentName,
      basicMessages,
      metricsRecords,
      uniqueLeads,
      hasValidData,
      dataQuality,
      lastUpdate: new Date().toISOString(),
      tableStatus: {
        basicTable: basicTableName || 'N/A',
        metricsTable: metricsTableName || 'N/A',
        basicExists,
        metricsExists
      }
    };

    console.log(`✅ SYNC - Validação completa para ${agentName}:`, summary);
    return summary;
  };

  const syncAllAgentsData = useCallback(async () => {
    console.log('🚀 SYNC - Iniciando sincronização completa de dados reais');
    console.log(`📋 SYNC - Total de agentes a processar: ${AGENT_NAMES.length}`);
    
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
        stage: 'fetching'
      } : null);

      try {
        console.log(`🎯 SYNC - Processando agente ${i + 1}/${AGENT_NAMES.length}: ${agentName}`);
        
        const summary = await validateAgentData(agentName);
        summaries.push(summary);

        // Gerar avisos baseados no status
        if (!summary.tableStatus.basicExists && !summary.tableStatus.metricsExists) {
          warnings.push(`${agentName}: Nenhuma tabela encontrada no banco de dados`);
        } else if (!summary.hasValidData) {
          warnings.push(`${agentName}: Tabelas existem mas não contêm dados válidos`);
        } else if (summary.dataQuality === 'poor') {
          warnings.push(`${agentName}: Qualidade de dados baixa (${summary.uniqueLeads} leads únicos)`);
        }

        // Pausa pequena para não sobrecarregar o banco
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        const errorMsg = `${agentName}: Erro na sincronização - ${error}`;
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
            metricsExists: false
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
    const totalLeads = summaries.reduce((sum, s) => sum + s.uniqueLeads, 0);
    const totalMessages = summaries.reduce((sum, s) => sum + s.basicMessages, 0);
    const totalMetrics = summaries.reduce((sum, s) => sum + s.metricsRecords, 0);

    console.log('✅ SYNC - Sincronização completa - ESTATÍSTICAS FINAIS:');
    console.log(`📊 Agentes processados: ${AGENT_NAMES.length}`);
    console.log(`✅ Agentes com dados válidos: ${validAgents}`);
    console.log(`🥇 Qualidade excelente: ${excellentData}`);
    console.log(`🥈 Qualidade boa: ${goodData}`);
    console.log(`🥉 Qualidade pobre: ${poorData}`);
    console.log(`👥 Total de leads únicos: ${totalLeads.toLocaleString()}`);
    console.log(`💬 Total de mensagens: ${totalMessages.toLocaleString()}`);
    console.log(`📈 Total de métricas: ${totalMetrics.toLocaleString()}`);
    console.log(`⚠️ Erros: ${errors.length}`);
    console.log(`🔔 Avisos: ${warnings.length}`);

    toast({
      title: "Sincronização Completa",
      description: `${validAgents}/${AGENT_NAMES.length} agentes com dados válidos. ${excellentData} excelentes, ${goodData} bons, ${poorData} pobres. ${totalLeads.toLocaleString()} leads, ${totalMessages.toLocaleString()} mensagens.`,
    });

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
      case 'missing': return 'Sem dados';
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
