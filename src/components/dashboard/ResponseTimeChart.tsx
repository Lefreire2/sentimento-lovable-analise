
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AgentData {
    tempo_primeira_resposta_minutos: string;
    tempo_medio_resposta_atendente_minutos: string;
    tempo_maximo_resposta_atendente_minutos: string;
}

interface ResponseTimeChartProps {
    agentData: AgentData;
}

export const ResponseTimeChart = ({ agentData }: ResponseTimeChartProps) => {
    const chartData = [
        { name: 'Primeira Resposta', minutos: parseFloat(agentData.tempo_primeira_resposta_minutos) || 0 },
        { name: 'Resposta Média', minutos: parseFloat(agentData.tempo_medio_resposta_atendente_minutos) || 0 },
        { name: 'Resposta Máxima', minutos: parseFloat(agentData.tempo_maximo_resposta_atendente_minutos) || 0 },
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Gráfico de Tempos de Resposta</h2>
            <Card>
                <CardContent className="pt-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="minutos" fill="#8884d8" name="Minutos" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};
