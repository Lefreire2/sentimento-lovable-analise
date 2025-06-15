
import { useState } from "react";
import { useAgentData } from "@/hooks/useAgentData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AgentSelector } from "@/components/dashboard/AgentSelector";
import { DashboardStates } from "@/components/dashboard/DashboardStates";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { getAllAvailableTables } from "@/lib/agents";

const Dashboard = () => {
    const [selectedAgent, setSelectedAgent] = useState<string>('');
    const { data: agentData, isLoading, isError, error } = useAgentData(selectedAgent);

    console.log('🎛️ Dashboard - Estado atual:');
    console.log('- selectedAgent:', selectedAgent);
    console.log('- isLoading:', isLoading);
    console.log('- isError:', isError);
    console.log('- agentData:', agentData);
    console.log('- error:', error);
    
    // Log das tabelas disponíveis no banco
    console.log('📊 Tabelas disponíveis no banco:', getAllAvailableTables());

    const shouldShowStates = isLoading || isError || !selectedAgent || (selectedAgent && !agentData);
    const shouldShowContent = agentData && !isLoading && !isError;

    console.log('🎯 Dashboard - Decisões de renderização:');
    console.log('- shouldShowStates:', shouldShowStates);
    console.log('- shouldShowContent:', shouldShowContent);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <DashboardHeader />
                <AgentSelector selectedAgent={selectedAgent} onAgentChange={setSelectedAgent} />
                
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
                    <DashboardContent agentData={agentData} selectedAgent={selectedAgent} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
