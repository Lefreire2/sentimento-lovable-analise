
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AgentData } from "@/hooks/useAgentData";
import { PeriodFilter } from "./PeriodSelector";

interface FunnelChartProps {
    agentData: AgentData;
    selectedAgent: string;
    selectedPeriod: PeriodFilter;
}

const funnelSteps = [
    { name: "Lead Iniciado", value: 100, color: "#3b82f6", description: "Primeiro contato recebido" },
    { name: "Lead Respondido", value: 85, color: "#06b6d4", description: "Secretária respondeu ao lead" },
    { name: "Levantada de Mão", value: 65, color: "#10b981", description: "Lead demonstrou interesse" },
    { name: "Apresentação Oferta", value: 45, color: "#f59e0b", description: "Valores/detalhes apresentados" },
    { name: "Confirmação Lead", value: 25, color: "#ef4444", description: "Lead confirmou interesse" },
    { name: "Agendamento Confirmado", value: 15, color: "#8b5cf6", description: "Consulta agendada" }
];

export const FunnelChart = ({ agentData, selectedAgent, selectedPeriod }: FunnelChartProps) => {
    // Simular dados baseados no agentData atual
    const simulatedFunnelData = funnelSteps.map((step, index) => {
        // Calcular valores baseados nos dados reais disponíveis
        let simulatedValue = step.value;
        
        if (agentData.conversao_indicada_mvp === 'Sim') {
            // Se teve conversão, aumentar os valores finais
            simulatedValue = index < 4 ? step.value + 10 : step.value + 20;
        } else {
            // Se não houve conversão, diminuir valores finais
            simulatedValue = index > 2 ? step.value - 15 : step.value;
        }
        
        return {
            ...step,
            value: Math.max(simulatedValue, 0)
        };
    });

    const conversionRate = simulatedFunnelData.length > 0 
        ? Math.round((simulatedFunnelData[simulatedFunnelData.length - 1].value / simulatedFunnelData[0].value) * 100)
        : 0;

    const getPeriodDescription = () => {
        switch (selectedPeriod.type) {
            case 'last7days':
                return 'últimos 7 dias';
            case 'last30days':
                return 'últimos 30 dias';
            case 'last90days':
                return 'últimos 90 dias';
            default:
                return 'período selecionado';
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-primary" />
                    <CardTitle>Funil de Conversação</CardTitle>
                    <Badge variant="outline" className="ml-2">
                        {getPeriodDescription()}
                    </Badge>
                </div>
                <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        Taxa: {conversionRate}%
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Cards de etapas do funil em formato de grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {simulatedFunnelData.map((step, index) => {
                            const dropoffRate = index > 0 
                                ? Math.round(((simulatedFunnelData[index-1].value - step.value) / simulatedFunnelData[index-1].value) * 100)
                                : 0;
                            
                            return (
                                <div key={step.name} className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div 
                                            className="w-4 h-4 rounded-full" 
                                            style={{ backgroundColor: step.color }}
                                        />
                                        <span className="text-3xl font-bold text-primary">{step.value}</span>
                                    </div>
                                    <h4 className="font-semibold text-lg mb-2">{step.name}</h4>
                                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                                    {index > 0 && (
                                        <Badge variant="outline" className="text-xs">
                                            -{dropoffRate}% anterior
                                        </Badge>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Resumo de conversão destacado */}
                    <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-lg mb-2">Taxa de Conversão Geral</h4>
                                <p className="text-sm text-muted-foreground">
                                    Do primeiro contato ao agendamento confirmado
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold text-primary">{conversionRate}%</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {simulatedFunnelData[simulatedFunnelData.length - 1].value} de {simulatedFunnelData[0].value} leads
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
