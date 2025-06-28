
import { AgentTableMapping } from './types.ts';

export const getAgentTableMapping = (): Record<string, AgentTableMapping> => {
  return {
    'André Araújo': {
      basic: 'Lista_de_Mensagens_Andre_araujo',
      metrics: 'Lista_mensagens_Andre_araujo'
    },
    'Carlos Antunes': {
      basic: 'Lista_de_Mensagens_ Carlos_Antunes',
      metrics: 'Lista_mensagens_ Carlos_Antunes'
    },
    'Jorge Mendes': {
      basic: 'Lista_de_Mensagens_Jorge_Mendes',
      metrics: 'Lista_mensagens_Jorge_Mendes'
    },
    'Danilo Chammas': {
      basic: 'Lista_de_Mensagens_Danilo_Chammas',
      metrics: 'Lista_mensagens_Danilo_Chammas'
    },
    'Haila': {
      basic: 'Lista_de_Mensagens_Haila',
      metrics: 'Lista_mensagens_Haila'
    }
  };
};
