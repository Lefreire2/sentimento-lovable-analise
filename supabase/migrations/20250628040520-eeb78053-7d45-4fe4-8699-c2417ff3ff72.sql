
-- Criar tabela para análise de objeções
CREATE TABLE public.objection_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_name TEXT NOT NULL,
  remote_jid TEXT,
  conversation_id TEXT,
  objection_category TEXT NOT NULL CHECK (objection_category IN (
    'Preço', 'Agenda/Tempo', 'Confiança/Medo', 'Necessidade/Urgência', 
    'Autoridade/Decisão', 'Localização', 'Outros'
  )),
  funnel_stage TEXT NOT NULL CHECK (funnel_stage IN (
    'Início do Contato', 'Pós-Apresentação da Solução', 
    'Pós-Apresentação do Preço', 'Na Tentativa de Agendamento'
  )),
  intensity_level TEXT NOT NULL CHECK (intensity_level IN ('Baixa', 'Média', 'Alta')),
  objection_text TEXT,
  script_effectiveness BOOLEAN DEFAULT NULL, -- TRUE se contornou, FALSE se não contornou, NULL se não aplicável
  conversion_impact BOOLEAN DEFAULT NULL, -- TRUE se converteu após objeção, FALSE se não converteu
  occurrence_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índices para melhor performance
CREATE INDEX idx_objection_analysis_agent_name ON public.objection_analysis(agent_name);
CREATE INDEX idx_objection_analysis_category ON public.objection_analysis(objection_category);
CREATE INDEX idx_objection_analysis_funnel_stage ON public.objection_analysis(funnel_stage);
CREATE INDEX idx_objection_analysis_timestamp ON public.objection_analysis(occurrence_timestamp);

-- Habilitar RLS (se necessário)
ALTER TABLE public.objection_analysis ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura de todos os dados (ajustar conforme necessário)
CREATE POLICY "Allow read access to objection_analysis" 
  ON public.objection_analysis 
  FOR SELECT 
  USING (true);

-- Política para permitir inserção (ajustar conforme necessário)
CREATE POLICY "Allow insert access to objection_analysis" 
  ON public.objection_analysis 
  FOR INSERT 
  WITH CHECK (true);
