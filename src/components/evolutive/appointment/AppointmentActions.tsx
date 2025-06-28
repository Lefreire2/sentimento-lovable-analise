
import { Button } from '@/components/ui/button';
import { Send, Calendar } from 'lucide-react';

export const AppointmentActions = () => {
  return (
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
  );
};
