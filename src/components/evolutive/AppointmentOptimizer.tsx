
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Target, 
  Sparkles,
  Phone,
  Mail,
  Send
} from 'lucide-react';
import { useEvolutiveSystem } from '@/hooks/useEvolutiveSystem';
import { useToast } from '@/hooks/use-toast';

interface AppointmentOptimizerProps {
  leadId: string;
  conversationContext?: any;
}

export const AppointmentOptimizer = ({ leadId, conversationContext }: AppointmentOptimizerProps) => {
  const { useAppointmentOptimization } = useEvolutiveSystem();
  const { mutate: optimizeAppointment, isPending, data: optimization } = useAppointmentOptimization();
  const { toast } = useToast();
  const [customMessage, setCustomMessage] = useState('');

  const handleOptimizeAppointment = () => {
    optimizeAppointment(
      {
        leadId,
        conversationData: conversationContext
      },
      {
        onSuccess: (data) => {
          toast({
            title: "Otimização Concluída",
            description: `Estratégia personalizada gerada com ${data.probabilidade_sucesso}% de probabilidade de sucesso`,
          });
        },
        onError: (error) => {
          toast({
            title: "Erro na Otimização",
            description: "Não foi possível gerar a otimização. Tente novamente.",
            variant: "destructive"
          });
        }
      }
    );
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      case 'telefone': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <Send className="h-4 w-4" />;
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Otimização de Agendamento
        </CardTitle>
        <Button 
          onClick={handleOptimizeAppointment}
          disabled={isPending}
          size="sm"
        >
          {isPending ? (
            <><Sparkles className="h-4 w-4 animate-spin mr-2" /> Otimizando</>
          ) : (
            <><Sparkles className="h-4 w-4 mr-2" /> Otimizar</>
          )}
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {isPending && (
          <div className="space-y-4">
            <Progress value={65} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Analisando contexto conversacional e gerando estratégia personalizada...
            </p>
          </div>
        )}

        {optimization && (
          <>
            {/* Probabilidade de Sucesso */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Probabilidade de Sucesso</label>
              <div className="flex items-center gap-2">
                <Progress value={optimization.probabilidade_sucesso} className="flex-1" />
                <span className={`text-sm font-bold ${getProbabilityColor(optimization.probabilidade_sucesso)}`}>
                  {optimization.probabilidade_sucesso}%
                </span>
              </div>
            </div>

            {/* Recomendações de Timing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Melhor Horário
                </label>
                <Badge variant="outline" className="w-fit">
                  {optimization.melhor_horario_sugerido}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Melhor Dia
                </label>
                <Badge variant="outline" className="w-fit">
                  {optimization.melhor_dia_semana}
                </Badge>
              </div>
            </div>

            {/* Canal Preferido */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Canal Recomendado</label>
              <div className="flex items-center gap-2">
                {getChannelIcon(optimization.canal_preferido)}
                <Badge variant="secondary">
                  {optimization.canal_preferido}
                </Badge>
              </div>
            </div>

            {/* Abordagem Recomendada */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Abordagem Recomendada</label>
              <p className="text-sm bg-blue-50 dark:bg-blue-950/20 p-3 rounded border-l-2 border-blue-500">
                {optimization.abordagem_recomendada}
              </p>
            </div>

            {/* Script Personalizado */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Script Personalizado</label>
              <Textarea
                value={optimization.script_personalizado}
                readOnly
                className="min-h-[120px] bg-muted"
                placeholder="Script gerado automaticamente..."
              />
            </div>

            {/* Fatores de Otimização */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Fatores de Otimização</label>
              <div className="flex flex-wrap gap-2">
                {optimization.fatores_otimizacao.map((fator, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {fator}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Campo para personalizar mensagem */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Personalizar Mensagem (Opcional)</label>
              <Textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Adicione ajustes específicos ao script..."
                className="min-h-[80px]"
              />
            </div>

            {/* Ações */}
            <div className="flex gap-2 pt-4 border-t">
              <Button className="flex-1" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Enviar Convite
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Para Mais Tarde
              </Button>
            </div>

            {/* Timestamp */}
            <div className="text-xs text-muted-foreground">
              Otimização gerada em: {new Date(optimization.created_at).toLocaleString('pt-BR')}
            </div>
          </>
        )}

        {!optimization && !isPending && (
          <div className="text-center py-8">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Gere uma estratégia personalizada de agendamento
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Baseada no contexto da conversa e padrões de sucesso
            </p>
            <Button onClick={handleOptimizeAppointment}>
              Gerar Otimização
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
