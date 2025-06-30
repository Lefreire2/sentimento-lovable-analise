export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      lead_intelligence: {
        Row: {
          created_at: string | null
          id: string
          mensagem_id: number | null
          probabilidade_conversao: number | null
          proxima_acao: string | null
          score_total: number | null
          valor_estimado: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mensagem_id?: number | null
          probabilidade_conversao?: number | null
          proxima_acao?: string | null
          score_total?: number | null
          valor_estimado?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mensagem_id?: number | null
          probabilidade_conversao?: number | null
          proxima_acao?: string | null
          score_total?: number | null
          valor_estimado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_intelligence_mensagem_id_fkey"
            columns: ["mensagem_id"]
            isOneToOne: false
            referencedRelation: "Lista_mensagens_Haila"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_source_metrics: {
        Row: {
          agent_name: string
          analysis_period: string
          avg_objection_intensity: number | null
          conversion_rate: number | null
          cost_per_appointment: number | null
          created_at: string | null
          id: string
          lead_source: string
          most_common_objection: string | null
          objection_rate: number | null
          roi_score: number | null
          script_effectiveness_rate: number | null
          total_leads: number | null
          total_objections: number | null
          updated_at: string | null
        }
        Insert: {
          agent_name: string
          analysis_period: string
          avg_objection_intensity?: number | null
          conversion_rate?: number | null
          cost_per_appointment?: number | null
          created_at?: string | null
          id?: string
          lead_source: string
          most_common_objection?: string | null
          objection_rate?: number | null
          roi_score?: number | null
          script_effectiveness_rate?: number | null
          total_leads?: number | null
          total_objections?: number | null
          updated_at?: string | null
        }
        Update: {
          agent_name?: string
          analysis_period?: string
          avg_objection_intensity?: number | null
          conversion_rate?: number | null
          cost_per_appointment?: number | null
          created_at?: string | null
          id?: string
          lead_source?: string
          most_common_objection?: string | null
          objection_rate?: number | null
          roi_score?: number | null
          script_effectiveness_rate?: number | null
          total_leads?: number | null
          total_objections?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      lead_sources: {
        Row: {
          created_at: string | null
          expected_objection_profile: Json | null
          id: string
          qualification_level: string | null
          source_category: string
          source_description: string | null
          source_name: string
          updated_at: string | null
          utm_parameters: Json | null
        }
        Insert: {
          created_at?: string | null
          expected_objection_profile?: Json | null
          id?: string
          qualification_level?: string | null
          source_category: string
          source_description?: string | null
          source_name: string
          updated_at?: string | null
          utm_parameters?: Json | null
        }
        Update: {
          created_at?: string | null
          expected_objection_profile?: Json | null
          id?: string
          qualification_level?: string | null
          source_category?: string
          source_description?: string | null
          source_name?: string
          updated_at?: string | null
          utm_parameters?: Json | null
        }
        Relationships: []
      }
      "Lista_de_Mensagens_ Carlos_Antunes": {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Adiney_esteves: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Alana_meneses: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Aline_bigatão: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Aline_franzotti: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Amanda_Mota: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Ana_beatriz: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Andre_araujo: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Danilo_Chammas: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Diego_cabrejos: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Haila: {
        Row: {
          fonte_mkt: string | null
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          fonte_mkt?: string | null
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          fonte_mkt?: string | null
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Henrique_maffei: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Jorge_Mendes: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Julia_jorge: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Karla_fazollo: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Karla_resende: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Luiza_murad: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Marcelo_soeiro: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Marco_antonio: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Mariana_araújo: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Michelle_Meleck: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Patricia_lima: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Rachel_Carmo: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Raiany_pimentel: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Roberta_Xavier: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Roberto_pigini: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Roclides_lima: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Rodrigo_Pastore: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Samuel_Nolasco: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Silvia_Joly: {
        Row: {
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_de_Mensagens_Stefanie_lee: {
        Row: {
          agendamento_detectado: string | null
          id: number
          message: string | null
          nome: string | null
          remoteJid: string | null
          Timestamp: string | null
        }
        Insert: {
          agendamento_detectado?: string | null
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Update: {
          agendamento_detectado?: string | null
          id?: number
          message?: string | null
          nome?: string | null
          remoteJid?: string | null
          Timestamp?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Adiney_esteves: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Alana_meneses: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Aline_bigatão: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Aline_franzotti: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Amanda_Mota: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Ana_beatriz: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Andre_araujo: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Carlos_Antunes: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Danilo_Chammas: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Diego_cabrejos: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Haila: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          fonte_mkt: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          fonte_mkt?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          fonte_mkt?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Henrique_maffei: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Jorge_Mendes: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Julia_jorge: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Karla_fazollo: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Karla_resende: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Luiza_murad: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Marcelo_soeiro: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Marco_antonio: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Mariana_araújo: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Michelle_Meleck: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Patricia_lima: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          "data_inicio_ conversa": string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          "data_inicio_ conversa"?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          "data_inicio_ conversa"?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Rachel_Carmo: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Raiany_pimentel: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Roberta_Xavier: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Roberto_pigini: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Roclides_lima: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Rodrigo_Pastore: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Samuel_Nolasco: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Silvia_joly: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      Lista_mensagens_Stefanie_lee: {
        Row: {
          aderência_script_nivel: string | null
          agendamento_detectado: string | null
          contagem_palavras_risco: string | null
          conversao_indicada_mvp: string | null
          data_fim_conversa: string | null
          data_inicio_conversa: string | null
          duracao_total_conversa_horas: string | null
          duracao_total_conversa_minutos: string | null
          id: number
          indicador_escalonamento_transferencia: string | null
          indicador_resolucao_primeira_resposta: string | null
          motivo_contato_lead: string | null
          motivo_nao_conversao: string | null
          nome: string | null
          nota_atendimento: string | null
          numero_perguntas_vendedor: string | null
          pontuacao_aderencia_percentual: string | null
          remoteJid: string | null
          resumo_atendimento: string | null
          sentimento_atendente: string | null
          sentimento_geral_conversa: string | null
          sentimento_usuario: string | null
          taxa_mensagens_vendedor_percentual: string | null
          tempo_maximo_resposta_atendente_horas: string | null
          tempo_maximo_resposta_atendente_minutos: string | null
          tempo_medio_resposta_atendente_horas: string | null
          tempo_medio_resposta_atendente_minutos: string | null
          tempo_primeira_resposta_horas: string | null
          tempo_primeira_resposta_minutos: string | null
          termo_chave_conversao: string | null
          ultima_etapa_alcancada: string | null
        }
        Insert: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Update: {
          aderência_script_nivel?: string | null
          agendamento_detectado?: string | null
          contagem_palavras_risco?: string | null
          conversao_indicada_mvp?: string | null
          data_fim_conversa?: string | null
          data_inicio_conversa?: string | null
          duracao_total_conversa_horas?: string | null
          duracao_total_conversa_minutos?: string | null
          id?: number
          indicador_escalonamento_transferencia?: string | null
          indicador_resolucao_primeira_resposta?: string | null
          motivo_contato_lead?: string | null
          motivo_nao_conversao?: string | null
          nome?: string | null
          nota_atendimento?: string | null
          numero_perguntas_vendedor?: string | null
          pontuacao_aderencia_percentual?: string | null
          remoteJid?: string | null
          resumo_atendimento?: string | null
          sentimento_atendente?: string | null
          sentimento_geral_conversa?: string | null
          sentimento_usuario?: string | null
          taxa_mensagens_vendedor_percentual?: string | null
          tempo_maximo_resposta_atendente_horas?: string | null
          tempo_maximo_resposta_atendente_minutos?: string | null
          tempo_medio_resposta_atendente_horas?: string | null
          tempo_medio_resposta_atendente_minutos?: string | null
          tempo_primeira_resposta_horas?: string | null
          tempo_primeira_resposta_minutos?: string | null
          termo_chave_conversao?: string | null
          ultima_etapa_alcancada?: string | null
        }
        Relationships: []
      }
      objection_analysis: {
        Row: {
          agent_name: string
          conversation_id: string | null
          conversion_impact: boolean | null
          created_at: string
          cross_channel_insights: Json | null
          funnel_stage: string
          id: string
          intensity_level: string
          lead_source: string | null
          lead_source_analysis: Json | null
          objection_category: string
          objection_text: string | null
          occurrence_timestamp: string | null
          remote_jid: string | null
          script_effectiveness: boolean | null
        }
        Insert: {
          agent_name: string
          conversation_id?: string | null
          conversion_impact?: boolean | null
          created_at?: string
          cross_channel_insights?: Json | null
          funnel_stage: string
          id?: string
          intensity_level: string
          lead_source?: string | null
          lead_source_analysis?: Json | null
          objection_category: string
          objection_text?: string | null
          occurrence_timestamp?: string | null
          remote_jid?: string | null
          script_effectiveness?: boolean | null
        }
        Update: {
          agent_name?: string
          conversation_id?: string | null
          conversion_impact?: boolean | null
          created_at?: string
          cross_channel_insights?: Json | null
          funnel_stage?: string
          id?: string
          intensity_level?: string
          lead_source?: string | null
          lead_source_analysis?: Json | null
          objection_category?: string
          objection_text?: string | null
          occurrence_timestamp?: string | null
          remote_jid?: string | null
          script_effectiveness?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      dashboard_vendas: {
        Row: {
          data: string | null
          leads_facebook: number | null
          leads_google: number | null
          leads_instagram: number | null
          leads_sem_fonte: number | null
          leads_site: number | null
          total_leads: number | null
        }
        Relationships: []
      }
      fontes_marketing_analise: {
        Row: {
          fonte_detectada: string | null
          id: number | null
          message: string | null
        }
        Insert: {
          fonte_detectada?: never
          id?: number | null
          message?: string | null
        }
        Update: {
          fonte_detectada?: never
          id?: number | null
          message?: string | null
        }
        Relationships: []
      }
      fontes_marketing_resumo: {
        Row: {
          fonte_detectada: string | null
          total_leads: number | null
        }
        Relationships: []
      }
      taxa_conversao_por_fonte: {
        Row: {
          conversoes: number | null
          fonte_detectada: string | null
          taxa_conversao_percentual: number | null
          total_leads: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
