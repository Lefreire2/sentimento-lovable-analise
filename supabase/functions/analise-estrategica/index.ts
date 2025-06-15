
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConversationData {
  remoteJid: string;
  nome: string;
  origem?: string;
  levantada_de_mao?: string;
  agendou?: string;
  sentimento_geral_conversa: string;
  sentimento_atendente: string;
  sentimento_usuario: string;
  tempo_primeira_resposta: number;
  tempo_medio_resposta: number;
  duracao_total_conversa: number;
  aderencia_script_nivel: string;
  pontuacao_aderencia_script: number;
  termo_chave_conversao: string;
  data_conversa: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationData, provider = 'anthropic' }: { 
      conversationData: ConversationData, 
      provider?: string 
    } = await req.json();

    if (!conversationData) {
      return new Response(JSON.stringify({ error: "Dados da conversa são obrigatórios." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('📊 Iniciando análise estratégica para:', conversationData.nome);

    const promptTemplate = `Você é um analista sênior de atendimento e performance comercial em clínicas médicas. Receberá os dados de uma conversa com um lead identificado por remoteJid e deverá fazer uma análise com base em sentimento, tráfego, intenção de agendamento e contexto temporal.

Seu objetivo é responder com profundidade e clareza os seguintes aspectos:

---

## 📌 CONTEXTO ESTRATÉGICO

- A clínica está otimizando seu atendimento via WhatsApp.
- Desejamos entender como a qualidade da conversa influencia a conversão.
- Esse lead chegou via tráfego pago ou canal orgânico (ver campo "origem").
- O campo \`levantada_de_mao\` indica se o lead demonstrou interesse direto.
- O campo \`agendou\` indica se o atendimento resultou em agendamento real.
- O campo \`data_conversa\` indica quando a interação ocorreu.

---

## 🧾 DADOS DE ENTRADA

- Lead ID (remoteJid): {{remoteJid}}  
- Nome do paciente: {{nome}}  
- Origem do lead: {{origem}}  
- Levantada de mão: {{levantada_de_mao}}  
- Agendou consulta: {{agendou}}  
- Data da conversa: {{data_conversa}}  
- Sentimento geral da conversa: {{sentimento_geral_conversa}}  
- Sentimento do atendente: {{sentimento_atendente}}  
- Sentimento do usuário: {{sentimento_usuario}}  
- Tempo da primeira resposta: {{tempo_primeira_resposta}} minutos  
- Tempo médio de resposta: {{tempo_medio_resposta}} minutos  
- Duração total da conversa: {{duracao_total_conversa}} minutos  
- Aderência ao script: {{aderencia_script_nivel}} (pontuação: {{pontuacao_aderencia_script}})  
- Termos-chave identificados: {{termo_chave_conversao}}

---

## 🎯 OBJETIVO DA ANÁLISE

Analise com base nos dados:

1. O lead foi bem atendido emocionalmente?
2. Houve empatia, acolhimento e clareza nas respostas?
3. O atendente seguiu o script de forma estratégica?
4. A origem do lead influenciou na abordagem?
5. A data da conversa pode ter impactado o resultado (ex: volume alto, segunda-feira)?
6. Se o lead **levantou a mão**, o atendimento aproveitou essa oportunidade?
7. Se o lead **não agendou**, o que pode ter causado a desistência?
8. Qual o potencial de conversão futura, se houver recontato?

---

## ✍️ RESPONDA NO SEGUINTE FORMATO:

### 📊 Análise da Conversa com {{nome}} (ID: {{remoteJid}})

**Data da conversa:** {{data_conversa}}  
**Origem do lead:** {{origem}}  
**Levantou a mão:** {{levantada_de_mao}}  
**Agendou consulta:** {{agendou}}  
**Sentimento Geral:** {{sentimento_geral_conversa}}  
**Tempo médio de resposta:** {{tempo_medio_resposta}} min  
**Aderência ao Script:** {{aderencia_script_nivel}} ({{pontuacao_aderencia_script}})

---

### ✅ Pontos Positivos
[listar qualidades da conversa, empatia, técnica, timing]

---

### ⚠️ Pontos Críticos
[erros, falta de fechamento, tempo ruim, perda de intenção]

---

### 🧠 Diagnóstico Comercial
- Esse lead tinha ou não intenção clara?
- O atendente conduziu bem até a conversão?
- Qual foi o gargalo?
- A data da conversa pode ter influenciado negativamente?

---

### 🔁 Oportunidade de Recontato
[sugestões práticas de reabordagem caso aplicável]

---

### 🎯 Nota Final: X.X / 10`;

    // Substituir placeholders no template
    const prompt = promptTemplate
      .replace(/\{\{remoteJid\}\}/g, conversationData.remoteJid || 'N/A')
      .replace(/\{\{nome\}\}/g, conversationData.nome || 'N/A')
      .replace(/\{\{origem\}\}/g, conversationData.origem || 'N/A')
      .replace(/\{\{levantada_de_mao\}\}/g, conversationData.levantada_de_mao || 'N/A')
      .replace(/\{\{agendou\}\}/g, conversationData.agendou || 'N/A')
      .replace(/\{\{data_conversa\}\}/g, conversationData.data_conversa || 'N/A')
      .replace(/\{\{sentimento_geral_conversa\}\}/g, conversationData.sentimento_geral_conversa || 'N/A')
      .replace(/\{\{sentimento_atendente\}\}/g, conversationData.sentimento_atendente || 'N/A')
      .replace(/\{\{sentimento_usuario\}\}/g, conversationData.sentimento_usuario || 'N/A')
      .replace(/\{\{tempo_primeira_resposta\}\}/g, conversationData.tempo_primeira_resposta?.toString() || '0')
      .replace(/\{\{tempo_medio_resposta\}\}/g, conversationData.tempo_medio_resposta?.toString() || '0')
      .replace(/\{\{duracao_total_conversa\}\}/g, conversationData.duracao_total_conversa?.toString() || '0')
      .replace(/\{\{aderencia_script_nivel\}\}/g, conversationData.aderencia_script_nivel || 'N/A')
      .replace(/\{\{pontuacao_aderencia_script\}\}/g, conversationData.pontuacao_aderencia_script?.toString() || '0')
      .replace(/\{\{termo_chave_conversao\}\}/g, conversationData.termo_chave_conversao || 'N/A');

    let analiseGerada;

    if (provider === 'anthropic' && anthropicApiKey) {
      console.log('🤖 Usando Anthropic Claude para análise estratégica');
      
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
      console.log('🤖 Usando OpenAI GPT para análise estratégica');
      
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

    console.log('✅ Análise estratégica concluída com sucesso');

    return new Response(JSON.stringify({ 
      analise_gerada: analiseGerada,
      provider: anthropicApiKey ? 'anthropic' : 'openai',
      conversation_id: conversationData.remoteJid,
      patient_name: conversationData.nome
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Erro na função de análise estratégica:', error);
    return new Response(JSON.stringify({ 
      error: `Erro na análise: ${error.message}` 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
