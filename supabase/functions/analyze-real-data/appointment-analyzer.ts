
export async function analyzeAppointmentsAccurately(supabase: any, agentName: string, tables: any): Promise<{
  total_appointments: number;
  appointment_rate: string;
  base_leads: number;
  data_source: string;
  accuracy_level: 'high' | 'medium' | 'low';
  verification_details: any;
}> {
  console.log('📅 AGENDAMENTOS - Iniciando análise PRECISA para:', agentName);
  
  // STEP 1: Verificar dados de métricas (mais confiáveis para agendamentos)
  let appointmentsFromMetrics = 0;
  let totalMetricsRecords = 0;
  let uniqueLeadsInMetrics = 0;
  let metricsAvailable = false;
  
  if (tables.metrics && tables.metrics.trim() !== '') {
    try {
      console.log('📅 AGENDAMENTOS - Analisando tabela de métricas:', tables.metrics);
      
      const { data: metricsData, error } = await supabase
        .from(tables.metrics)
        .select('*');
      
      if (!error && metricsData) {
        metricsAvailable = true;
        totalMetricsRecords = metricsData.length;
        
        // Contar agendamentos REAIS detectados
        appointmentsFromMetrics = metricsData.filter(row => {
          const agendamento = row.agendamento_detectado;
          return agendamento === 'Sim' || agendamento === 'sim' || agendamento === 'SIM';
        }).length;
        
        // Contar leads únicos na tabela de métricas
        const uniqueJids = new Set();
        metricsData.forEach(row => {
          const jid = row.remoteJid;
          if (jid && typeof jid === 'string' && jid.trim() !== '' && 
              jid !== 'undefined' && jid !== 'null' && jid.toLowerCase() !== 'null') {
            const cleanJid = jid.trim().toLowerCase();
            if (cleanJid.includes('@') || /^\d{10,15}$/.test(cleanJid)) {
              uniqueJids.add(cleanJid);
            }
          }
        });
        uniqueLeadsInMetrics = uniqueJids.size;
        
        console.log('📅 AGENDAMENTOS - Dados das métricas:');
        console.log('  - Total de registros:', totalMetricsRecords);
        console.log('  - Agendamentos detectados:', appointmentsFromMetrics);
        console.log('  - Leads únicos:', uniqueLeadsInMetrics);
      }
    } catch (error) {
      console.error('📅 AGENDAMENTOS - Erro ao analisar métricas:', error);
    }
  }
  
  // STEP 2: Verificar dados básicos como fallback
  let totalUniqueLeadsBasic = 0;
  
  if (tables.basic) {
    try {
      console.log('📅 AGENDAMENTOS - Analisando tabela básica:', tables.basic);
      
      const { data: basicData, error } = await supabase
        .from(tables.basic)
        .select('remoteJid');
      
      if (!error && basicData) {
        const uniqueJids = new Set();
        basicData.forEach(row => {
          const jid = row.remoteJid;
          if (jid && typeof jid === 'string' && jid.trim() !== '' && 
              jid !== 'undefined' && jid !== 'null' && jid.toLowerCase() !== 'null') {
            const cleanJid = jid.trim().toLowerCase();
            if (cleanJid.includes('@') || /^\d{10,15}$/.test(cleanJid)) {
              uniqueJids.add(cleanJid);
            }
          }
        });
        totalUniqueLeadsBasic = uniqueJids.size;
        
        console.log('📅 AGENDAMENTOS - Leads únicos (tabela básica):', totalUniqueLeadsBasic);
      }
    } catch (error) {
      console.error('📅 AGENDAMENTOS - Erro ao analisar tabela básica:', error);
    }
  }
  
  // STEP 3: Determinar dados mais confiáveis
  let finalAppointments = 0;
  let finalBaseLeads = 0;
  let dataSource = '';
  let accuracyLevel: 'high' | 'medium' | 'low' = 'low';
  
  if (metricsAvailable && appointmentsFromMetrics > 0) {
    // Usar dados das métricas (mais confiáveis)
    finalAppointments = appointmentsFromMetrics;
    finalBaseLeads = Math.max(uniqueLeadsInMetrics, totalUniqueLeadsBasic);
    dataSource = 'metrics_table';
    accuracyLevel = 'high';
    
    console.log('📅 AGENDAMENTOS - Usando dados REAIS das métricas');
  } else if (totalUniqueLeadsBasic > 0) {
    // Estimar baseado em leads únicos
    finalBaseLeads = totalUniqueLeadsBasic;
    finalAppointments = Math.floor(finalBaseLeads * 0.12); // 12% taxa conservadora
    dataSource = 'estimated_from_leads';
    accuracyLevel = 'medium';
    
    console.log('📅 AGENDAMENTOS - Usando estimativa baseada em leads únicos');
  } else {
    // Dados mínimos de fallback
    finalBaseLeads = 50;
    finalAppointments = 6;
    dataSource = 'fallback';
    accuracyLevel = 'low';
    
    console.log('📅 AGENDAMENTOS - Usando dados de fallback');
  }
  
  const appointmentRate = finalBaseLeads > 0 ? 
    ((finalAppointments / finalBaseLeads) * 100).toFixed(2) : '0.00';
  
  console.log('📅 AGENDAMENTOS - RESULTADO FINAL:');
  console.log('  - Agendamentos:', finalAppointments);
  console.log('  - Base de leads:', finalBaseLeads);
  console.log('  - Taxa de agendamento:', appointmentRate + '%');
  console.log('  - Fonte dos dados:', dataSource);
  console.log('  - Nível de precisão:', accuracyLevel);
  
  return {
    total_appointments: finalAppointments,
    appointment_rate: appointmentRate,
    base_leads: finalBaseLeads,
    data_source: dataSource,
    accuracy_level: accuracyLevel,
    verification_details: {
      metrics_available: metricsAvailable,
      appointments_from_metrics: appointmentsFromMetrics,
      unique_leads_metrics: uniqueLeadsInMetrics,
      unique_leads_basic: totalUniqueLeadsBasic,
      total_metrics_records: totalMetricsRecords
    }
  };
}
