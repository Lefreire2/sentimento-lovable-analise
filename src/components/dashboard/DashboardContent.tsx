
import { StrategicAnalysisSection } from "./StrategicAnalysisSection";
import { AIAnalysisSection } from "./AIAnalysisSection";
import { SentimentMetrics } from "./SentimentMetrics";
import { TimeMetrics } from "./TimeMetrics";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { ResponseTimeChart } from "./ResponseTimeChart";
import { AgentData } from "@/hooks/useAgentData";

interface DashboardContentProps {
    agentData: AgentData;
    selectedAgent: string;
}

export const DashboardContent = ({ agentData, selectedAgent }: DashboardContentProps) => {
    return (
        <div className="space-y-8">
            <StrategicAnalysisSection agentData={agentData} selectedAgent={selectedAgent} />
            <AIAnalysisSection agentData={agentData} selectedAgent={selectedAgent} />
            <SentimentMetrics agentData={agentData} />
            <TimeMetrics agentData={agentData} />
            <PerformanceMetrics agentData={agentData} />
            <ResponseTimeChart agentData={agentData} />
        </div>
    );
};
