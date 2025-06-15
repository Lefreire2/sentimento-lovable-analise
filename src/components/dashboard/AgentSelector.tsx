
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agentTables, formatAgentName } from "@/lib/agents";

interface AgentSelectorProps {
    selectedAgent: string;
    onAgentChange: (agent: string) => void;
}

export const AgentSelector = ({ selectedAgent, onAgentChange }: AgentSelectorProps) => {
    const handleAgentChange = (tableName: string) => {
        console.log('🎯 Agente selecionado (tabela):', tableName);
        const formattedName = formatAgentName(tableName);
        console.log('📝 Nome formatado:', formattedName);
        console.log('🔄 Enviando nome formatado para o hook:', formattedName);
        onAgentChange(formattedName);
    };

    // Debug: verificar o valor selecionado atual
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
                            <SelectItem key={table} value={table}>
                                {formattedName}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
};
