
export const agentTables = [
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

// Mapeamento corrigido baseado nas tabelas reais do banco de dados
const agentNameToTable: Record<string, string> = {
    'Adiney Esteves': 'Lista_mensagens_Adiney_esteves',
    'Alana Meneses': 'Lista_mensagens_Alana_meneses',
    'Aline Bigatão': 'Lista_mensagens_Aline_bigatão',
    'Aline Franzotti': 'Lista_mensagens_Aline_franzotti',
    'Amanda': 'Lista_mensagens_Amanda',
    'Ana Beatriz': 'Lista_mensagens_Ana_beatriz',
    'Andre Araujo': 'Lista_mensagens_Andre_araujo',
    'Carlos Antunes': 'Lista_mensagens_ Carlos_Antunes', // Note o espaço extra
    'Danilo Chammas': 'Lista_mensagens_Danilo_Chammas',
    'Diego Cabrejos': 'Lista_mensagens_Diego_cabrejos',
    'Haila': 'Lista_mensagens_Haila',
    'Henrique Maffei': 'Lista_mensagens_Henrique_maffei',
    'Julia Jorge': 'Lista_mensagens_Julia_jorge',
    'Karla Fazollo': 'Lista_mensagens_Karla_fazollo',
    'Karla Resende': 'Lista_mensagens_Karla_resende',
    'Luiza Murad': 'Lista_mensagens_Luiza_murad',
    'Marcelo Soeiro': 'Lista_mensagens_Marcelo_soeiro',
    'Marco Antonio': 'Lista_mensagens_Marco_antonio',
    'Mariana Araújo': 'Lista_mensagens_Mariana_araújo',
    'Michelle Meleck': 'Lista_mensagens_Michelle_Meleck',
    'Patricia Lima': 'Lista_mensagens_Patricia_lima',
    'Raiany Pimentel': 'Lista_mensagens_Raiany_pimentel',
    'Roberta Xavier': 'Lista_mensagens_Roberta_xavier',
    'Roberto Pigini': 'Lista_mensagens_Roberto_pigini',
    'Roclides Lima': 'Lista_mensagens_Roclides_lima',
    'Rodrigo Pastore': 'Lista_mensagens_Rodrigo_pastore',
    'Silvia Joly': 'Lista_mensagens_Silvia_Joly',
    'Stefanie Lee': 'Lista_mensagens_Stefanie_lee'
};

export const formatAgentName = (tableName: string) => {
    const name = tableName
        .replace('Lista_mensagens_', '')
        .replace(/_/g, ' ')
        .trim();
    
    // Capitalize each word
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const getTableNameFromFormattedName = (formattedName: string): string => {
    console.log('🔍 Buscando tabela para nome formatado:', formattedName);
    const tableName = agentNameToTable[formattedName];
    console.log('📋 Tabela encontrada:', tableName);
    
    if (!tableName) {
        console.error('❌ Nome formatado não encontrado no mapeamento:', formattedName);
        console.log('📝 Chaves disponíveis:', Object.keys(agentNameToTable));
        return formattedName; // Fallback
    }
    
    return tableName;
};

// Nova função para debug - verificar se tabela existe
export const isValidTableName = (tableName: string): boolean => {
    return agentTables.includes(tableName);
};

// Função para listar todas as tabelas disponíveis
export const getAllAvailableTables = (): string[] => {
    return agentTables;
};
