
import { Loader2, BarChart2, Users, AlertTriangle } from "lucide-react";
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
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Erro ao carregar dados
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Não foi possível buscar as métricas para o atendente <strong>{selectedAgent}</strong>.</p>
                    {error && <p className="text-sm text-muted-foreground mt-2">{error.message}</p>}
                    <div className="mt-4 text-sm text-muted-foreground">
                        <p><strong>Possíveis causas:</strong></p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>Nome do atendente não corresponde exatamente aos dados no banco</li>
                            <li>Tabelas não existem no banco de dados</li>
                            <li>Problema de conectividade com o banco</li>
                        </ul>
                        <p className="mt-2">Verifique os logs do console para mais detalhes técnicos.</p>
                    </div>
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
            <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                        <BarChart2 className="h-5 w-5" />
                        Sem dados para {selectedAgent}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-yellow-700 dark:text-yellow-300">
                        Não foram encontrados dados de métricas para o atendente <strong>{selectedAgent}</strong>.
                    </p>
                    <div className="mt-4 text-sm text-yellow-600 dark:text-yellow-400">
                        <p><strong>Possíveis soluções:</strong></p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>Verificar se há dados importados para este atendente</li>
                            <li>Confirmar a grafia correta do nome</li>
                            <li>Testar com outro atendente para verificar se o sistema está funcionando</li>
                        </ul>
                        <p className="mt-2 font-medium">Verifique os logs do console para detalhes da consulta.</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return null;
};
