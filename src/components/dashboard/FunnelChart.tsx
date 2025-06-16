
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, TrendingDown, Loader2, RefreshCw, Database, AlertCircle } from "lucide-react";
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
    const { data: funnelData, isLoading, isError, refetch, isFetching } = useFunnelData(selectedAgent);

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

    const handleReloadData = async () => {
        console.log('🔄 FUNIL - Botão reload clicado para agente:', selectedAgent);
        try {
            await refetch();
            console.log('✅ FUNIL - Dados recarregados com sucesso');
        } catch (error) {
            console.error('❌ FUNIL - Erro ao recarregar dados:', error);
        }
    };

    // Verificar se temos dados reais
    const hasRealData = funnelData && funnelData.steps[0].value > 0;
    const isEmptyState = funnelData && funnelData.steps.every(step => step.value === 0);

    // Cabeçalho comum para todos os estados
    const CardHeaderComponent = () => (
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-primary" />
                <CardTitle>Funil de Conversação</CardTitle>
                <Badge variant="outline" className="ml-2">
                    {getPeriodDescription()}
                </Badge>
                {hasRealData && (
                    <Badge variant="secondary" className="ml-2 flex items-center gap-1">
                        <Database className="h-3 w-3" />
                        Dados Reais
                    </Badge>
                )}
                {isEmptyState && (
                    <Badge variant="outline" className="ml-2 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Sem Dados
                    </Badge>
                )}
            </div>
            <Button 
                onClick={handleReloadData} 
                variant="outline" 
                size="sm"
                disabled={isFetching}
                title="Recarregar dados do funil"
            >
                {isFetching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <RefreshCw className="h-4 w-4" />
                )}
            </Button>
        </CardHeader>
    );

    if (isLoading) {
        return (
            <Card>
                <CardHeaderComponent />
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-2 text-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground font-medium">Buscando dados reais do Supabase...</p>
                        <p className="text-sm text-muted-foreground">
                            Carregando dados de {selectedAgent}
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError || !funnelData) {
        return (
            <Card>
                <CardHeaderComponent />
                <CardContent>
                    <div className="text-center py-8">
                        <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                        <p className="text-muted-foreground mb-2">Erro ao carregar dados do funil</p>
                        <p className="text-sm text-muted-foreground">
                            Verifique se as tabelas do agente {selectedAgent} existem no Supabase
                        </p>
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
                    {hasRealData && (
                        <Badge variant="secondary" className="ml-2 flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            Dados Reais
                        </Badge>
                    )}
                    {isEmptyState && (
                        <Badge variant="outline" className="ml-2 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Sem Dados
                        </Badge>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {hasRealData && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <TrendingDown className="h-3 w-3" />
                            Taxa: {funnelData.conversionRate}%
                        </Badge>
                    )}
                    <Button 
                        onClick={handleReloadData} 
                        variant="outline" 
                        size="sm"
                        disabled={isFetching}
                        title="Recarregar dados do funil"
                    >
                        {isFetching ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <RefreshCw className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {isEmptyState ? (
                    <div className="text-center py-12">
                        <Database className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Nenhum Dado Encontrado
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            As tabelas do agente <strong>{selectedAgent}</strong> estão vazias ou não foram encontradas.
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 text-left">
                            <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                                <strong>Para visualizar dados reais:</strong>
                            </p>
                            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                                <li>• Verifique se existem dados nas tabelas do Supabase</li>
                                <li>• Confirme se o nome do agente está correto</li>
                                <li>• Tente recarregar os dados clicando no botão de atualizar</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Cards de etapas do funil em formato de grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {funnelData.steps.map((step, index) => {
                                const dropoffRate = index > 0 && funnelData.steps[index-1].value > 0
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
                        {hasRealData && (
                            <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-lg mb-2">Taxa de Conversão Geral</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Do primeiro contato ao agendamento confirmado (dados reais)
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
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
