
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, TrendingUp, Hash, Eye, Users } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Métricas de Engajamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Métricas de Engajamento das Mensagens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border">
              <Hash className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-700 mb-1">
                {engagement_metrics.total_messages.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-blue-600">Total de Mensagens</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border">
              <Eye className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-700 mb-1">
                {engagement_metrics.avg_message_length}
              </div>
              <div className="text-sm font-medium text-green-600">Caracteres por Mensagem</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-700 mb-1">
                {engagement_metrics.response_patterns.length}
              </div>
              <div className="text-sm font-medium text-purple-600">Padrões Únicos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Padrões de Mensagem */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-600" />
            Padrões Identificados nas Mensagens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fontes Mencionadas */}
          {message_patterns.source_mentions.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {message_patterns.source_mentions.length}
                </Badge>
                Fontes Mencionadas pelos Leads
              </h4>
              <div className="flex flex-wrap gap-2">
                {message_patterns.source_mentions.map((mention, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {mention}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Padrões de Saudação */}
          {message_patterns.greeting_patterns.length > 0 && (
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {message_patterns.greeting_patterns.length}
                </Badge>
                Padrões de Saudação Mais Comuns
              </h4>
              <div className="space-y-2">
                {message_patterns.greeting_patterns.slice(0, 3).map((pattern, index) => (
                  <div key={index} className="p-3 bg-white rounded-md border text-sm italic">
                    "{pattern}"
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Indicadores de Interesse */}
          {message_patterns.interest_indicators.length > 0 && (
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  {message_patterns.interest_indicators.length}
                </Badge>
                Indicadores de Interesse
              </h4>
              <div className="space-y-2">
                {message_patterns.interest_indicators.slice(0, 3).map((indicator, index) => (
                  <div key={index} className="p-3 bg-white rounded-md border text-sm italic">
                    "{indicator}"
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Padrões de Resposta */}
          {engagement_metrics.response_patterns.length > 0 && (
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  {engagement_metrics.response_patterns.length}
                </Badge>
                Padrões de Resposta dos Leads
              </h4>
              <div className="space-y-2">
                {engagement_metrics.response_patterns.map((pattern, index) => (
                  <div key={index} className="p-3 bg-white rounded-md border text-sm italic">
                    "{pattern}"
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
