
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FunnelAnalysisData {
  remoteJid: string;
  nome: string;
  data_conversa: string;
  origem?: string;
  mensagens_concatenadas: string;
  sentimento_geral_conversa: string;
  sentimento_usuario: string;
  sentimento_atendente: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { funnelData, provider = 'anthropic' }: { 
      funnelData: FunnelAnalysisData, 
      provider?: string 
    } = await req.json();

    if (!funnelData) {
      return new Response(JSON.stringify({ error: "Dados do funil são obrigatórios." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('🔍 Iniciando análise de funil para:', funnelData.nome);

    const promptTemplate = `Você é um analista sênior especializado em conversas comerciais via WhatsApp em clínicas médicas. Receberá o histórico de mensagens de um lead com o atendente, e deverá analisar:

1. Até qual **etapa do funil conversacional** o lead chegou.
2. Em qual etapa ele **parou ou desistiu**.
3. Se houve falhas do atendente, timing ruim, dúvidas não respondidas ou sentimento negativo.
4. Se há **potencial de reengajamento** futuro.

---

## 📌 Etapas do Funil

1. **Lead Iniciado** – O lead enviou a primeira mensagem.
2. **Lead Respondido** – A secretária respondeu o lead.
3. **Levantada de Mão** – O lead demonstrou interesse claro ("quero agendar", "valores", etc.).
4. **Apresentação de Oferta** – A secretária apresentou valor, datas ou detalhes da consulta.
5. **Confirmação do Lead** – O lead confirmou ou mostrou aceitação direta.
6. **Agendamento Confirmado** – A secretária registrou o agendamento com data/hora.

---

## 📄 Dados recebidos:

- **ID do Lead:** {{remoteJid}}  
- **Nome do Lead:** {{nome}}  
- **Data da conversa:** {{data_conversa}}  
- **Origem do lead:** {{origem}}  
- **Mensagens:** {{mensagens_concatenadas}}  
- **Sentimento geral da conversa:** {{sentimento_geral_conversa}}  
- **Sentimento do usuário:** {{sentimento_usuario}}  
- **Sentimento do atendente:** {{sentimento_atendente}}

---

## ✍️ Sua tarefa:

Analise as mensagens e:

1. Liste a última etapa do funil que o lead atingiu.
2. Informe claramente onde o lead parou (e por quê).
3. Descreva se foi uma falha técnica, de abordagem ou tempo de resposta.
4. Diga se o lead ainda pode ser reengajado com abordagem diferente.
5. Indique ações recomendadas para evitar esse tipo de abandono no futuro.

---

### 🧠 Formato da resposta

**Lead:** {{nome}} (ID: {{remoteJid}})  
**Última Etapa Alcançada:** [Etapa 1 a 6]  
**Ponto de Interrupção:** [ex: Parou após receber valores – não respondeu mais]  
**Justificativa:** [comportamento do lead, emoção detectada, falha da secretária]  
**Reengajamento Possível:** [Sim/Não]  
**Sugestão:** [ex: recontato em 3 dias com abordagem personalizada por objeção]`;

    // Substituir placeholders no template
    const prompt = promptTemplate
      .replace(/\{\{remoteJid\}\}/g, funnelData.remoteJid || 'N/A')
      .replace(/\{\{nome\}\}/g, funnelData.nome || 'N/A')
      .replace(/\{\{data_conversa\}\}/g, funnelData.data_conversa || 'N/A')
      .replace(/\{\{origem\}\}/g, funnelData.origem || 'N/A')
      .replace(/\{\{mensagens_concatenadas\}\}/g, funnelData.mensagens_concatenadas || 'N/A')
      .replace(/\{\{sentimento_geral_conversa\}\}/g, funnelData.sentimento_geral_conversa || 'N/A')
      .replace(/\{\{sentimento_usuario\}\}/g, funnelData.sentimento_usuario || 'N/A')
      .replace(/\{\{sentimento_atendente\}\}/g, funnelData.sentimento_atendente || 'N/A');

    let analiseGerada;

    if (provider === 'anthropic' && anthropicApiKey) {
      console.log('🤖 Usando Anthropic Claude para análise de funil');
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicApiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          temperature: 0.7,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erro da API Anthropic:', errorData);
        throw new Error(errorData.error?.message || 'Falha na análise com Anthropic');
      }

      const data = await response.json();
      analiseGerada = data.content[0].text;

    } else if (openAIApiKey) {
      console.log('🤖 Usando OpenAI GPT para análise de funil');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erro da API OpenAI:', errorData);
        throw new Error(errorData.error?.message || 'Falha na análise com OpenAI');
      }

      const data = await response.json();
      analiseGerada = data.choices[0].message.content;

    } else {
      return new Response(JSON.stringify({ 
        error: "Nenhuma chave de API configurada. Configure ANTHROPIC_API_KEY ou OPENAI_API_KEY." 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('✅ Análise de funil concluída com sucesso');

    return new Response(JSON.stringify({ 
      analise_gerada: analiseGerada,
      provider: anthropicApiKey ? 'anthropic' : 'openai',
      lead_id: funnelData.remoteJid,
      lead_name: funnelData.nome
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Erro na função de análise de funil:', error);
    return new Response(JSON.stringify({ 
      error: `Erro na análise: ${error.message}` 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
