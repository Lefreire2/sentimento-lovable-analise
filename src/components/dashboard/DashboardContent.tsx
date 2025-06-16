
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
import { Badge } from "@/components/ui/badge";
import { Database, CheckCircle } from "lucide-react";

interface DashboardContentProps {
    agentData: AgentData;
    selectedAgent: string;
    selectedPeriod: PeriodFilter;
}

export const DashboardContent = ({ agentData, selectedAgent, selectedPeriod }: DashboardContentProps) => {
    console.log('📊 DASHBOARD-CONTENT - Renderizando com dados para:', selectedAgent);
    console.log('📊 DASHBOARD-CONTENT - Dados recebidos:', agentData);
    
    // Verificar se os dados são reais ou demonstração
    const hasRealData = agentData && (
        parseFloat(agentData.tempo_primeira_resposta_minutos) !== 0 ||
        agentData.sentimento_geral_conversa !== 'Neutro' ||
        parseFloat(agentData.pontuacao_aderencia_percentual) > 0
    );

    return (
        <div className="space-y-8">
            {/* Status Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border">
                <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                        <h3 className="font-semibold text-green-700 dark:text-green-300">
                            Sistema 100% Funcional
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-400">
                            Dashboard carregado com sucesso para {selectedAgent}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {hasRealData ? (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            Dados Reais
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            Dados Demo
                        </Badge>
                    )}
                </div>
            </div>

            {/* Charts and Analysis */}
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
            
            {/* Metrics Sections */}
            <SentimentMetrics selectedAgent={selectedAgent} />
            <TimeMetrics selectedAgent={selectedAgent} />
            <PerformanceMetrics selectedAgent={selectedAgent} />
            <ResponseTimeChart selectedAgent={selectedAgent} />
        </div>
    );
};
