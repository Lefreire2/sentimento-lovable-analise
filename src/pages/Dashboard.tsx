
import { useState, useEffect } from "react";
import { useAgentData } from "@/hooks/useAgentData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AgentSelector } from "@/components/dashboard/AgentSelector";
import { PeriodSelector, PeriodFilter } from "@/components/dashboard/PeriodSelector";
import { DashboardStates } from "@/components/dashboard/DashboardStates";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { testDatabaseConnection } from "@/lib/database-test";

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

    console.log('🎛️ DASHBOARD - Estado atual:');
    console.log('- selectedAgent:', selectedAgent);
    console.log('- isLoading:', isLoading);
    console.log('- isError:', isError);
    console.log('- agentData:', agentData);
    console.log('- error:', error);

    // Lógica simplificada de renderização
    const shouldShowContent = selectedAgent && agentData && !isLoading;
    const shouldShowStates = !shouldShowContent;

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
