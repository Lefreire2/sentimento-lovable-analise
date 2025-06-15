
import { Star } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface AgentData {
    conversao_indicada_mvp: string;
    pontuacao_aderencia_percentual: string;
    numero_perguntas_vendedor: string;
}

interface PerformanceMetricsProps {
    agentData: AgentData;
}

export const PerformanceMetrics = ({ agentData }: PerformanceMetricsProps) => (
    <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center"><Star className="mr-2" /> Métricas de Performance</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard title="Conversão MVP" value={agentData.conversao_indicada_mvp || 'N/A'} icon={Star} />
            <MetricCard title="Aderência ao Script" value={`${parseFloat(agentData.pontuacao_aderencia_percentual || '0').toFixed(1)}%`} icon={Star} />
            <MetricCard title="Perguntas do Vendedor" value={agentData.numero_perguntas_vendedor || '0'} icon={Star} />
        </div>
    </div>
);
