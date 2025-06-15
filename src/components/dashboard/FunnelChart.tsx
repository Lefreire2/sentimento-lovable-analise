
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, FunnelChart as RechartsFunnelChart, Funnel, Cell, Tooltip } from "recharts";
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

const chartConfig = {
    value: {
        label: "Leads",
        color: "hsl(var(--chart-1))",
    },
};

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
                    {/* Gráfico de funil em barras horizontais */}
                    <div className="h-80">
                        <ChartContainer config={chartConfig}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={simulatedFunnelData}
                                    layout="horizontal"
                                    margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                                >
                                    <XAxis type="number" domain={[0, 'dataMax']} />
                                    <YAxis 
                                        type="category" 
                                        dataKey="name" 
                                        width={80}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                        {simulatedFunnelData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>

                    {/* Indicadores de etapas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {simulatedFunnelData.map((step, index) => {
                            const dropoffRate = index > 0 
                                ? Math.round(((simulatedFunnelData[index-1].value - step.value) / simulatedFunnelData[index-1].value) * 100)
                                : 0;
                            
                            return (
                                <div key={step.name} className="p-3 rounded-lg border bg-card">
                                    <div className="flex items-center justify-between mb-2">
                                        <div 
                                            className="w-3 h-3 rounded-full" 
                                            style={{ backgroundColor: step.color }}
                                        />
                                        <span className="text-2xl font-bold">{step.value}</span>
                                    </div>
                                    <h4 className="font-medium text-sm mb-1">{step.name}</h4>
                                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                                    {index > 0 && (
                                        <Badge variant="outline" className="text-xs">
                                            -{dropoffRate}% anterior
                                        </Badge>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Resumo de conversão */}
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-sm mb-1">Taxa de Conversão Geral</h4>
                                <p className="text-xs text-muted-foreground">
                                    Do primeiro contato ao agendamento confirmado
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-primary">{conversionRate}%</div>
                                <div className="text-xs text-muted-foreground">
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
