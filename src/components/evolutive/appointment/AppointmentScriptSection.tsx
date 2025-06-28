
import { Textarea } from '@/components/ui/textarea';

interface AppointmentScriptSectionProps {
  script_personalizado: string;
  customMessage: string;
  onCustomMessageChange: (value: string) => void;
}

export const AppointmentScriptSection = ({
  script_personalizado,
  customMessage,
  onCustomMessageChange
}: AppointmentScriptSectionProps) => {
  return (
    <>
      {/* Script Personalizado */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Script Personalizado</label>
        <Textarea
          value={script_personalizado}
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
          onChange={(e) => onCustomMessageChange(e.target.value)}
          placeholder="Adicione ajustes específicos ao script..."
          className="min-h-[80px]"
        />
      </div>
    </>
  );
};
