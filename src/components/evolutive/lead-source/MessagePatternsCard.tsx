
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, TrendingUp, Users } from 'lucide-react';

interface MessagePatternsCardProps {
  messageAnalysis: {
    message_patterns: {
      greeting_patterns: string[];
      interest_indicators: string[];
      source_mentions: string[];
    };
    engagement_metrics: {
      total_messages: number;
      avg_message_length: number;
      response_patterns: string[];
    };
  };
}

export const MessagePatternsCard = ({ messageAnalysis }: MessagePatternsCardProps) => {
  const { message_patterns, engagement_metrics } = messageAnalysis;

  return (
    <div className="space-y-4">
      {/* Métricas de Engajamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Métricas de Engajamento das Mensagens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{engagement_metrics.total_messages}</div>
              <div className="text-sm text-muted-foreground">Total de Mensagens</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{engagement_metrics.avg_message_length}</div>
              <div className="text-sm text-muted-foreground">Tamanho Médio</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{engagement_metrics.response_patterns.length}</div>
              <div className="text-sm text-muted-foreground">Padrões de Resposta</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Padrões de Mensagem */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Padrões Identificados nas Mensagens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Menções de Fontes */}
            {message_patterns.source_mentions.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Fontes Mencionadas pelos Leads:</h4>
                <div className="flex flex-wrap gap-2">
                  {message_patterns.source_mentions.map((mention, index) => (
                    <Badge key={index} variant="secondary">
                      {mention}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Padrões de Saudação */}
            {message_patterns.greeting_patterns.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Padrões de Saudação Mais Comuns:</h4>
                <div className="space-y-2">
                  {message_patterns.greeting_patterns.map((pattern, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                      "{pattern}"
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Indicadores de Interesse */}
            {message_patterns.interest_indicators.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Indicadores de Interesse:</h4>
                <div className="space-y-2">
                  {message_patterns.interest_indicators.map((indicator, index) => (
                    <div key={index} className="p-2 bg-green-50 rounded text-sm">
                      "{indicator}"
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Padrões de Resposta */}
            {engagement_metrics.response_patterns.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Padrões de Resposta dos Leads:</h4>
                <div className="space-y-2">
                  {engagement_metrics.response_patterns.map((pattern, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                      "{pattern}"
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
