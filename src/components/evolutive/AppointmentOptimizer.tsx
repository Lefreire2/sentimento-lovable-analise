
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
  leadId?: string;
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
        leadId: leadId || 'demo-lead',
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Otimização de Agendamento
          {!leadId && <Badge variant="secondary" className="ml-2">Demo</Badge>}
        </CardTitle>
        <Button 
          onClick={handleOptimizeAppointment}
          disabled={isPending}
          size="sm"
          className="bg-gray-800 hover:bg-gray-900"
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
            <div className="space-y-3">
              <label className="text-sm font-medium">Probabilidade de Sucesso</label>
              <div className="flex items-center gap-3">
                <Progress 
                  value={optimization.probabilidade_sucesso} 
                  className="flex-1 h-3" 
                />
                <span className="text-2xl font-bold text-green-600 min-w-[60px] text-right">
                  {optimization.probabilidade_sucesso}%
                </span>
              </div>
            </div>

            {/* Melhor Horário e Dia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <label className="text-sm font-medium">Melhor Horário</label>
                </div>
                <div className="text-lg font-semibold">
                  {optimization.melhor_horario_sugerido}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <label className="text-sm font-medium">Melhor Dia</label>
                </div>
                <div className="text-lg font-semibold">
                  {optimization.melhor_dia_semana}
                </div>
              </div>
            </div>

            {/* Canal Recomendado */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Canal Recomendado</label>
              <div className="flex items-center gap-2">
                {getChannelIcon(optimization.canal_preferido)}
                <span className="font-medium">{optimization.canal_preferido}</span>
              </div>
            </div>

            {/* Abordagem Recomendada */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Abordagem Recomendada</label>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm">{optimization.abordagem_recomendada}</p>
              </div>
            </div>

            {/* Script Personalizado */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Script Personalizado</label>
              <Textarea
                value={optimization.script_personalizado}
                readOnly
                className="min-h-[120px] bg-gray-50 dark:bg-gray-900"
                placeholder="Script gerado automaticamente..."
              />
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
            <div className="text-xs text-muted-foreground text-center pt-2">
              Otimização gerada em: {new Date(optimization.created_at).toLocaleString('pt-BR')}
            </div>
          </>
        )}

        {!optimization && !isPending && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              {!leadId ? 'Modo demonstração' : 'Pronto para otimizar'}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Gere uma estratégia personalizada baseada no contexto da conversa e padrões de sucesso
            </p>
            <Button onClick={handleOptimizeAppointment} size="lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Gerar Otimização
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
