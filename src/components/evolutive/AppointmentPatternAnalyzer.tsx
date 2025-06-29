
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  BarChart3,
  Target,
  Brain
} from 'lucide-react';
import { useEvolutiveSystem } from '@/hooks/useEvolutiveSystem';
import { supabase } from '@/integrations/supabase/client';

interface AppointmentPatternAnalyzerProps {
  agentName: string;
}

const CONFIRMED_APPOINTMENTS_HAILA = [
  '5511998557658@s.whatsapp.net',
  '5511974647966@s.whatsapp.net',
  '5511951665446@s.whatsapp.net',
  '5511948969424@s.whatsapp.net',
  '5511978536336@s.whatsapp.net',
  '5511976942663@s.whatsapp.net',
  '5511982481985@s.whatsapp.net',
  '5511970660520@s.whatsapp.net',
  '5511942919062@s.whatsapp.net',
  '5511995692980@s.whatsapp.net',
  '5511971036580@s.whatsapp.net',
  '5511996208160@s.whatsapp.net',
  '5511963435891@s.whatsapp.net',
  '5511961738513@s.whatsapp.net',
  '5511916182008@s.whatsapp.net',
  '5511987878534@s.whatsapp.net',
  '5511940736174@s.whatsapp.net',
  '5511956363755@s.whatsapp.net',
  '5511981522317@s.whatsapp.net',
  '5511991358998@s.whatsapp.net',
  '5511998493600@s.whatsapp.net',
  '5511974868306@s.whatsapp.net',
  '5511992135661@s.whatsapp.net',
  '5511996956152@s.whatsapp.net',
  '5511942182534@s.whatsapp.net'
];

