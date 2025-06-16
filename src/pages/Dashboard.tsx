
import { useState, useEffect } from "react";
import { useAgentData } from "@/hooks/useAgentData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AgentSelector } from "@/components/dashboard/AgentSelector";
import { PeriodSelector, PeriodFilter } from "@/components/dashboard/PeriodSelector";
import { DashboardStates } from "@/components/dashboard/DashboardStates";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { getAllAvailableTables } from "@/lib/agents";
import { testDatabaseConnection, testSpecificTable } from "@/lib/database-test";

const Dashboard = () => {
    const [selectedAgent, setSelectedAgent] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>({
        type: 'last30days'
    });
    
    const { data: agentData, isLoading, isError, error } = useAgentData(selectedAgent);

    // Teste de conectividade quando o componente é montado
    useEffect(() => {
        console.log('🚀 DASHBOARD - Componente montado, iniciando testes');
        testDatabaseConnection();
    }, []);

    // Teste específico quando um agente é selecionado
    useEffect(() => {
        if (selectedAgent) {
            console.log('🎯 DASHBOARD - Agente selecionado:', selectedAgent);
            console.log('🧪 DASHBOARD - Iniciando testes específicos para:', selectedAgent);
            
            // Testar as tabelas específicas deste agente
            if (selectedAgent === 'André Araújo') {
                testSpecificTable('Lista_mensagens_Andre_araujo');
                testSpecificTable('Lista_de_Mensagens_Andre_araujo');
            }
        }
    }, [selectedAgent]);

    console.log('🎛️ DASHBOARD - Estado atual:');
    console.log('- selectedAgent:', selectedAgent);
    console.log('- selectedPeriod:', selectedPeriod);
    console.log('- isLoading:', isLoading);
    console.log('- isError:', isError);
    console.log('- agentData:', agentData);
    console.log('- error:', error);
    
    // Log das tabelas disponíveis no banco
    console.log('📊 DASHBOARD - Tabelas disponíveis no banco:', getAllAvailableTables());

    const shouldShowStates = isLoading || isError || !selectedAgent || (selectedAgent && !agentData);
    const shouldShowContent = agentData && !isLoading && !isError;

    console.log('🎯 DASHBOARD - Decisões de renderização:');
    console.log('- shouldShowStates:', shouldShowStates);
    console.log('- shouldShowContent:', shouldShowContent);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <DashboardHeader />
                <AgentSelector selectedAgent={selectedAgent} onAgentChange={setSelectedAgent} />
                <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
                
                {shouldShowStates && (
                    <DashboardStates 
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        selectedAgent={selectedAgent}
                        hasData={!!agentData}
                    />
                )}

                {shouldShowContent && (
                    <DashboardContent 
                        agentData={agentData} 
                        selectedAgent={selectedAgent}
                        selectedPeriod={selectedPeriod}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
