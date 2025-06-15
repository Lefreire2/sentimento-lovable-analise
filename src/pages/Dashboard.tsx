
import { useState } from "react";
import { useAgentData } from "@/hooks/useAgentData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AgentSelector } from "@/components/dashboard/AgentSelector";
import { DashboardStates } from "@/components/dashboard/DashboardStates";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
    const [selectedAgent, setSelectedAgent] = useState<string>('');
    const { data: agentData, isLoading, isError, error } = useAgentData(selectedAgent);

    const shouldShowStates = isLoading || isError || !selectedAgent || (selectedAgent && !agentData);
    const shouldShowContent = agentData && !isLoading && !isError;

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
