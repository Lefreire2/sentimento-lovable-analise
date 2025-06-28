
// Tipos fundamentais do Sistema Evolutivo
export interface LeadProfile {
  id: string;
  remoteJid: string;
  nome: string;
  origem: string;
  canal_marketing: string;
  campanha: string;
  palavra_chave?: string;
  dispositivo: string;
  localizacao?: string;
  data_primeiro_contato: string;
  horario_primeiro_contato: string;
}

export interface IntentionAnalysis {
  id: string;
  lead_id: string;
  nivel_intencao: 'Alta' | 'Média' | 'Baixa';
  score_intencao: number; // 0-100
  fatores_positivos: string[];
  fatores_negativos: string[];
  momento_ideal_contato: string;
  tipo_abordagem_recomendada: string;
  probabilidade_conversao: number;
  data_analise: string;
}

export interface ConversationContext {
  id: string;
  lead_id: string;
  conversation_id: string;
  etapa_funil: 'Awareness' | 'Interest' | 'Consideration' | 'Intent' | 'Evaluation' | 'Purchase';
  tempo_resposta_medio: number;
  sentimento_geral: 'Positivo' | 'Neutro' | 'Negativo';
  objetos_identificadas: string[];
  necessidades_detectadas: string[];
  urgencia_percebida: 'Alta' | 'Média' | 'Baixa';
  disponibilidade_horario: string[];
  preferencias_comunicacao: string[];
}

export interface AppointmentOptimization {
  id: string;
  lead_id: string;
  melhor_horario_sugerido: string;
  melhor_dia_semana: string;
  canal_preferido: string;
  abordagem_recomendada: string;
  script_personalizado: string;
  probabilidade_sucesso: number;
  fatores_otimizacao: string[];
  created_at: string;
}

export interface MarketingFeedback {
  id: string;
  campanha_id: string;
  lead_quality_score: number;
  conversion_rate: number;
  custo_por_lead_qualificado: number;
  roi_campanha: number;
  sugestoes_otimizacao: string[];
  palavras_chave_eficazes: string[];
  horarios_maior_conversao: string[];
  demograficos_alta_conversao: Record<string, any>;
  feedback_date: string;
}

export interface PredictiveModel {
  modelo_id: string;
  tipo_modelo: 'conversion_prediction' | 'churn_prediction' | 'lead_scoring' | 'timing_optimization';
  acuracia: number;
  versao: string;
  features_utilizadas: string[];
  metricas_performance: Record<string, number>;
  data_treinamento: string;
  data_deploy: string;
  status: 'ativo' | 'treinando' | 'inativo';
}

export interface SystemMetrics {
  periodo: string;
  leads_totais: number;
  leads_qualificados: number;
  taxa_qualificacao: number;
  agendamentos_realizados: number;
  taxa_conversao_agendamento: number;
  comparecimento_agendamentos: number;
  taxa_comparecimento: number;
  roi_marketing: number;
  custo_aquisicao_cliente: number;
  valor_vida_cliente: number;
  tempo_medio_conversao: number;
}

export interface ClosedLoopData {
  campaign_performance: MarketingFeedback;
  lead_quality: IntentionAnalysis[];
  conversion_insights: AppointmentOptimization[];
  predictive_scores: PredictiveModel[];
  optimization_recommendations: string[];
}
