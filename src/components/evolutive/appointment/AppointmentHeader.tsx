
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Sparkles } from 'lucide-react';

interface AppointmentHeaderProps {
  leadId?: string;
  isPending: boolean;
  onOptimize: () => void;
}

export const AppointmentHeader = ({ leadId, isPending, onOptimize }: AppointmentHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="flex items-center gap-2">
        <Target className="h-5 w-5" />
        Otimização de Agendamento
        {!leadId && <Badge variant="secondary" className="ml-2">Demo</Badge>}
      </CardTitle>
      <Button 
        onClick={onOptimize}
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
  );
};
