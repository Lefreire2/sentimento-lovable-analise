
import { Clock, Calendar, MessageSquare, Phone, Mail, Send, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface AppointmentScheduleInfoProps {
  melhor_horario_sugerido: string;
  melhor_dia_semana: string;
  canal_preferido: string;
  agendamento_detectado?: string;
  ultima_etapa_alcancada?: string;
}

export const AppointmentScheduleInfo = ({
  melhor_horario_sugerido,
  melhor_dia_semana,
  canal_preferido,
  agendamento_detectado,
  ultima_etapa_alcancada
}: AppointmentScheduleInfoProps) => {
  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      case 'telefone': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <Send className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'agendado':
      case 'confirmado': 
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pendente':
      case 'em_andamento': 
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default: 
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Melhor Horário e Dia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <label className="text-sm font-medium">Melhor Horário</label>
          </div>
          <div className="text-lg font-semibold p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            {melhor_horario_sugerido}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <label className="text-sm font-medium">Melhor Dia</label>
          </div>
          <div className="text-lg font-semibold p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            {melhor_dia_semana}
          </div>
        </div>
      </div>

      {/* Canal Recomendado */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Canal Recomendado</label>
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
          {getChannelIcon(canal_preferido)}
          <span className="font-medium">{canal_preferido}</span>
        </div>
      </div>

      {/* Status do Agendamento */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <label className="text-sm font-medium">Status do Agendamento</label>
        </div>
        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          {getStatusIcon(agendamento_detectado || 'pendente')}
          <span className="font-medium">
            {agendamento_detectado || 'Pendente'}
          </span>
        </div>
      </div>

      {/* Última Etapa Alcançada */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <label className="text-sm font-medium">Última Etapa Alcançada</label>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
          <span className="font-medium">
            {ultima_etapa_alcancada || 'Contato Inicial'}
          </span>
        </div>
      </div>
    </div>
  );
};
