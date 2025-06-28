
import { Progress } from '@/components/ui/progress';

interface AppointmentProbabilityProps {
  probabilidade_sucesso: number;
}

export const AppointmentProbability = ({ probabilidade_sucesso }: AppointmentProbabilityProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Probabilidade de Sucesso</label>
      <div className="flex items-center gap-3">
        <Progress 
          value={probabilidade_sucesso} 
          className="flex-1 h-3" 
        />
        <span className="text-2xl font-bold text-green-600 min-w-[60px] text-right">
          {probabilidade_sucesso}%
        </span>
      </div>
    </div>
  );
};
