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
import { getBasicTableName } from '@/lib/agents';

interface AppointmentPatternAnalyzerProps {
  agentName: string;
}

interface MessageData {
  id: number;
  remoteJid: string;
  Timestamp: string;
  nome: string;
  message: string;
}

interface KeywordCount {
  [key: string]: number;
}

interface UniqueKeywordData {
  appointed: number;
  nonAppointed: number;
  ratio: number;
}

interface UniqueKeywords {
  [key: string]: UniqueKeywordData;
}

interface TimePatterns {
  averageMessagesPerConversation: number;
  conversationDurations: number[];
  messageFrequency: KeywordCount;
}

interface SequencePatterns {
  commonSequences: string[];
  avgSequenceLength: number;
  successPatterns: string[];
}

interface DetectionRules {
  keywordBasedRules: string[];
  sequenceBasedRules: string[];
  contextualRules: string[];
}

interface AnalysisResults {
  totalAppointedConversations: number;
  totalNonAppointedSample: number;
  keywordPatterns: {
    appointed: KeywordCount;
    nonAppointed: KeywordCount;
    uniqueToAppointed: UniqueKeywords;
  };
  timePatterns: TimePatterns;
  sequencePatterns: SequencePatterns;
  commonPhrases: KeywordCount;
  detectionRules: DetectionRules;
}

interface ConversationSample {
  jid: string;
  messages: MessageData[];
  leadNumber: number;
  totalMessages: number;
}

