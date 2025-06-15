
import { Loader2, BarChart2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatesProps {
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    selectedAgent: string;
    hasData: boolean;
}

export const DashboardStates = ({ isLoading, isError, error, selectedAgent, hasData }: DashboardStatesProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Carregando dados do atendente...</p>
            </div>
        );
    }
    
    if (isError) {
        return (
            <Card className="bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle>Erro ao carregar dados</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Não foi possível buscar as métricas. Por favor, tente novamente mais tarde.</p>
                    {error && <p className="text-sm text-muted-foreground mt-2">{error.message}</p>}
                </CardContent>
            </Card>
        );
    }
    
    if (!selectedAgent) {
        return (
            <div className="text-center py-16">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nenhum atendente selecionado</h3>
                <p className="mt-1 text-sm text-gray-500">Por favor, selecione um atendente para visualizar as métricas.</p>
            </div>
        );
    }

    if (selectedAgent && !hasData) {
        return (
            <div className="text-center py-16">
                <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Sem dados para este atendente</h3>
                <p className="mt-1 text-sm text-gray-500">Não foram encontrados dados de métricas para o atendente selecionado.</p>
                <p className="mt-2 text-xs text-gray-400">Verifique os logs do console para mais detalhes sobre a consulta.</p>
            </div>
        );
    }

    return null;
};
