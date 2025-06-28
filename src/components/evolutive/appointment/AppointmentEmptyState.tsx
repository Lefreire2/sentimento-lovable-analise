
import { Button } from '@/components/ui/button';
import { Target, Sparkles } from 'lucide-react';

interface AppointmentEmptyStateProps {
  leadId?: string;
  onOptimize: () => void;
}

export const AppointmentEmptyState = ({ leadId, onOptimize }: AppointmentEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <Target className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <p className="text-lg font-medium mb-2">
        {!leadId ? 'Modo demonstração' : 'Pronto para otimizar'}
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        Gere uma estratégia personalizada baseada no contexto da conversa e padrões de sucesso
      </p>
      <Button onClick={onOptimize} size="lg">
        <Sparkles className="h-4 w-4 mr-2" />
        Gerar Otimização
      </Button>
    </div>
  );
};
