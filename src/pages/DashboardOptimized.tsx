
import { useState, useEffect } from "react";
import { useAgentDataOptimized } from "@/hooks/useAgentDataOptimized";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AgentSelector } from "@/components/dashboard/AgentSelector";
import { PeriodSelector, PeriodFilter } from "@/components/dashboard/PeriodSelector";
import { DashboardStates } from "@/components/dashboard/DashboardStates";
import { DashboardContentOptimized } from "@/components/dashboard/DashboardContentOptimized";
import { CacheControlButtons } from "@/components/dashboard/CacheControlButtons";
import { testDatabaseConnection } from "@/lib/database-test";

const DashboardOptimized = () => {
    const [selectedAgent, setSelectedAgent] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>({
        type: 'last30days'
    });
    
    const { data: agentData, isLoading, isError, error } = useAgentDataOptimized(selectedAgent);

    // Teste de conectividade quando o componente é montado
    useEffect(() => {
        console.log('🚀 DASHBOARD-OPTIMIZED - Componente montado, testando conectividade');
        testDatabaseConnection();
    }, []);

    console.log('🎛️ DASHBOARD-OPTIMIZED - Estado atual:');
    console.log('- selectedAgent:', selectedAgent);
    console.log('- isLoading:', isLoading);
    console.log('- isError:', isError);
    console.log('- agentData:', agentData);

    // Lógica simplificada baseada no padrão André Araújo
    const shouldShowContent = selectedAgent && agentData && !isLoading;
    const shouldShowStates = !shouldShowContent;

    console.log('🎯 DASHBOARD-OPTIMIZED - Decisões de renderização:');
    console.log('- shouldShowStates:', shouldShowStates);
    console.log('- shouldShowContent:', shouldShowContent);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <DashboardHeader />
                <AgentSelector selectedAgent={selectedAgent} onAgentChange={setSelectedAgent} />
                <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
                
                {/* Controles de Cache otimizados */}
                {selectedAgent && (
                    <div className="mb-6">
                        <CacheControlButtons selectedAgent={selectedAgent} />
                    </div>
                )}
                
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
                    <DashboardContentOptimized 
                        agentData={agentData} 
                        selectedAgent={selectedAgent}
                        selectedPeriod={selectedPeriod}
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardOptimized;
