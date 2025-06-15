
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agentTables, formatAgentName } from "@/lib/agents";

interface AgentSelectorProps {
    selectedAgent: string;
    onAgentChange: (agent: string) => void;
}

export const AgentSelector = ({ selectedAgent, onAgentChange }: AgentSelectorProps) => {
    return (
        <div className="mb-6 max-w-sm">
            <Select onValueChange={onAgentChange} value={selectedAgent}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione um atendente..." />
                </SelectTrigger>
                <SelectContent>
                    {agentTables.map(table => (
                        <SelectItem key={table} value={table}>
                            {formatAgentName(table)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
