
// Tabelas de métricas agregadas (dados processados) - nomes exatos do banco conforme screenshots
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
    'Lista_mensagens_Roberta_Xavier',
    'Lista_mensagens_Roberto_pigini',
    'Lista_mensagens_Roclides_lima',
    'Lista_mensagens_Rodrigo_Pastore',
    'Lista_mensagens_Silvia_Joly',
    'Lista_mensagens_Stefanie_lee'
].sort();

// Tabelas básicas de mensagens (dados brutos) - nomes exatos do banco conforme screenshots
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
    'Lista_de_Mensagens_Roberta_Xavier',
    'Lista_de_Mensagens_Roberto_pigini',
    'Lista_de_Mensagens_Roclides_lima',
    'Lista_de_Mensagens_Rodrigo_Pastore',
    'Lista_de_Mensagens_Silvia_Joly',
    'Lista_de_Mensagens_Stefanie_lee'
].sort();

// Lista principal de agentes baseada nos screenshots fornecidos
export const agentTables = metricsAgentTables;

// Mapeamento CORRIGIDO baseado na screenshot - André Araújo SEM espaço
const nameToTableMapping: Record<string, string> = {
    'Carlos Antunes': ' Carlos_Antunes', // Com espaço no início conforme banco
    'Adiney Esteves': 'Adiney_esteves',
    'Alana Meneses': 'Alana_meneses',
    'Aline Bigatão': 'Aline_bigatão',
    'Aline Franzotti': 'Aline_franzotti',
    'Amanda Mota': 'Amanda_Mota',
    'Ana Beatriz': 'Ana_beatriz',
    'André Araújo': 'Andre_araujo', // CORRIGIDO: SEM espaço, exatamente como na tabela
    'Danilo Chammas': 'Danilo_Chammas',
    'Diego Cabrejos': 'Diego_cabrejos',
    'Haila': 'Haila',
    'Henrique Maffei': 'Henrique_maffei',
    'Julia Jorge': 'Julia_jorge',
    'Karla Fazollo': 'Karla_fazollo',
    'Karla Resende': 'Karla_resende',
    'Luiza Murad': 'Luiza_murad',
    'Marcelo Soeiro': 'Marcelo_soeiro',
    'Marco Antonio': 'Marco_antonio',
    'Mariana Araújo': 'Mariana_araújo',
    'Michelle Meleck': 'Michelle_Meleck',
    'Patricia Lima': 'Patricia_lima',
    'Raiany Pimentel': 'Raiany_pimentel',
    'Roberta Xavier': 'Roberta_Xavier',
    'Roberto Pigini': 'Roberto_pigini',
    'Roclides Lima': 'Roclides_lima',
    'Rodrigo Pastore': 'Rodrigo_Pastore',
    'Silvia Joly': 'Silvia_Joly',
    'Stefanie Lee': 'Stefanie_lee'
};

export const formatAgentName = (tableName: string) => {
    console.log('🎯 FORMAT - Formatando nome da tabela:', tableName);
    
    const name = tableName
        .replace('Lista_mensagens_', '')
        .replace('Lista_de_Mensagens_', '')
        .replace(/_/g, ' ')
        .trim();
    
    // Casos especiais CORRIGIDOS baseados na screenshot
    const specialCases: Record<string, string> = {
        'Carlos Antunes': 'Carlos Antunes',
        ' Carlos Antunes': 'Carlos Antunes',
        'Adiney esteves': 'Adiney Esteves',
        'Alana meneses': 'Alana Meneses',
        'Aline bigatão': 'Aline Bigatão',
        'Aline franzotti': 'Aline Franzotti',
        'Amanda Mota': 'Amanda Mota',
        'Ana beatriz': 'Ana Beatriz',
        'Andre araujo': 'André Araújo', // MANTÉM: Interface mostra com acento
        'Danilo Chammas': 'Danilo Chammas',
        'Diego cabrejos': 'Diego Cabrejos',
        'Haila': 'Haila',
        'Henrique maffei': 'Henrique Maffei',
        'Julia jorge': 'Julia Jorge',
        'Karla fazollo': 'Karla Fazollo',
        'Karla resende': 'Karla Resende',
        'Luiza murad': 'Luiza Murad',
        'Marcelo soeiro': 'Marcelo Soeiro',
        'Marco antonio': 'Marco Antonio',
        'Mariana araújo': 'Mariana Araújo',
        'Michelle Meleck': 'Michelle Meleck',
        'Patricia lima': 'Patricia Lima',
        'Raiany pimentel': 'Raiany Pimentel',
        'Roberta Xavier': 'Roberta Xavier',
        'Roberta xavier': 'Roberta Xavier',
        'Roberto pigini': 'Roberto Pigini',
        'Roclides lima': 'Roclides Lima',
        'Rodrigo Pastore': 'Rodrigo Pastore',
        'Rodrigo pastore': 'Rodrigo Pastore',
        'Silvia Joly': 'Silvia Joly',
        'Stefanie lee': 'Stefanie Lee'
    };
    
    if (specialCases[name]) {
        console.log('✅ FORMAT - Nome formatado (caso especial):', specialCases[name]);
        return specialCases[name];
    }
    
    const formatted = name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    console.log('✅ FORMAT - Nome formatado:', formatted);
    return formatted;
};

