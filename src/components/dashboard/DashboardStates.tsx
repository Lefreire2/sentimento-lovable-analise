
import { Loader2, BarChart2, Users, AlertTriangle, Database } from "lucide-react";
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
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                        <Database className="h-5 w-5" />
                        Tabelas vazias para {selectedAgent}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-blue-700 dark:text-blue-300">
                        As tabelas do atendente <strong>{selectedAgent}</strong> existem no banco de dados, mas estão vazias.
                    </p>
                    <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
                        <p><strong>Status detectado:</strong></p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>✅ Tabelas encontradas no banco de dados</li>
                            <li>✅ Acesso às tabelas funcionando</li>
                            <li>⚠️ Nenhum registro encontrado nas tabelas</li>
                        </ul>
                        <p className="mt-2 font-medium">
                            Isso significa que os dados para este atendente ainda não foram importados ou processados.
                        </p>
                        <p className="mt-1">
                            Os dados exibidos no dashboard são exemplos para demonstração da interface.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return null;
};