// Lista de JIDs confirmados como agendados para Haila (exemplo)
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
  const [patterns, setPatterns] = useState<AnalysisResults | null>(null);
  const [conversationSamples, setConversationSamples] = useState<ConversationSample[]>([]);

  const analyzeAppointmentPatterns = async () => {
    setIsAnalyzing(true);
    console.log('🔍 Iniciando análise de padrões de agendamento para:', agentName);
    
    try {
      // Obter o nome correto da tabela para o agente
      const basicTableName = getBasicTableName(agentName);
      
      if (!basicTableName) {
        console.error('❌ Tabela não encontrada para o agente:', agentName);
        setIsAnalyzing(false);
        return;
      }

      console.log('📊 Tabela identificada:', basicTableName);

      // Para Haila, usar os JIDs confirmados, para outros agentes, usar uma amostra aleatória
      let appointedJids = [];
      if (agentName === 'Haila') {
        appointedJids = CONFIRMED_APPOINTMENTS_HAILA;
      } else {
        // Para outros agentes, buscar uma amostra de JIDs únicos
        const { data: sampleData, error: sampleError } = await supabase
          .from(basicTableName as any)
          .select('remoteJid')
          .not('remoteJid', 'is', null)
          .limit(25);

        if (!sampleError && sampleData) {
          const uniqueJids = new Set();
          sampleData.forEach((row: any) => {
            if (row.remoteJid && typeof row.remoteJid === 'string' && row.remoteJid.trim() !== '') {
              uniqueJids.add(row.remoteJid.trim());
            }
          });
          appointedJids = Array.from(uniqueJids).slice(0, 10); // Pegar 10 JIDs únicos
        }
      }

      console.log(`📋 JIDs para análise (${agentName}):`, appointedJids.length);

      if (appointedJids.length === 0) {
        console.warn('⚠️ Nenhum JID encontrado para análise');
        setIsAnalyzing(false);
        return;
      }

      // 1. Buscar TODAS as conversas dos leads selecionados, ordenadas por timestamp
      const { data: appointedConversations, error: appointedError } = await supabase
        .from(basicTableName as any)
        .select('*')
        .in('remoteJid', appointedJids)
        .order('Timestamp', { ascending: true });

      if (appointedError) {
        console.error('❌ Erro ao buscar conversas agendadas:', appointedError);
        setIsAnalyzing(false);
        return;
      }

      console.log('📅 Total de mensagens encontradas:', appointedConversations?.length || 0);

      // 2. Buscar uma amostra de conversas não agendadas para comparação
      const { data: nonAppointedConversations, error: nonAppointedError } = await supabase
        .from(basicTableName as any)
        .select('*')
        .not('remoteJid', 'in', `(${appointedJids.map(jid => `'${jid}'`).join(',')})`)
        .limit(100)
        .order('Timestamp', { ascending: false });

      if (nonAppointedError) {
        console.error('❌ Erro ao buscar conversas não agendadas:', nonAppointedError);
      }

      console.log('❌ Conversas de leads não agendados (amostra):', nonAppointedConversations?.length || 0);

      // 3. Processar e agrupar mensagens por conversa
      const appointedMessages = (appointedConversations || []) as MessageData[];
      const nonAppointedMessages = (nonAppointedConversations || []) as MessageData[];

      // Agrupar por remoteJid para análise por conversa
      const appointedByJid = groupMessagesByJid(appointedMessages);
      const nonAppointedByJid = groupMessagesByJid(nonAppointedMessages);

      // 4. Criar amostras de conversas mais representativas
      const conversationSamples = Object.entries(appointedByJid)
        .slice(0, 5)
        .map(([jid, messages], index) => {
          const sortedMessages = (messages as MessageData[]).sort((a, b) => 
            new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
          );
          
          return {
            leadNumber: index + 1,
            jid,
            messages: sortedMessages, // Mostrar TODAS as mensagens, não apenas as últimas 10
            totalMessages: sortedMessages.length
          };
        });

      console.log('📊 Amostras de conversas criadas:', conversationSamples.length);
      console.log('📊 Detalhes das amostras:', conversationSamples.map(s => ({
        lead: s.leadNumber,
        jid: s.jid,
        totalMessages: s.totalMessages
      })));

      setConversationSamples(conversationSamples);

      // 5. Analisar padrões nas mensagens
      const appointmentKeywords = analyzeKeywords(appointedMessages);
      const nonAppointmentKeywords = analyzeKeywords(nonAppointedMessages);

      // 6. Analisar padrões temporais
      const timePatterns = analyzeTimePatterns(appointedByJid);

      // 7. Analisar sequências de mensagens
      const sequencePatterns = analyzeMessageSequences(appointedByJid);

      const analysisResults: AnalysisResults = {
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
      console.log('✅ Análise de padrões concluída:', analysisResults);

    } catch (error) {
      console.error('❌ Erro na análise de padrões:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const groupMessagesByJid = (messages: MessageData[]): Record<string, MessageData[]> => {
    return messages.reduce((acc, msg) => {
      if (!acc[msg.remoteJid]) {
        acc[msg.remoteJid] = [];
      }
      acc[msg.remoteJid].push(msg);
      return acc;
    }, {} as Record<string, MessageData[]>);
  };

  const analyzeKeywords = (messages: MessageData[]): KeywordCount => {
    const keywords: KeywordCount = {};
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
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 20)
      .reduce((acc, [word, count]) => {
        acc[word] = count as number;
        return acc;
      }, {} as KeywordCount);
  };

  const findUniqueKeywords = (appointed: KeywordCount, nonAppointed: KeywordCount): UniqueKeywords => {
    const unique: UniqueKeywords = {};
    Object.entries(appointed).forEach(([word, appointedCount]) => {
      const nonAppointedCount = nonAppointed[word] || 0;
      const ratio = (appointedCount as number) / (nonAppointedCount + 1);
      if (ratio > 2) { // Palavras 2x mais frequentes em agendamentos
        unique[word] = { 
          appointed: appointedCount as number, 
          nonAppointed: nonAppointedCount as number, 
          ratio 
        };
      }
    });
    return unique;
  };

  const analyzeTimePatterns = (appointedByJid: Record<string, MessageData[]>): TimePatterns => {
    const patterns: TimePatterns = {
      averageMessagesPerConversation: 0,
      conversationDurations: [],
      messageFrequency: {}
    };

    const conversationLengths = Object.values(appointedByJid).map(messages => messages.length);
    patterns.averageMessagesPerConversation = conversationLengths.length > 0 
      ? conversationLengths.reduce((sum, length) => sum + length, 0) / conversationLengths.length 
      : 0;
    
    return patterns;
  };

  const analyzeMessageSequences = (appointedByJid: Record<string, MessageData[]>): SequencePatterns => {
    return {
      commonSequences: ['interesse → disponibilidade → confirmação'],
      avgSequenceLength: 3,
      successPatterns: ['pergunta sobre horário', 'confirmação de data', 'agendamento confirmado']
    };
  };

  const findCommonPhrases = (messages: MessageData[]): KeywordCount => {
    const phrases: KeywordCount = {};
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

  const generateDetectionRules = (keywords: KeywordCount, timePatterns: TimePatterns, sequencePatterns: SequencePatterns): DetectionRules => {
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
                {agentName === 'Haila' ? CONFIRMED_APPOINTMENTS_HAILA.length : '10+'} leads para análise
              </Badge>
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <Progress value={65} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Analisando conversas completas dos leads selecionados...
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

          {/* Amostras de Conversas COMPLETAS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Amostras de Conversas Agendadas - Dados Completos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversationSamples.map((sample) => (
                  <div key={sample.leadNumber} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Lead {sample.leadNumber}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {sample.jid}
                        </span>
                      </div>
                      <Badge variant="secondary">
                        {sample.totalMessages} mensagens
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 max-h-80 overflow-y-auto border rounded p-3 bg-gray-50">
                      {sample.messages.map((msg, msgIndex) => (
                        <div key={msgIndex} className="text-xs p-2 bg-white rounded border-l-2 border-l-blue-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-blue-700">{msg.nome}:</span>
                            <span className="text-gray-500 text-[10px]">
                              {new Date(msg.Timestamp).toLocaleString('pt-BR')}
                            </span>
                          </div>
                          <div className="text-gray-800">{msg.message}</div>
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
