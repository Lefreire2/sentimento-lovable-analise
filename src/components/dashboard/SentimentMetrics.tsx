
import { Smile, Users, BarChart2 } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface AgentData {
    sentimento_usuario: string;
    sentimento_atendente: string;
    sentimento_geral_conversa: string;
}

interface SentimentMetricsProps {
    agentData: AgentData;
}

export const SentimentMetrics = ({ agentData }: SentimentMetricsProps) => (
    <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center"><Smile className="mr-2" /> Análise de Sentimento</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard title="Sentimento do Usuário" value={agentData.sentimento_usuario || 'N/A'} icon={Users} />
            <MetricCard title="Sentimento do Atendente" value={agentData.sentimento_atendente || 'N/A'} icon={Smile} />
            <MetricCard title="Sentimento Geral" value={agentData.sentimento_geral_conversa || 'N/A'} icon={BarChart2} />
        </div>
    </div>
);
