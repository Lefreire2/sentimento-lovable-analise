
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useEvolutiveSystem } from '@/hooks/useEvolutiveSystem';
import { useToast } from '@/hooks/use-toast';
import { AppointmentHeader } from './appointment/AppointmentHeader';
import { AppointmentLoadingState } from './appointment/AppointmentLoadingState';
import { AppointmentProbability } from './appointment/AppointmentProbability';
import { AppointmentScheduleInfo } from './appointment/AppointmentScheduleInfo';
import { AppointmentAnalysisInfo } from './appointment/AppointmentAnalysisInfo';
import { AppointmentContextInfo } from './appointment/AppointmentContextInfo';
import { AppointmentScriptSection } from './appointment/AppointmentScriptSection';
import { AppointmentActions } from './appointment/AppointmentActions';
import { AppointmentEmptyState } from './appointment/AppointmentEmptyState';

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
            title: "Otimização Consultiva Concluída",
            description: `Estratégia personalizada gerada com análise contextual detalhada`,
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

  return (
    <Card>
      <AppointmentHeader 
        leadId={leadId}
        isPending={isPending}
        onOptimize={handleOptimizeAppointment}
      />

      <CardContent className="space-y-6">
        {isPending && <AppointmentLoadingState />}

        {optimization && (
          <>
            <AppointmentProbability 
              probabilidade_sucesso={optimization.probabilidade_sucesso}
            />

            {/* Informações Contextuais */}
            {optimization.contexto_conversa && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Análise Contextual</h3>
                <AppointmentContextInfo
                  contexto_conversa={optimization.contexto_conversa}
                  necessidades_identificadas={optimization.necessidades_identificadas || []}
                  objecoes_previstas={optimization.objecoes_previstas || []}
                  gatilhos_conversao={optimization.gatilhos_conversao || []}
                  perfil_comportamental={optimization.perfil_comportamental}
                  nivel_interesse={optimization.nivel_interesse}
                  urgencia_detectada={optimization.urgencia_detectada}
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t pt-6">
              <AppointmentScheduleInfo
                melhor_horario_sugerido={optimization.melhor_horario_sugerido}
                melhor_dia_semana={optimization.melhor_dia_semana}
                canal_preferido={optimization.canal_preferido}
                agendamento_detectado={optimization.agendamento_detectado}
                ultima_etapa_alcancada={optimization.ultima_etapa_alcancada}
              />

              <AppointmentAnalysisInfo
                termo_chave_conversao={optimization.termo_chave_conversao}
                motivo_nao_conversao={optimization.motivo_nao_conversao}
                abordagem_recomendada={optimization.abordagem_recomendada}
                resumo_atendimento={optimization.resumo_atendimento}
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Script Consultivo Personalizado</h3>
              <AppointmentScriptSection
                script_personalizado={optimization.script_personalizado}
                customMessage={customMessage}
                onCustomMessageChange={setCustomMessage}
              />
            </div>

            <AppointmentActions />

            <div className="text-xs text-muted-foreground text-center pt-2">
              Otimização consultiva gerada em: {new Date(optimization.created_at).toLocaleString('pt-BR')}
            </div>
          </>
        )}

        {!optimization && !isPending && (
          <AppointmentEmptyState 
            leadId={leadId}
            onOptimize={handleOptimizeAppointment}
          />
        )}
      </CardContent>
    </Card>
  );
};
