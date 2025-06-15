
// Tabelas de métricas agregadas (dados processados)
export const metricsAgentTables = [
    'Lista_mensagens_Adiney_esteves',
    'Lista_mensagens_Alana_meneses',
    'Lista_mensagens_Aline_bigatão',
    'Lista_mensagens_Aline_franzotti',
    'Lista_mensagens_Amanda',
    'Lista_mensagens_Ana_beatriz',
    'Lista_mensagens_Andre_araujo',
    'Lista_mensagens_ Carlos_Antunes',
    'Lista_mensagens_Danilo_Chammas',
    'Lista_mensagens_Diego_cabrejos',
    'Lista_mensagens_Haila',
    'Lista_mensagens_Henrique_maffei',
    'Lista_mensagens_Julia_jorge',
    'Lista_mensagens_Karla_fazollo',
    'Lista_mensagens_Karla_resende',
    'Lista_mensagens_Luiza_murad',
    'Lista_mensagens_Marcelo_soeiro',
    'Lista_mensagens_Marco_antonio',
    'Lista_mensagens_Mariana_araújo',
    'Lista_mensagens_Michelle_Meleck',
    'Lista_mensagens_Patricia_lima',
    'Lista_mensagens_Raiany_pimentel',
    'Lista_mensagens_Roberta_xavier',
    'Lista_mensagens_Roberto_pigini',
    'Lista_mensagens_Roclides_lima',
    'Lista_mensagens_Rodrigo_pastore',
    'Lista_mensagens_Silvia_Joly',
    'Lista_mensagens_Stefanie_lee'
].sort();

// Tabelas básicas de mensagens (dados brutos)
export const basicMessageTables = [
    'Lista_de_Mensagens_Adiney_esteves',
    'Lista_de_Mensagens_Alana_meneses',
    'Lista_de_Mensagens_Aline_bigatão',
    'Lista_de_Mensagens_Aline_franzotti',
    'Lista_de_Mensagens_Amanda',
    'Lista_de_Mensagens_Ana_beatriz',
    'Lista_de_Mensagens_Andre_araujo',
    'Lista_de_Mensagens_ Carlos_Antunes',
    'Lista_de_Mensagens_Danilo_Chammas',
    'Lista_de_Mensagens_Diego_cabrejos',
    'Lista_de_Mensagens_Haila',
    'Lista_de_Mensagens_Henrique_maffei',
    'Lista_de_Mensagens_Julia_jorge',
    'Lista_de_Mensagens_Karla_fazollo',
    'Lista_de_Mensagens_Karla_resende',
    'Lista_de_Mensagens_Luiza_murad',
    'Lista_de_Mensagens_Marcelo_soeiro',
    'Lista_de_Mensagens_Marco_antonio',
    'Lista_de_Mensagens_Mariana_araújo',
    'Lista_de_Mensagens_Michelle_Meleck',
    'Lista_de_Mensagens_Patricia_lima',
    'Lista_de_Mensagens_Raiany_pimentel',
    'Lista_de_Mensagens_Roberta_xavier',
    'Lista_de_Mensagens_Roberto_pigini',
    'Lista_de_Mensagens_Roclides_lima',
    'Lista_de_Mensagens_Rodrigo_pastore',
    'Lista_de_Mensagens_Silvia_Joly',
    'Lista_de_Mensagens_Stefanie_lee'
].sort();

// Lista principal de agentes (usa as tabelas de métricas como principal)
export const agentTables = metricsAgentTables;

export const formatAgentName = (tableName: string) => {
    const name = tableName
        .replace('Lista_mensagens_', '')
        .replace('Lista_de_Mensagens_', '')
        .replace(/_/g, ' ')
        .trim();
    
    // Capitalize each word
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const getMetricsTableName = (formattedName: string): string => {
    console.log('🔍 Convertendo nome formatado para tabela de métricas:', formattedName);
    
    // Converter nome formatado de volta para formato de tabela
    const tableFormat = formattedName
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/[áàâã]/g, 'a')
        .replace(/[éèê]/g, 'e')
        .replace(/[íìî]/g, 'i')
        .replace(/[óòôõ]/g, 'o')
        .replace(/[úùû]/g, 'u')
        .replace(/[ç]/g, 'c');
    
    const metricsTable = `Lista_mensagens_${tableFormat}`;
    console.log('📊 Tabela de métricas gerada:', metricsTable);
    
    // Verificar se a tabela existe na lista
    const foundTable = metricsAgentTables.find(table => 
        table.toLowerCase() === metricsTable.toLowerCase()
    );
    
    if (foundTable) {
        console.log('✅ Tabela encontrada na lista:', foundTable);
        return foundTable;
    }
    
    console.log('❌ Tabela não encontrada, tentando variações...');
    
    // Tentar encontrar por nome parcial
    const partialMatch = metricsAgentTables.find(table => {
        const tableName = table.replace('Lista_mensagens_', '').toLowerCase();
        const searchName = tableFormat.toLowerCase();
        return tableName.includes(searchName) || searchName.includes(tableName);
    });
    
    if (partialMatch) {
        console.log('✅ Encontrada correspondência parcial:', partialMatch);
        return partialMatch;
    }
    
    console.log('❌ Nenhuma tabela encontrada para:', formattedName);
    return metricsTable; // Retorna o nome gerado mesmo se não encontrado
};

export const getBasicTableName = (formattedName: string): string => {
    console.log('🔍 Convertendo nome formatado para tabela básica:', formattedName);
    
    const tableFormat = formattedName
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/[áàâã]/g, 'a')
        .replace(/[éèê]/g, 'e')
        .replace(/[íìî]/g, 'i')
        .replace(/[óòôõ]/g, 'o')
        .replace(/[úùû]/g, 'u')
        .replace(/[ç]/g, 'c');
    
    const basicTable = `Lista_de_Mensagens_${tableFormat}`;
    console.log('💬 Tabela básica gerada:', basicTable);
    
    const foundTable = basicMessageTables.find(table => 
        table.toLowerCase() === basicTable.toLowerCase()
    );
    
    if (foundTable) {
        console.log('✅ Tabela básica encontrada:', foundTable);
        return foundTable;
    }
    
    // Tentar encontrar por nome parcial
    const partialMatch = basicMessageTables.find(table => {
        const tableName = table.replace('Lista_de_Mensagens_', '').toLowerCase();
        const searchName = tableFormat.toLowerCase();
        return tableName.includes(searchName) || searchName.includes(tableName);
    });
    
    if (partialMatch) {
        console.log('✅ Encontrada correspondência parcial básica:', partialMatch);
        return partialMatch;
    }
    
    return basicTable;
};

// Função para verificar se tabela existe
export const isValidTableName = (tableName: string): boolean => {
    return metricsAgentTables.includes(tableName) || basicMessageTables.includes(tableName);
};

// Função para listar todas as tabelas disponíveis
export const getAllAvailableTables = (): string[] => {
    return [...metricsAgentTables, ...basicMessageTables];
};
