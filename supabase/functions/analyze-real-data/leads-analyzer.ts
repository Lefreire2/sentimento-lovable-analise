
export async function analyzeUniqueLeads(supabase: any, basicTableName: string): Promise<number> {
  console.log('📊 Analisando leads únicos por remoteJid para:', basicTableName);
  
  try {
    // Primeiro, vamos pegar uma amostra para entender o formato dos dados
    const { data: sampleData, error: sampleError } = await supabase
      .from(basicTableName)
      .select('remoteJid')
      .limit(10);

    if (sampleError) {
      console.error('Erro ao buscar amostra:', sampleError);
      return 0;
    }

    console.log('📊 Amostra de dados:', sampleData?.slice(0, 3));

    // Buscar TODOS os remoteJid sem limite para capturar a base completa
    const { data: allData, error } = await supabase
      .from(basicTableName)
      .select('remoteJid');

    if (error) {
      console.error('Erro ao buscar remoteJids:', error);
      return 0;
    }

    console.log('📊 Total de registros encontrados na tabela:', allData?.length);

    // Filtrar e contar remoteJids únicos válidos
    const uniqueJids = new Set();
    let validCount = 0;
    let invalidCount = 0;
    
    allData?.forEach(row => {
      const jid = row.remoteJid;
      
      // Verificar se o JID é válido
      if (jid && 
          typeof jid === 'string' && 
          jid.trim() !== '' && 
          jid !== 'undefined' && 
          jid !== 'null' &&
          jid.toLowerCase() !== 'null') {
        
        // Limpar e normalizar o JID
        const cleanJid = jid.trim().toLowerCase();
        
        // Verificar formato válido: deve conter @ (WhatsApp) ou ser apenas números
        if (cleanJid.includes('@') || /^\d{10,15}$/.test(cleanJid)) {
          uniqueJids.add(cleanJid);
          validCount++;
        } else {
          invalidCount++;
        }
      } else {
        invalidCount++;
      }
    });

    console.log('📊 Estatísticas detalhadas de análise:');
    console.log('  - Tabela analisada:', basicTableName);
    console.log('  - Total de registros na tabela:', allData?.length);
    console.log('  - JIDs válidos encontrados:', validCount);
    console.log('  - JIDs inválidos/nulos:', invalidCount);
    console.log('  - Leads únicos identificados:', uniqueJids.size);
    console.log('📊 Primeiros 5 JIDs únicos:', Array.from(uniqueJids).slice(0, 5));
    
    // Garantir que retornamos o número correto de leads únicos
    const finalUniqueLeads = uniqueJids.size;
    console.log('✅ RESULTADO FINAL - Leads únicos confirmados:', finalUniqueLeads);
    
    return finalUniqueLeads;
  } catch (error) {
    console.error('Erro na análise de leads únicos:', error);
    return 0;
  }
}