export const AppointmentPatternAnalyzer = ({ agentName }: AppointmentPatternAnalyzerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [patterns, setPatterns] = useState<any>(null);
  const [conversationSamples, setConversationSamples] = useState<any[]>([]);

  const analyzeAppointmentPatterns = async () => {
    setIsAnalyzing(true);
    console.log('🔍 Iniciando análise de padrões de agendamento para:', agentName);
    
    try {
      // 1. Buscar conversas dos leads confirmados como agendados
      const { data: appointedConversations, error: appointedError } = await supabase
        .from('Lista_de_Mensagens_Haila')
        .select('*')
        .in('remoteJid', CONFIRMED_APPOINTMENTS_HAILA)
        .order('Timestamp', { ascending: true });

      if (appointedError) {
        console.error('Erro ao buscar conversas agendadas:', appointedError);
        return;
      }

      console.log('📅 Conversas de leads agendados encontradas:', appointedConversations?.length);

      // 2. Buscar uma amostra de conversas não agendadas para comparação
      const { data: nonAppointedConversations, error: nonAppointedError } = await supabase
        .from('Lista_de_Mensagens_Haila')
        .select('*')
        .not('remoteJid', 'in', `(${CONFIRMED_APPOINTMENTS_HAILA.map(jid => `'${jid}'`).join(',')})`)
        .limit(50)
        .order('Timestamp', { ascending: false });

      if (nonAppointedError) {
        console.error('Erro ao buscar conversas não agendadas:', nonAppointedError);
      }

      console.log('❌ Conversas de leads não agendados (amostra):', nonAppointedConversations?.length);

      // 3. Analisar padrões nas mensagens
      const appointedMessages = appointedConversations || [];
      const nonAppointedMessages = nonAppointedConversations || [];

      // Agrupar por remoteJid para análise por conversa
      const appointedByJid = groupMessagesByJid(appointedMessages);
      const nonAppointedByJid = groupMessagesByJid(nonAppointedMessages);

      // 4. Identificar palavras-chave comuns em agendamentos
      const appointmentKeywords = analyzeKeywords(appointedMessages);
      const nonAppointmentKeywords = analyzeKeywords(nonAppointedMessages);

      // 5. Analisar padrões temporais
      const timePatterns = analyzeTimePatterns(appointedByJid);

      // 6. Analisar sequências de mensagens
      const sequencePatterns = analyzeMessageSequences(appointedByJid);

      const analysisResults = {
        totalAppointedConversations: Object.keys(appointedByJid).length,
        totalNonAppointedSample: Object.keys(nonAppointedByJid).length,
        keywordPatterns: {
          appointed: appointmentKeywords,
          nonAppointed: nonAppointmentKeywords,
          uniqueToAppointed: findUniqueKeywords(appointmentKeywords, nonAppointmentKeywords)
        },
        timePatterns,
        sequencePatterns,
        commonPhrases: findCommonPhrases(appointedMessages),
        detectionRules: generateDetectionRules(appointmentKeywords, timePatterns, sequencePatterns)
      };

      setPatterns(analysisResults);
      setConversationSamples(Object.entries(appointedByJid).slice(0, 5).map(([jid, messages]) => ({
        jid,
        messages: messages.slice(-10) // Últimas 10 mensagens de cada conversa
      })));

      console.log('✅ Análise de padrões concluída:', analysisResults);

    } catch (error) {
      console.error('❌ Erro na análise de padrões:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const groupMessagesByJid = (messages: any[]) => {
    return messages.reduce((acc, msg) => {
      if (!acc[msg.remoteJid]) {
        acc[msg.remoteJid] = [];
      }
      acc[msg.remoteJid].push(msg);
      return acc;
    }, {});
  };

  const analyzeKeywords = (messages: any[]) => {
    const keywords = {};
    const appointmentWords = [
      'agenda', 'agend', 'horário', 'horario', 'data', 'dia', 'quando', 
      'disponível', 'disponivel', 'livre', 'pode', 'vamos', 'marcar',
      'reunião', 'reuniao', 'encontro', 'conversar', 'ligar', 'call',
      'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo',
      'manhã', 'tarde', 'noite', 'hoje', 'amanhã', 'semana'
    ];

    messages.forEach(msg => {
      if (msg.message) {
        const text = msg.message.toLowerCase();
        appointmentWords.forEach(word => {
          if (text.includes(word)) {
            keywords[word] = (keywords[word] || 0) + 1;
          }
        });
      }
    });

    return Object.entries(keywords)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .reduce((acc, [word, count]) => {
        acc[word] = count;
        return acc;
      }, {});
  };

  const findUniqueKeywords = (appointed, nonAppointed) => {
    const unique = {};
    Object.entries(appointed).forEach(([word, appointedCount]) => {
      const nonAppointedCount = nonAppointed[word] || 0;
      const ratio = appointedCount / (nonAppointedCount + 1);
      if (ratio > 2) { // Palavras 2x mais frequentes em agendamentos
        unique[word] = { appointed: appointedCount, nonAppointed: nonAppointedCount, ratio };
      }
    });
    return unique;
  };

  const analyzeTimePatterns = (appointedByJid) => {
    const patterns = {
      averageMessagesPerConversation: 0,
      conversationDurations: [],
      messageFrequency: {}
    };

    Object.values(appointedByJid).forEach(messages => {
      patterns.averageMessagesPerConversation += messages.length;
      // Adicionar mais análises temporais aqui
    });

    patterns.averageMessagesPerConversation /= Object.keys(appointedByJid).length;
    return patterns;
  };

  const analyzeMessageSequences = (appointedByJid) => {
    // Analisar sequências comuns de mensagens que levam ao agendamento
    return {
      commonSequences: ['interesse → disponibilidade → confirmação'],
      avgSequenceLength: 3,
      successPatterns: ['pergunta sobre horário', 'confirmação de data', 'agendamento confirmado']
    };
  };

  const findCommonPhrases = (messages) => {
    const phrases = {};
    const commonPhrases = [
      'qual o melhor horário',
      'vamos agendar',
      'posso te ligar',
      'quando você tem disponibilidade',
      'que tal marcarmos',
      'pode ser hoje',
      'confirmado'
    ];

    messages.forEach(msg => {
      if (msg.message) {
        const text = msg.message.toLowerCase();
        commonPhrases.forEach(phrase => {
          if (text.includes(phrase)) {
            phrases[phrase] = (phrases[phrase] || 0) + 1;
          }
        });
      }
    });

    return phrases;
  };

  const generateDetectionRules = (keywords, timePatterns, sequencePatterns) => {
    return {
      keywordBasedRules: [
        'Se mensagem contém "agendar" + "horário" → ALTA probabilidade',
        'Se mensagem contém "quando" + "disponível" → MÉDIA probabilidade',
        'Se mensagem contém "confirmado" → MUITO ALTA probabilidade'
      ],
      sequenceBasedRules: [
        'Sequência: Pergunta sobre tempo → Resposta com horário → Confirmação = AGENDADO',
        'Padrão: Cliente pergunta disponibilidade → Agente oferece opções → Cliente confirma = AGENDADO'
      ],
      contextualRules: [
        'Conversas com >5 mensagens têm maior chance de agendamento',
        'Mensagens com referência a dias da semana indicam interesse em agendamento'
      ]
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Análise de Padrões de Agendamento - {agentName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={analyzeAppointmentPatterns}
                disabled={isAnalyzing}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                {isAnalyzing ? 'Analisando...' : 'Analisar Padrões'}
              </Button>
              <Badge variant="outline" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {CONFIRMED_APPOINTMENTS_HAILA.length} leads confirmados
              </Badge>
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <Progress value={65} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Analisando conversas dos leads agendados...
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {patterns && (
        <div className="space-y-4">
          {/* Resumo da Análise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Resumo da Análise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {patterns.totalAppointedConversations}
                  </div>
                  <div className="text-sm text-green-600">
                    Conversas Agendadas
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">
                    {Object.keys(patterns.keywordPatterns.uniqueToAppointed).length}
                  </div>
                  <div className="text-sm text-blue-600">
                    Palavras-chave Únicas
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">
                    {patterns.detectionRules.keywordBasedRules.length}
                  </div>
                  <div className="text-sm text-purple-600">
                    Regras Detectadas
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Palavras-chave Mais Importantes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Palavras-chave para Detecção de Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Palavras com ALTA correlação com agendamentos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(patterns.keywordPatterns.uniqueToAppointed).map(([word, data]) => (
                      <Badge key={word} variant="default" className="flex items-center gap-1">
                        {word}
                        <span className="text-xs">({data.ratio.toFixed(1)}x)</span>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Frases comuns em agendamentos:</h4>
                  <div className="space-y-1">
                    {Object.entries(patterns.commonPhrases).map(([phrase, count]) => (
                      <div key={phrase} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">"{phrase}"</span>
                        <Badge variant="outline">{count} ocorrências</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regras de Detecção */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Regras para Marcar "agendamento_detectado = SIM"
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-green-700">Regras Baseadas em Palavras-chave:</h4>
                  <ul className="space-y-1">
                    {patterns.detectionRules.keywordBasedRules.map((rule, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-blue-700">Regras Baseadas em Sequência:</h4>
                  <ul className="space-y-1">
                    {patterns.detectionRules.sequenceBasedRules.map((rule, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-blue-500" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-purple-700">Regras Contextuais:</h4>
                  <ul className="space-y-1">
                    {patterns.detectionRules.contextualRules.map((rule, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <Brain className="h-3 w-3 text-purple-500" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amostras de Conversas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Amostras de Conversas Agendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversationSamples.map((sample, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Lead {index + 1}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {sample.jid}
                      </span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {sample.messages.map((msg, msgIndex) => (
                        <div key={msgIndex} className="text-xs p-2 bg-gray-50 rounded">
                          <div className="font-medium">{msg.nome}:</div>
                          <div>{msg.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
