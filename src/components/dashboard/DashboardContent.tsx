
import { StrategicAnalysisSection } from "./StrategicAnalysisSection";
import { AIAnalysisSection } from "./AIAnalysisSection";
import { FunnelAnalysisSection } from "./FunnelAnalysisSection";
import { SentimentMetrics } from "./SentimentMetrics";
import { TimeMetrics } from "./TimeMetrics";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { ResponseTimeChart } from "./ResponseTimeChart";
import { PeriodFilter } from "./PeriodSelector";
import { AgentData } from "@/hooks/useAgentData";

interface DashboardContentProps {
    agentData: AgentData;
    selectedAgent: string;
    selectedPeriod: PeriodFilter;
}

export const DashboardContent = ({ agentData, selectedAgent, selectedPeriod }: DashboardContentProps) => {
    return (
        <div className="space-y-8">
            <FunnelAnalysisSection 
                agentData={agentData} 
                selectedAgent={selectedAgent}
                selectedPeriod={selectedPeriod}
            />
            <StrategicAnalysisSection 
                agentData={agentData} 
                selectedAgent={selectedAgent}
                selectedPeriod={selectedPeriod}
            />
            <AIAnalysisSection 
                agentData={agentData} 
                selectedAgent={selectedAgent} 
            />
            <SentimentMetrics agentData={agentData} />
            <TimeMetrics agentData={agentData} />
            <PerformanceMetrics agentData={agentData} />
            <ResponseTimeChart agentData={agentData} />
        </div>
    );
};
