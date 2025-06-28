
export interface AgentTableMapping {
  basic: string;
  metrics: string;
}

export interface ObjectionData {
  id: string;
  agent_name: string;
  objection_category: string;
  funnel_stage: string;
  intensity_level: string;
  script_effectiveness: boolean | null;
  conversion_impact: boolean | null;
  occurrence_timestamp: string;
  lead_source?: string;
  lead_source_analysis?: any;
  cross_channel_insights?: any;
}

export interface AnalysisResult {
  id?: string;
  agent_name?: string;
  analysis_type?: string;
  timestamp?: string;
  data?: any;
  funnel_data?: any;
  performance_metrics?: any;
  sentiment_analysis?: any;
  system_metrics?: any;
  objection_analysis?: any;
  complete_analysis?: any;
  lead_source_analysis?: any;
}
