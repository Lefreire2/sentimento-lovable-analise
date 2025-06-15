
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agentTables, formatAgentName } from "@/lib/agents";

interface AgentSelectorProps {
    selectedAgent: string;
    onAgentChange: (agent: string) => void;
}

export const AgentSelector = ({ selectedAgent, onAgentChange }: AgentSelectorProps) => {
    const handleAgentChange = (formattedName: string) => {
        console.log('🎯 Agente selecionado (nome formatado):', formattedName);
        onAgentChange(formattedName);
    };

    console.log('🎨 AgentSelector - selectedAgent atual:', selectedAgent);

    return (
        <div className="mb-6 max-w-sm">
            <Select onValueChange={handleAgentChange} value={selectedAgent}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione um atendente..." />
                </SelectTrigger>
                <SelectContent>
                    {agentTables.map(table => {
                        const formattedName = formatAgentName(table);
                        console.log(`📋 Mapeando: ${table} -> ${formattedName}`);
                        return (
                            <SelectItem key={table} value={formattedName}>
                                {formattedName}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
};
