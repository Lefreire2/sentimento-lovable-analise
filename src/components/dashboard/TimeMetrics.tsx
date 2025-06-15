
import { Clock } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface AgentData {
    tempo_primeira_resposta_minutos: string;
    tempo_medio_resposta_atendente_minutos: string;
    tempo_maximo_resposta_atendente_minutos: string;
    duracao_total_conversa_minutos: string;
}

interface TimeMetricsProps {
    agentData: AgentData;
}

export const TimeMetrics = ({ agentData }: TimeMetricsProps) => (
    <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center"><Clock className="mr-2" /> Métricas de Tempo (minutos)</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Duração Total" value={parseFloat(agentData.duracao_total_conversa_minutos || '0').toFixed(1)} unit="min" icon={Clock} />
            <MetricCard title="1ª Resposta" value={parseFloat(agentData.tempo_primeira_resposta_minutos || '0').toFixed(1)} unit="min" icon={Clock} />
            <MetricCard title="Resposta Média" value={parseFloat(agentData.tempo_medio_resposta_atendente_minutos || '0').toFixed(1)} unit="min" icon={Clock} />
            <MetricCard title="Resposta Máxima" value={parseFloat(agentData.tempo_maximo_resposta_atendente_minutos || '0').toFixed(1)} unit="min" icon={Clock} />
        </div>
    </div>
);
