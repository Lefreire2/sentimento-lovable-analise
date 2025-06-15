
// Tabelas de métricas agregadas (dados processados)
export const metricsAgentTables = [
    'Lista_mensagens_Adiney_esteves',
    'Lista_mensagens_Alana_meneses',
    'Lista_mensagens_Aline_bigatão',
    'Lista_mensagens_Aline_franzotti',
    'Lista_mensagens_Amanda_Mota',
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

// Lista principal de agentes
export const agentTables = metricsAgentTables;

export const formatAgentName = (tableName: string) => {
    console.log('🎯 Formatando nome da tabela:', tableName);
    
    const name = tableName
        .replace('Lista_mensagens_', '')
        .replace('Lista_de_Mensagens_', '')
        .replace(/_/g, ' ')
        .trim();
    
    // Capitalize each word
    const formatted = name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    console.log('✅ Nome formatado:', formatted);
    return formatted;
};

export const getMetricsTableName = (formattedName: string): string => {
    console.log('🔍 Buscando tabela de métricas para:', formattedName);
    
    // Busca direta por correspondência exata no nome formatado
    const exactMatch = metricsAgentTables.find(table => {
        const tableFormatted = formatAgentName(table);
        const isMatch = tableFormatted.toLowerCase() === formattedName.toLowerCase();
        console.log(`📋 Comparando: "${tableFormatted}" === "${formattedName}" = ${isMatch}`);
        return isMatch;
    });
    
    if (exactMatch) {
        console.log('✅ Correspondência exata encontrada:', exactMatch);
        return exactMatch;
    }
    
    console.log('❌ Nenhuma correspondência exata encontrada para métricas');
    
    // Fallback - retorna a primeira tabela como exemplo
    return metricsAgentTables[0];
};

export const getBasicTableName = (formattedName: string): string => {
    console.log('🔍 Buscando tabela básica para:', formattedName);
    
    // Busca direta por correspondência exata no nome formatado
    const exactMatch = basicMessageTables.find(table => {
        const tableFormatted = formatAgentName(table);
        const isMatch = tableFormatted.toLowerCase() === formattedName.toLowerCase();
        console.log(`📋 Comparando básica: "${tableFormatted}" === "${formattedName}" = ${isMatch}`);
        return isMatch;
    });
    
    if (exactMatch) {
        console.log('✅ Correspondência exata básica encontrada:', exactMatch);
        return exactMatch;
    }
    
    console.log('❌ Nenhuma correspondência exata encontrada para básica');
    
    // Fallback - retorna a primeira tabela como exemplo
    return basicMessageTables[0];
};

// Função para verificar se tabela existe
export const isValidTableName = (tableName: string): boolean => {
    return metricsAgentTables.includes(tableName) || basicMessageTables.includes(tableName);
};

// Função para listar todas as tabelas disponíveis
export const getAllAvailableTables = (): string[] => {
    return [...metricsAgentTables, ...basicMessageTables];
};
