
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  Smile, 
  Meh,
  Frown,
  AlertTriangle,
  PieChart
} from 'lucide-react';

interface SentimentAnalysisCardProps {
  data: any;
}

export const SentimentAnalysisCard = ({ data }: SentimentAnalysisCardProps) => {
  const sentimentData = data.sentiment_analysis;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positivo': return 'text-green-600 bg-green-50';
      case 'Neutro': return 'text-yellow-600 bg-yellow-50';
      case 'Negativo': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positivo': return <Smile className="h-4 w-4" />;
      case 'Neutro': return <Meh className="h-4 w-4" />;
      case 'Negativo': return <Frown className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Sentimento Geral */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Sentimento Geral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {getSentimentIcon(sentimentData.overall)}
            <Badge variant="outline" className={getSentimentColor(sentimentData.overall)}>
              {sentimentData.overall}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sentimento do Usuário */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Smile className="h-4 w-4" />
            Sentimento Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {getSentimentIcon(sentimentData.user)}
            <Badge variant="outline" className={getSentimentColor(sentimentData.user)}>
              {sentimentData.user}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sentimento do Atendente */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Sentimento Atendente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {getSentimentIcon(sentimentData.agent)}
            <Badge variant="outline" className={getSentimentColor(sentimentData.agent)}>
              {sentimentData.agent}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Palavras de Risco */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Palavras de Risco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{sentimentData.risk_words}</div>
          <p className="text-sm text-muted-foreground">Palavras detectadas</p>
        </CardContent>
      </Card>

      {/* Distribuição de Sentimentos */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Distribuição de Sentimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sentimentData.distribution && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smile className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Positivos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{sentimentData.distribution.positive}</span>
                  <Progress value={(sentimentData.distribution.positive / (sentimentData.distribution.positive + sentimentData.distribution.neutral + sentimentData.distribution.negative)) * 100} className="w-20 h-2" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Meh className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Neutros</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{sentimentData.distribution.neutral}</span>
                  <Progress value={(sentimentData.distribution.neutral / (sentimentData.distribution.positive + sentimentData.distribution.neutral + sentimentData.distribution.negative)) * 100} className="w-20 h-2" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Frown className="h-4 w-4 text-red-600" />
                  <span className="text-sm">Negativos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{sentimentData.distribution.negative}</span>
                  <Progress value={(sentimentData.distribution.negative / (sentimentData.distribution.positive + sentimentData.distribution.neutral + sentimentData.distribution.negative)) * 100} className="w-20 h-2" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
