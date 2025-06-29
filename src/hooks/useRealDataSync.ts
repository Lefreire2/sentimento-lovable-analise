
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { agentTables } from '@/lib/agents';

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
}

export const useRealDataSync = () => {
  const [isSync, setIsSync] = useState(false);
  const [syncProgress, setSyncProgress] = useState<SyncProgress | null>(null);
  const [agentSummaries, setAgentSummaries] = useState<AgentDataSummary[]>([]);
  const { toast } = useToast();

  const validateAgentData = async (agentName: string, basicTable: string, metricsTable?: string) => {
    console.log(`🔍 SYNC - Validando dados para ${agentName}`);
    
    try {
      // Verificar tabela básica com tratamento de erro adequado
      const { data: basicData, error: basicError } = await supabase
        .from(basicTable as any)
        .select('remoteJid, Timestamp, message')
        .limit(10);

      if (basicError) {
        console.error(`❌ SYNC - Erro na tabela básica ${basicTable}:`, basicError);
        return {
          agentName,
          basicMessages: 0,
          metricsRecords: 0,
          uniqueLeads: 0,
          hasValidData: false,
          dataQuality: 'missing' as const,
          lastUpdate: new Date().toISOString()
        };
      }

      // Contar mensagens totais
      const { count: basicCount, error: countError } = await supabase
        .from(basicTable as any)
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.error(`❌ SYNC - Erro ao contar registros em ${basicTable}:`, countError);
        return {
          agentName,
          basicMessages: 0,
          metricsRecords: 0,
          uniqueLeads: 0,
          hasValidData: false,
          dataQuality: 'missing' as const,
          lastUpdate: new Date().toISOString()
        };
      }

      // Contar leads únicos - usando query mais genérica
      const { data: leadsData, error: leadsError } = await supabase
        .from(basicTable as any)
        .select('*')
        .limit(1000);

      if (leadsError) {
        console.error(`❌ SYNC - Erro ao buscar leads em ${basicTable}:`, leadsError);
        return {
          agentName,
          basicMessages: basicCount || 0,
          metricsRecords: 0,
          uniqueLeads: 0,
          hasValidData: basicCount ? basicCount > 0 : false,
          dataQuality: 'poor' as const,
          lastUpdate: new Date().toISOString()
        };
      }

      // Extrair leads únicos de forma mais robusta
      const uniqueLeads = leadsData ? 
        new Set(leadsData
          .map((row: any) => row.remoteJid || row.remotejid || row.remote_jid)
          .filter((jid: any) => jid && jid.trim() !== '' && jid !== 'null')
        ).size : 0;

      let metricsCount = 0;
      let hasMetrics = false;

      // Verificar tabela de métricas se existir
      if (metricsTable && metricsTable.trim() !== '') {
        const { count: metricsCountResult, error: metricsError } = await supabase
          .from(metricsTable as any)
          .select('*', { count: 'exact', head: true });

        if (!metricsError && metricsCountResult !== null) {
          metricsCount = metricsCountResult;
          hasMetrics = true;
        }
      }

      // Determinar qualidade dos dados
      let dataQuality: 'excellent' | 'good' | 'poor' | 'missing' = 'missing';
      
      if (basicCount && uniqueLeads > 0) {
        if (hasMetrics && metricsCount > 0) {
          dataQuality = 'excellent';
        } else if (uniqueLeads >= 50) {
          dataQuality = 'good';
        } else {
          dataQuality = 'poor';
        }
      }

      const summary: AgentDataSummary = {
        agentName,
        basicMessages: basicCount || 0,
        metricsRecords: metricsCount,
        uniqueLeads,
        hasValidData: dataQuality !== 'missing',
        dataQuality,
        lastUpdate: new Date().toISOString()
      };

      console.log(`✅ SYNC - Validação completa para ${agentName}:`, summary);
      return summary;

    } catch (error) {
      console.error(`💥 SYNC - Erro na validação de ${agentName}:`, error);
      return {
        agentName,
        basicMessages: 0,
        metricsRecords: 0,
        uniqueLeads: 0,
        hasValidData: false,
        dataQuality: 'missing' as const,
        lastUpdate: new Date().toISOString()
      };
    }
  };

  const syncAllAgentsData = useCallback(async () => {
    console.log('🚀 SYNC - Iniciando sincronização completa de dados reais');
    setIsSync(true);
    
    const allAgents = agentTables.map(table => {
      const agentName = table.replace('Lista_mensagens_', '').replace('_', ' ');
      const metricsTable = `Lista_mensagens_${table.replace('Lista_mensagens_', '')}`;
      return { agentName, basicTable: table, metricsTable };
    });

    setSyncProgress({
      currentAgent: '',
      totalAgents: allAgents.length,
      currentAgentIndex: 0,
      stage: 'preparing',
      errors: [],
      warnings: []
    });

    const summaries: AgentDataSummary[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    for (let i = 0; i < allAgents.length; i++) {
      const { agentName, basicTable, metricsTable } = allAgents[i];
      
      setSyncProgress(prev => prev ? {
        ...prev,
        currentAgent: agentName,
        currentAgentIndex: i + 1,
        stage: 'fetching'
      } : null);

      try {
        const summary = await validateAgentData(agentName, basicTable, metricsTable);
        summaries.push(summary);

        if (!summary.hasValidData) {
          warnings.push(`${agentName}: Sem dados válidos encontrados`);
        } else if (summary.dataQuality === 'poor') {
          warnings.push(`${agentName}: Qualidade de dados baixa (${summary.uniqueLeads} leads únicos)`);
        }

      } catch (error) {
        const errorMsg = `${agentName}: Erro na sincronização - ${error}`;
        errors.push(errorMsg);
        console.error(`❌ SYNC - ${errorMsg}`);
      }

      // Pequena pausa para não sobrecarregar o banco
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setAgentSummaries(summaries);
    
    setSyncProgress({
      currentAgent: '',
      totalAgents: allAgents.length,
      currentAgentIndex: allAgents.length,
      stage: 'complete',
      errors,
      warnings
    });

    // Estatísticas finais
    const validAgents = summaries.filter(s => s.hasValidData).length;
    const excellentData = summaries.filter(s => s.dataQuality === 'excellent').length;
    const totalLeads = summaries.reduce((sum, s) => sum + s.uniqueLeads, 0);
    const totalMessages = summaries.reduce((sum, s) => sum + s.basicMessages, 0);

    toast({
      title: "Sincronização Completa",
      description: `${validAgents}/${allAgents.length} agentes com dados válidos. ${excellentData} com métricas completas. ${totalLeads} leads únicos, ${totalMessages} mensagens processadas.`,
    });

    console.log('✅ SYNC - Sincronização completa:');
    console.log(`  - Agentes válidos: ${validAgents}/${allAgents.length}`);
    console.log(`  - Com métricas: ${excellentData}`);
    console.log(`  - Total de leads: ${totalLeads}`);
    console.log(`  - Total de mensagens: ${totalMessages}`);
    console.log(`  - Erros: ${errors.length}`);
    console.log(`  - Avisos: ${warnings.length}`);

    setIsSync(false);
  }, [toast]);

  const getDataQualityColor = (quality: AgentDataSummary['dataQuality']) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'poor': return 'text-yellow-600 bg-yellow-50';
      case 'missing': return 'text-red-600 bg-red-50';
    }
  };

  const getDataQualityLabel = (quality: AgentDataSummary['dataQuality']) => {
    switch (quality) {
      case 'excellent': return 'Excelente (com métricas)';
      case 'good': return 'Boa (só mensagens básicas)';
      case 'poor': return 'Pobre (poucos dados)';
      case 'missing': return 'Sem dados';
    }
  };

  return {
    isSync,
    syncProgress,
    agentSummaries,
    syncAllAgentsData,
    getDataQualityColor,
    getDataQualityLabel
  };
};
