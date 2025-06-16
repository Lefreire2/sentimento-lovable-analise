
import { StrategicAnalysisSection } from "./StrategicAnalysisSection";
import { AIAnalysisSection } from "./AIAnalysisSection";
import { FunnelAnalysisSection } from "./FunnelAnalysisSection";
import { FunnelChart } from "./FunnelChart";
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
            <FunnelChart 
                agentData={agentData} 
                selectedAgent={selectedAgent}
                selectedPeriod={selectedPeriod}
            />
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
            <SentimentMetrics selectedAgent={selectedAgent} />
            <TimeMetrics selectedAgent={selectedAgent} />
            <PerformanceMetrics selectedAgent={selectedAgent} />
            <ResponseTimeChart selectedAgent={selectedAgent} />
        </div>
    );
};
