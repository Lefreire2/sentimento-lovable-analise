
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
  console.log('🔍 Análise de funil - Requisição recebida:', req.method);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('🔍 Retornando headers CORS');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔍 Processando requisição de análise de funil');
    
    const requestBody = await req.json();
    console.log('🔍 Corpo da requisição:', JSON.stringify(requestBody, null, 2));
    
    const { funnelData, provider = 'anthropic' }: { 
      funnelData: FunnelAnalysisData, 
      provider?: string 
    } = requestBody;

    if (!funnelData) {
      console.error('❌ Dados do funil não fornecidos');
      return new Response(JSON.stringify({ error: "Dados do funil são obrigatórios." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('🔍 Iniciando análise de funil para:', funnelData.nome);
    console.log('🔍 Provider selecionado:', provider);
    console.log('🔍 Anthropic API Key disponível:', !!anthropicApiKey);
    console.log('🔍 OpenAI API Key disponível:', !!openAIApiKey);

    // Se não há nenhuma chave de API, retornar análise simulada
    if (!anthropicApiKey && !openAIApiKey) {
      console.log('⚠️ Nenhuma chave de API configurada, retornando análise simulada');
      
      const simulatedAnalysis = `**Lead:** ${funnelData.nome} (ID: ${funnelData.remoteJid})
**Última Etapa Alcançada:** Etapa 3 - Levantada de Mão
**Ponto de Interrupção:** Parou após demonstrar interesse inicial - não respondeu à apresentação da oferta
**Justificativa:** Lead mostrou interesse mas não reagiu aos valores apresentados. Sentimento detectado: ${funnelData.sentimento_usuario}
**Reengajamento Possível:** Sim
**Sugestão:** Recontato em 2-3 dias com abordagem focada em benefícios e não apenas preços. Considerar oferta personalizada ou desconto.

**Análise Detalhada:**
- O lead iniciou a conversa demonstrando interesse genuíno
- A secretária respondeu adequadamente na primeira abordagem
- Houve quebra no fluxo após apresentação de valores
- Sentimento geral da conversa: ${funnelData.sentimento_geral_conversa}
- Oportunidade de recuperação através de follow-up estratégico`;

      return new Response(JSON.stringify({ 
        analise_gerada: simulatedAnalysis,
        provider: 'simulado',
        lead_id: funnelData.remoteJid,
        lead_name: funnelData.nome
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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

- **ID do Lead:** ${funnelData.remoteJid}  
- **Nome do Lead:** ${funnelData.nome}  
- **Data da conversa:** ${funnelData.data_conversa}  
- **Origem do lead:** ${funnelData.origem}  
- **Mensagens:** ${funnelData.mensagens_concatenadas}  
- **Sentimento geral da conversa:** ${funnelData.sentimento_geral_conversa}  
- **Sentimento do usuário:** ${funnelData.sentimento_usuario}  
- **Sentimento do atendente:** ${funnelData.sentimento_atendente}

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

**Lead:** ${funnelData.nome} (ID: ${funnelData.remoteJid})  
**Última Etapa Alcançada:** [Etapa 1 a 6]  
**Ponto de Interrupção:** [ex: Parou após receber valores – não respondeu mais]  
**Justificativa:** [comportamento do lead, emoção detectada, falha da secretária]  
**Reengajamento Possível:** [Sim/Não]  
**Sugestão:** [ex: recontato em 3 dias com abordagem personalizada por objeção]`;

    let analiseGerada;

    if (provider === 'anthropic' && anthropicApiKey) {
      console.log('🤖 Usando Anthropic Claude para análise de funil');
      
      try {
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
                content: promptTemplate
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
        console.log('✅ Análise Anthropic concluída');

      } catch (error) {
        console.error('❌ Erro na chamada Anthropic:', error);
        throw error;
      }

    } else if (openAIApiKey) {
      console.log('🤖 Usando OpenAI GPT para análise de funil');
      
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'user', content: promptTemplate }
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
        console.log('✅ Análise OpenAI concluída');

      } catch (error) {
        console.error('❌ Erro na chamada OpenAI:', error);
        throw error;
      }

    } else {
      console.error('❌ Nenhuma chave de API válida encontrada');
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
