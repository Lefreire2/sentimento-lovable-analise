
import { Key, AlertCircle, FileText } from 'lucide-react';

interface AppointmentAnalysisInfoProps {
  termo_chave_conversao?: string;
  motivo_nao_conversao?: string;
  abordagem_recomendada: string;
  resumo_atendimento?: string;
}

export const AppointmentAnalysisInfo = ({
  termo_chave_conversao,
  motivo_nao_conversao,
  abordagem_recomendada,
  resumo_atendimento
}: AppointmentAnalysisInfoProps) => {
  return (
    <div className="space-y-6">
      {/* Termo Chave de Conversão */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          <label className="text-sm font-medium">Termo Chave de Conversão</label>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
          <span className="font-medium">
            {termo_chave_conversao || 'Preço, Demonstração, Agendamento'}
          </span>
        </div>
      </div>

      {/* Motivo de Não Conversão */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <label className="text-sm font-medium">Motivo de Não Conversão</label>
        </div>
        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
          <span className="text-sm">
            {motivo_nao_conversao || 'Não identificado ainda'}
          </span>
        </div>
      </div>

      {/* Abordagem Recomendada */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Abordagem Recomendada</label>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm">{abordagem_recomendada}</p>
        </div>
      </div>

      {/* Resumo do Atendimento */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <label className="text-sm font-medium">Resumo do Atendimento</label>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-sm">
            {resumo_atendimento || 'Lead demonstrou interesse inicial, necessário follow-up personalizado para agendamento.'}
          </p>
        </div>
      </div>
    </div>
  );
};
