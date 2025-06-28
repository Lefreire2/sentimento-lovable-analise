
-- Adicionar campo de fonte do lead na tabela de análise de objeções
ALTER TABLE objection_analysis 
ADD COLUMN lead_source TEXT;

-- Adicionar campos de análise cruzada
ALTER TABLE objection_analysis 
ADD COLUMN lead_source_analysis JSONB,
ADD COLUMN cross_channel_insights JSONB;

-- Criar índice para melhor performance nas consultas por fonte
CREATE INDEX idx_objection_analysis_lead_source ON objection_analysis(lead_source);
CREATE INDEX idx_objection_analysis_agent_source ON objection_analysis(agent_name, lead_source);

-- Criar tabela para armazenar configurações de fontes de lead
CREATE TABLE IF NOT EXISTS lead_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT NOT NULL UNIQUE,
  source_category TEXT NOT NULL, -- 'social', 'paid_ads', 'organic', 'referral'
  source_description TEXT,
  utm_parameters JSONB,
  qualification_level TEXT DEFAULT 'medium', -- 'high', 'medium', 'low'
  expected_objection_profile JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir fontes padrão
INSERT INTO lead_sources (source_name, source_category, source_description, qualification_level) VALUES
('Instagram Feed', 'social', 'Posts do Instagram', 'low'),
('Instagram Stories', 'social', 'Stories do Instagram', 'low'),
('Google Ads', 'paid_ads', 'Anúncios do Google', 'medium'),
('Google Orgânico', 'organic', 'Busca orgânica do Google', 'high'),
('Blog', 'organic', 'Artigos do blog', 'high'),
('Indicação', 'referral', 'Indicação de clientes', 'high'),
('Site Direto', 'organic', 'Acesso direto ao site', 'medium'),
('Facebook Ads', 'paid_ads', 'Anúncios do Facebook', 'medium'),
('YouTube', 'social', 'Vídeos do YouTube', 'medium'),
('WhatsApp Grupos', 'social', 'Grupos do WhatsApp', 'low');

-- Criar tabela de métricas por fonte
CREATE TABLE IF NOT EXISTS lead_source_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_name TEXT NOT NULL,
  lead_source TEXT NOT NULL,
  analysis_period TEXT NOT NULL,
  total_leads INTEGER DEFAULT 0,
  total_objections INTEGER DEFAULT 0,
  objection_rate DECIMAL(5,2) DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  avg_objection_intensity DECIMAL(3,2) DEFAULT 0,
  most_common_objection TEXT,
  script_effectiveness_rate DECIMAL(5,2) DEFAULT 0,
  cost_per_appointment DECIMAL(10,2),
  roi_score DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar índices para performance
CREATE INDEX idx_lead_source_metrics_agent ON lead_source_metrics(agent_name);
CREATE INDEX idx_lead_source_metrics_source ON lead_source_metrics(lead_source);
CREATE INDEX idx_lead_source_metrics_period ON lead_source_metrics(analysis_period);
