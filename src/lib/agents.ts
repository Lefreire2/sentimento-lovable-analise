
// Tabelas de métricas agregadas (dados processados) - nomes exatos do banco
export const metricsAgentTables = [
    'Lista_mensagens_ Carlos_Antunes',
    'Lista_mensagens_Adiney_esteves',
    'Lista_mensagens_Alana_meneses',
    'Lista_mensagens_Aline_bigatão',
    'Lista_mensagens_Aline_franzotti',
    'Lista_mensagens_Amanda_Mota',
    'Lista_mensagens_Ana_beatriz',
    'Lista_mensagens_Andre_araujo',
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

// Tabelas básicas de mensagens (dados brutos) - nomes exatos do banco
export const basicMessageTables = [
    'Lista_de_Mensagens_Adiney_esteves',
    'Lista_de_Mensagens_Alana_meneses',
    'Lista_de_Mensagens_Aline_bigatão',
    'Lista_de_Mensagens_Aline_franzotti',
    'Lista_de_Mensagens_Amanda_Mota',
    'Lista_de_Mensagens_Ana_beatriz',
    'Lista_de_Mensagens_Andre_araujo',
    'Lista_de_Mensagens_ Carlos_Antunes', // Note o espaço antes de Carlos
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
    'Lista_de_Mensagens_Roberta_Xavier', // Corrigido Xavier com X maiúsculo
    'Lista_de_Mensagens_Roberto_pigini',
    'Lista_de_Mensagens_Roclides_lima',
    'Lista_de_Mensagens_Rodrigo_Pastore', // Corrigido Pastore com P maiúsculo
    'Lista_de_Mensagens_Silvia_Joly',
    'Lista_de_Mensagens_Stefanie_lee'
].sort();

// Lista principal de agentes
export const agentTables = metricsAgentTables;

// Mapeamento DIRETO e DEFINITIVO de nomes formatados para sufixos de tabelas
const nameToTableMapping: Record<string, string> = {
    // ⚠️ ATENÇÃO: André Araújo no banco está SEM acento (Andre_araujo)
    'André Araújo': 'Andre_araujo', // CORRIGIDO: sem acento no banco
    'Mariana Araújo': 'Mariana_araújo',
    'Aline Bigatão': 'Aline_bigatão',
    'Ana Beatriz': 'Ana_beatriz',
    'Carlos Antunes': ' Carlos_Antunes', // Note o espaço
    'Diego Cabrejos': 'Diego_cabrejos',
    'Danilo Chammas': 'Danilo_Chammas',
    'Henrique Maffei': 'Henrique_maffei',
    'Julia Jorge': 'Julia_jorge',
    'Karla Fazollo': 'Karla_fazollo',
    'Karla Resende': 'Karla_resende',
    'Luiza Murad': 'Luiza_murad',
    'Marcelo Soeiro': 'Marcelo_soeiro',
    'Marco Antonio': 'Marco_antonio',
    'Michelle Meleck': 'Michelle_Meleck',
    'Patricia Lima': 'Patricia_lima',
    'Raiany Pimentel': 'Raiany_pimentel',
    'Roberta Xavier': 'Roberta_xavier',
    'Roberto Pigini': 'Roberto_pigini',
    'Roclides Lima': 'Roclides_lima',
    'Rodrigo Pastore': 'Rodrigo_pastore',
    'Silvia Joly': 'Silvia_Joly',
    'Stefanie Lee': 'Stefanie_lee',
    'Adiney Esteves': 'Adiney_esteves',
    'Alana Meneses': 'Alana_meneses',
    'Aline Franzotti': 'Aline_franzotti',
    'Amanda Mota': 'Amanda_Mota',
    'Haila': 'Haila'
};

export const formatAgentName = (tableName: string) => {
    console.log('🎯 Formatando nome da tabela:', tableName);
    
    const name = tableName
        .replace('Lista_mensagens_', '')
        .replace('Lista_de_Mensagens_', '')
        .replace(/_/g, ' ')
        .trim();
    
    // Casos especiais para nomes com acentos e formatação
    const specialCases: Record<string, string> = {
        // ⚠️ CORRIGIDO: Andre araujo (SEM acento) -> André Araújo (COM acento na UI)
        'Andre araujo': 'André Araújo',
        'Mariana araújo': 'Mariana Araújo',
        'Aline bigatão': 'Aline Bigatão',
        'Ana beatriz': 'Ana Beatriz',
        'Carlos Antunes': 'Carlos Antunes',
        ' Carlos Antunes': 'Carlos Antunes', // Handle the space
        'Diego cabrejos': 'Diego Cabrejos',
        'Danilo Chammas': 'Danilo Chammas',
        'Henrique maffei': 'Henrique Maffei',
        'Julia jorge': 'Julia Jorge',
        'Karla fazollo': 'Karla Fazollo',
        'Karla resende': 'Karla Resende',
        'Luiza murad': 'Luiza Murad',
        'Marcelo soeiro': 'Marcelo Soeiro',
        'Marco antonio': 'Marco Antonio',
        'Michelle Meleck': 'Michelle Meleck',
        'Patricia lima': 'Patricia Lima',
        'Raiany pimentel': 'Raiany Pimentel',
        'Roberta xavier': 'Roberta Xavier',
        'Roberto pigini': 'Roberto Pigini',
        'Roclides lima': 'Roclides Lima',
        'Rodrigo pastore': 'Rodrigo Pastore',
        'Rodrigo Pastore': 'Rodrigo Pastore', // Handle both cases
        'Silvia Joly': 'Silvia Joly',
        'Stefanie lee': 'Stefanie Lee',
        'Adiney esteves': 'Adiney Esteves',
        'Alana meneses': 'Alana Meneses',
        'Aline franzotti': 'Aline Franzotti',
        'Amanda Mota': 'Amanda Mota',
        'Haila': 'Haila'
    };
    
    // Verifica se existe um caso especial
    if (specialCases[name]) {
        console.log('✅ Nome formatado (caso especial):', specialCases[name]);
        return specialCases[name];
    }
    
    // Capitalize each word para nomes não especiais
    const formatted = name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    console.log('✅ Nome formatado:', formatted);
    return formatted;
};

export const getMetricsTableName = (formattedName: string): string => {
    console.log('🔍 Buscando tabela de métricas para:', formattedName);
    
    // Usa o mapeamento direto primeiro
    const mappedName = nameToTableMapping[formattedName];
    if (mappedName) {
        const tableNameMetrics = `Lista_mensagens_${mappedName}`;
        console.log('✅ Mapeamento direto encontrado:', tableNameMetrics);
        
        // Verifica se a tabela realmente existe na lista
        if (metricsAgentTables.includes(tableNameMetrics)) {
            console.log('✅ Tabela confirmada na lista de métricas');
            return tableNameMetrics;
        } else {
            console.log('❌ Tabela NÃO encontrada na lista de métricas:', tableNameMetrics);
        }
    } else {
        console.log('❌ Nenhum mapeamento direto encontrado para:', formattedName);
        console.log('📋 Mapeamentos disponíveis:', Object.keys(nameToTableMapping));
    }
    
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
    
    console.log('❌ Nenhuma tabela de métricas encontrada para:', formattedName);
    console.log('📋 Tabelas disponíveis:', metricsAgentTables);
    
    return '';
};

export const getBasicTableName = (formattedName: string): string => {
    console.log('🔍 Buscando tabela básica para:', formattedName);
    
    // Usa o mapeamento direto primeiro
    const mappedName = nameToTableMapping[formattedName];
    if (mappedName) {
        const tableNameBasic = `Lista_de_Mensagens_${mappedName}`;
        console.log('✅ Mapeamento direto básico encontrado:', tableNameBasic);
        
        // Verifica se a tabela realmente existe na lista
        if (basicMessageTables.includes(tableNameBasic)) {
            console.log('✅ Tabela básica confirmada na lista');
            return tableNameBasic;
        } else {
            console.log('❌ Tabela básica NÃO encontrada na lista:', tableNameBasic);
        }
    } else {
        console.log('❌ Nenhum mapeamento direto básico encontrado para:', formattedName);
    }
    
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
    
    console.log('❌ Nenhuma tabela básica encontrada para:', formattedName);
    console.log('📋 Tabelas básicas disponíveis:', basicMessageTables);
    
    return '';
};

// Função para verificar se tabela existe
export const isValidTableName = (tableName: string): boolean => {
    return metricsAgentTables.includes(tableName) || basicMessageTables.includes(tableName);
};

// Função para listar todas as tabelas disponíveis
export const getAllAvailableTables = (): string[] => {
    return [...metricsAgentTables, ...basicMessageTables];
};

// Função para debug - mapear todos os nomes formatados
export const debugAgentMapping = (): void => {
    console.log('🔍 MAPEAMENTO COMPLETO DE AGENTES:');
    metricsAgentTables.forEach(table => {
        const formatted = formatAgentName(table);
        console.log(`${table} -> "${formatted}"`);
    });
    
    console.log('🔍 MAPEAMENTO DIRETO:');
    Object.entries(nameToTableMapping).forEach(([formatted, table]) => {
        console.log(`"${formatted}" -> ${table}`);
    });
};
