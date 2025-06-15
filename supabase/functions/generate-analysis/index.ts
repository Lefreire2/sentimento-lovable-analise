
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, provider = 'anthropic' } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "O prompt está ausente no corpo da solicitação." }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let generatedText;

    if (provider === 'anthropic' && anthropicApiKey) {
      // Usar Anthropic Claude como primeira opção
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
        console.error('Anthropic API error:', errorData);
        throw new Error(errorData.error?.message || 'Falha ao buscar dados da Anthropic');
      }

      const data = await response.json();
      generatedText = data.content[0].text;

    } else if (openAIApiKey) {
      // Fallback para OpenAI se Anthropic não estiver disponível
      if (!anthropicApiKey) {
        console.log('Anthropic API key não encontrada, usando OpenAI como fallback');
      }

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
        console.error('OpenAI API error:', errorData);
        throw new Error(errorData.error?.message || 'Falha ao buscar dados da OpenAI');
      }

      const data = await response.json();
      generatedText = data.choices[0].message.content;

    } else {
      return new Response(JSON.stringify({ 
        error: "Nenhuma chave de API configurada. Configure ANTHROPIC_API_KEY ou OPENAI_API_KEY nos segredos do Supabase." 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      generatedText,
      provider: anthropicApiKey ? 'anthropic' : 'openai'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-analysis function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
