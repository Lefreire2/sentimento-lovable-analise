
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const MetricCard = ({ title, value, unit, icon: Icon }: MetricCardProps) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}{unit && ` ${unit}`}</div>
        </CardContent>
    </Card>
);
