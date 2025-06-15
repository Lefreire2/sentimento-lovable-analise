
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, TrendingDown, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AgentData } from "@/hooks/useAgentData";
import { useFunnelData } from "@/hooks/useFunnelData";
import { PeriodFilter } from "./PeriodSelector";

interface FunnelChartProps {
    agentData: AgentData;
    selectedAgent: string;
    selectedPeriod: PeriodFilter;
}

export const FunnelChart = ({ agentData, selectedAgent, selectedPeriod }: FunnelChartProps) => {
    const { data: funnelData, isLoading, isError } = useFunnelData(selectedAgent);

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

    if (isLoading) {
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
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-2 text-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground font-medium">Carregando dados do funil...</p>
                        <p className="text-sm text-muted-foreground">
                            Buscando dados reais de {selectedAgent}
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError || !funnelData) {
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
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Erro ao carregar dados do funil</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

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
                        Taxa: {funnelData.conversionRate}%
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Cards de etapas do funil em formato de grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {funnelData.steps.map((step, index) => {
                            const dropoffRate = index > 0 
                                ? Math.round(((funnelData.steps[index-1].value - step.value) / funnelData.steps[index-1].value) * 100)
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
                                    {index > 0 && funnelData.steps[index-1].value > 0 && (
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
                                <div className="text-4xl font-bold text-primary">{funnelData.conversionRate}%</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {funnelData.steps[funnelData.steps.length - 1].value} de {funnelData.steps[0].value} leads
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
