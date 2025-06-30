

export const getAgentTableMapping = () => {
  return {
    'André Araújo': {
      messagesTable: 'Lista_de_Mensagens_Andre_araujo',
      metricsTable: 'Lista_mensagens_Andre_araujo'
    },
    'Haila': {
      messagesTable: 'Lista_de_Mensagens_Haila',
      metricsTable: 'Lista_mensagens_Haila'
    },
    'Carlos Antunes': {
      messagesTable: 'Lista_de_Mensagens_ Carlos_Antunes', // Note o espaço antes de Carlos
      metricsTable: 'Lista_mensagens_Carlos_Antunes'
    },
    'Adiney Esteves': {
      messagesTable: 'Lista_de_Mensagens_Adiney_esteves',
      metricsTable: 'Lista_mensagens_Adiney_esteves'
    },
    'Alana Meneses': {
      messagesTable: 'Lista_de_Mensagens_Alana_meneses',
      metricsTable: 'Lista_mensagens_Alana_meneses'
    },
    'Aline Bigatão': {
      messagesTable: 'Lista_de_Mensagens_Aline_bigatão',
      metricsTable: 'Lista_mensagens_Aline_bigatão'
    },
    'Aline Franzotti': {
      messagesTable: 'Lista_de_Mensagens_Aline_franzotti',
      metricsTable: 'Lista_mensagens_Aline_franzotti'
    },
    'Amanda Mota': {
      messagesTable: 'Lista_de_Mensagens_Amanda_Mota',
      metricsTable: 'Lista_mensagens_Amanda_Mota'
    },
    'Ana Beatriz': {
      messagesTable: 'Lista_de_Mensagens_Ana_beatriz',
      metricsTable: 'Lista_mensagens_Ana_beatriz'
    },
    'Danilo Chammas': {
      messagesTable: 'Lista_de_Mensagens_Danilo_Chammas',
      metricsTable: 'Lista_mensagens_Danilo_Chammas'
    },
    'Diego Cabrejos': {
      messagesTable: 'Lista_de_Mensagens_Diego_cabrejos',
      metricsTable: 'Lista_mensagens_Diego_cabrejos'
    },
    'Henrique Maffei': {
      messagesTable: 'Lista_de_Mensagens_Henrique_maffei',
      metricsTable: 'Lista_mensagens_Henrique_maffei'
    },
    'Jorge Mendes': {
      messagesTable: 'Lista_de_Mensagens_Jorge_Mendes',
      metricsTable: 'Lista_mensagens_Jorge_Mendes'
    },
    'Julia Jorge': {
      messagesTable: 'Lista_de_Mensagens_Julia_jorge',
      metricsTable: 'Lista_mensagens_Julia_jorge'
    },
    'Karla Fazollo': {
      messagesTable: 'Lista_de_Mensagens_Karla_fazollo',
      metricsTable: 'Lista_mensagens_Karla_fazollo'
    },
    'Karla Resende': {
      messagesTable: 'Lista_de_Mensagens_Karla_resende',
      metricsTable: 'Lista_mensagens_Karla_resende'
    },
    'Luiza Murad': {
      messagesTable: 'Lista_de_Mensagens_Luiza_murad',
      metricsTable: 'Lista_mensagens_Luiza_murad'
    },
    'Marcelo Soeiro': {
      messagesTable: 'Lista_de_Mensagens_Marcelo_soeiro',
      metricsTable: 'Lista_mensagens_Marcelo_soeiro'
    },
    'Marco Antonio': {
      messagesTable: 'Lista_de_Mensagens_Marco_antonio',
      metricsTable: 'Lista_mensagens_Marco_antonio'
    },
    'Mariana Araújo': {
      messagesTable: 'Lista_de_Mensagens_Mariana_araújo',
      metricsTable: 'Lista_mensagens_Mariana_araújo'
    },
    'Michelle Meleck': {
      messagesTable: 'Lista_de_Mensagens_Michelle_Meleck',
      metricsTable: 'Lista_mensagens_Michelle_Meleck'
    },
    'Patricia Lima': {
      messagesTable: 'Lista_de_Mensagens_Patricia_lima',
      metricsTable: 'Lista_mensagens_Patricia_lima'
    },
    'Rachel Carmo': {
      messagesTable: 'Lista_de_Mensagens_Rachel_Carmo',
      metricsTable: 'Lista_mensagens_Rachel_Carmo'
    },
    'Raiany Pimentel': {
      messagesTable: 'Lista_de_Mensagens_Raiany_pimentel',
      metricsTable: 'Lista_mensagens_Raiany_pimentel'
    },
    'Roberta Xavier': {
      messagesTable: 'Lista_de_Mensagens_Roberta_Xavier',
      metricsTable: 'Lista_mensagens_Roberta_Xavier'
    },
    'Roberto Pigini': {
      messagesTable: 'Lista_de_Mensagens_Roberto_pigini',
      metricsTable: 'Lista_mensagens_Roberto_pigini'
    },
    'Roclides Lima': {
      messagesTable: 'Lista_de_Mensagens_Roclides_lima',
      metricsTable: 'Lista_mensagens_Roclides_lima'
    },
    'Rodrigo Pastore': {
      messagesTable: 'Lista_de_Mensagens_Rodrigo_Pastore',
      metricsTable: 'Lista_mensagens_Rodrigo_Pastore'
    },
    'Samuel Nolasco': {
      messagesTable: 'Lista_de_Mensagens_Samuel_Nolasco',
      metricsTable: 'Lista_mensagens_Samuel_Nolasco'
    },
    'Silvia Joly': {
      messagesTable: 'Lista_de_Mensagens_Silvia_Joly',
      metricsTable: 'Lista_mensagens_Silvia_joly'
    },
    'Stefanie Lee': {
      messagesTable: 'Lista_de_Mensagens_Stefanie_lee',
      metricsTable: 'Lista_mensagens_Stefanie_lee'
    }
  };
};

export const getTableNamesForAgent = (agentName: string) => {
  const mapping = getAgentTableMapping();
  const tables = mapping[agentName as keyof typeof mapping];
  
  if (!tables) {
    console.error(`⚠️ Agente não encontrado no mapeamento: ${agentName}`);
    console.log(`📋 Agentes disponíveis:`, Object.keys(mapping));
    return null;
  }
  
  console.log(`✅ Tabelas encontradas para ${agentName}:`, tables);
  console.log(`📊 Mapeamento confirmado: ${tables.messagesTable} e ${tables.metricsTable}`);
  return tables;
};

// Função para verificar se uma tabela existe no banco
export const checkTableExists = async (supabase: any, tableName: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .limit(1);
    
    return !error;
  } catch (error) {
    console.error(`❌ Erro ao verificar tabela ${tableName}:`, error);
    return false;
  }
};

// Função para verificar se uma tabela tem dados
export const checkTableHasData = async (supabase: any, tableName: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error(`❌ Erro ao contar registros da tabela ${tableName}:`, error);
      return 0;
    }
    
    return count || 0;
  } catch (error) {
    console.error(`❌ Erro ao contar registros da tabela ${tableName}:`, error);
    return 0;
  }
};