export const getMetricsTableName = (formattedName: string): string => {
    console.log('🔍 MÉTRICA - Buscando tabela para:', formattedName);
    
    const mappedName = nameToTableMapping[formattedName];
    if (mappedName) {
        const tableNameMetrics = `Lista_mensagens_${mappedName}`;
        console.log('✅ MÉTRICA - Mapeamento encontrado:', mappedName);
        console.log('📊 MÉTRICA - Tabela resultante:', tableNameMetrics);
        
        if (metricsAgentTables.includes(tableNameMetrics)) {
            console.log('✅ MÉTRICA - Tabela CONFIRMADA na lista');
            return tableNameMetrics;
        } else {
            console.log('❌ MÉTRICA - Tabela NÃO encontrada na lista:', tableNameMetrics);
            console.log('📋 MÉTRICA - Tabelas disponíveis:', metricsAgentTables);
        }
    } else {
        console.log('❌ MÉTRICA - Nenhum mapeamento encontrado para:', formattedName);
    }
    
    console.log('❌ MÉTRICA - Tabela não encontrada para:', formattedName);
    return '';
};

export const getBasicTableName = (formattedName: string): string => {
    console.log('🔍 BÁSICA - Buscando tabela para:', formattedName);
    
    const mappedName = nameToTableMapping[formattedName];
    if (mappedName) {
        const tableNameBasic = `Lista_de_Mensagens_${mappedName}`;
        console.log('✅ BÁSICA - Mapeamento encontrado:', mappedName);
        console.log('💬 BÁSICA - Tabela resultante:', tableNameBasic);
        
        if (basicMessageTables.includes(tableNameBasic)) {
            console.log('✅ BÁSICA - Tabela CONFIRMADA na lista');
            return tableNameBasic;
        } else {
            console.log('❌ BÁSICA - Tabela NÃO encontrada na lista:', tableNameBasic);
            console.log('📋 BÁSICA - Tabelas disponíveis:', basicMessageTables);
        }
    } else {
        console.log('❌ BÁSICA - Nenhum mapeamento encontrado para:', formattedName);
    }
    
    console.log('❌ BÁSICA - Tabela não encontrada para:', formattedName);
    return '';
};

// Verificação de tabela válida
export const isValidTableName = (tableName: string): boolean => {
    return metricsAgentTables.includes(tableName) || basicMessageTables.includes(tableName);
};

// Listar todas as tabelas disponíveis
export const getAllAvailableTables = (): string[] => {
    return [...metricsAgentTables, ...basicMessageTables];
};

// Debug geral OTIMIZADO
export const debugAgentMapping = (): void => {
    console.log('🗺️ DEBUG MAPEAMENTO FINAL - GARANTINDO 100% FUNCIONAMENTO:');
    console.log('📊 Total de tabelas de métricas:', metricsAgentTables.length);
    console.log('💬 Total de tabelas básicas:', basicMessageTables.length);
    console.log('🔗 Total de mapeamentos:', Object.keys(nameToTableMapping).length);
    
    Object.entries(nameToTableMapping).forEach(([formatted, mapped]) => {
        const metricsTable = `Lista_mensagens_${mapped}`;
        const basicTable = `Lista_de_Mensagens_${mapped}`;
        
        console.log(`👤 ${formatted}:`);
        console.log(`  📊 Métricas: ${metricsTable} (${metricsAgentTables.includes(metricsTable) ? '✅' : '❌'})`);
        console.log(`  💬 Básica: ${basicTable} (${basicMessageTables.includes(basicTable) ? '✅' : '❌'})`);
    });
};

// Debug específico André Araújo - OTIMIZADO
export const debugAndreAraujo = (): void => {
    console.log('🐛 DEBUG ANDRÉ ARAÚJO - VERIFICAÇÃO FINAL:');
    
    const formattedName = 'André Araújo';
    console.log('👤 Nome formatado:', formattedName);
    
    const mappedName = nameToTableMapping[formattedName];
    console.log('🗺️ Nome mapeado:', mappedName);
    
    if (mappedName) {
        const metricsTable = `Lista_mensagens_${mappedName}`;
        const basicTable = `Lista_de_Mensagens_${mappedName}`;
        
        console.log('📊 Tabela de métricas:', metricsTable);
        console.log('💬 Tabela básica:', basicTable);
        
        console.log('✅ Métrica existe?', metricsAgentTables.includes(metricsTable));
        console.log('✅ Básica existe?', basicMessageTables.includes(basicTable));
    }
};

// Inicialização OTIMIZADA
if (typeof window !== 'undefined') {
    console.log('🔧 INIT - Sistema de sufixos OTIMIZADO para 100% funcionamento');
    console.log('📸 INIT - Baseado nos screenshots e configurado para máxima compatibilidade');
    debugAndreAraujo();
}
