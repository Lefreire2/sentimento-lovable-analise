
import { MessageCircle, Target, AlertTriangle, Zap, User, TrendingUp, Clock } from 'lucide-react';

interface AppointmentContextInfoProps {
  contexto_conversa: string;
  necessidades_identificadas: string[];
  objecoes_previstas: string[];
  gatilhos_conversao: string[];
  perfil_comportamental: string;
  nivel_interesse: string;
  urgencia_detectada: string;
}

export const AppointmentContextInfo = ({
  contexto_conversa,
  necessidades_identificadas,
  objecoes_previstas,
  gatilhos_conversao,
  perfil_comportamental,
  nivel_interesse,
  urgencia_detectada
}: AppointmentContextInfoProps) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case 'alta': return 'text-red-600 bg-red-50 dark:bg-red-950/20';
      case 'média': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20';
      case 'baixa': return 'text-green-600 bg-green-50 dark:bg-green-950/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const getInterestColor = (interest: string) => {
    switch (interest?.toLowerCase()) {
      case 'muito alto': return 'text-green-700 bg-green-100 dark:bg-green-950/30';
      case 'alto': return 'text-green-600 bg-green-50 dark:bg-green-950/20';
      case 'médio': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20';
      case 'baixo': return 'text-red-600 bg-red-50 dark:bg-red-950/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Contexto da Conversa */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <label className="text-sm font-medium">Contexto da Conversa</label>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm">{contexto_conversa}</p>
        </div>
      </div>

      {/* Status e Perfil */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <label className="text-sm font-medium">Perfil Comportamental</label>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <span className="text-sm font-medium">{perfil_comportamental}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <label className="text-sm font-medium">Nível de Interesse</label>
          </div>
          <div className={`p-3 rounded-lg ${getInterestColor(nivel_interesse)}`}>
            <span className="text-sm font-medium">{nivel_interesse}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <label className="text-sm font-medium">Urgência Detectada</label>
          </div>
          <div className={`p-3 rounded-lg ${getUrgencyColor(urgencia_detectada)}`}>
            <span className="text-sm font-medium">{urgencia_detectada}</span>
          </div>
        </div>
      </div>

      {/* Necessidades Identificadas */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          <label className="text-sm font-medium">Necessidades Identificadas</label>
        </div>
        <div className="space-y-2">
          {necessidades_identificadas?.map((necessidade, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">{necessidade}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Objeções Previstas */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <label className="text-sm font-medium">Objeções Previstas</label>
        </div>
        <div className="space-y-2">
          {objecoes_previstas?.map((objecao, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">{objecao}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gatilhos de Conversão */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <label className="text-sm font-medium">Gatilhos de Conversão</label>
        </div>
        <div className="space-y-2">
          {gatilhos_conversao?.map((gatilho, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">{gatilho}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
