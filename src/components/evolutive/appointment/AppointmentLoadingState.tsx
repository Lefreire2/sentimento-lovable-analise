
import { Progress } from '@/components/ui/progress';

export const AppointmentLoadingState = () => {
  return (
    <div className="space-y-4">
      <Progress value={65} className="w-full" />
      <p className="text-sm text-muted-foreground text-center">
        Analisando contexto conversacional e gerando estratégia personalizada...
      </p>
    </div>
  );
};
