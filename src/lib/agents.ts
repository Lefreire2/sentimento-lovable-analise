
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
