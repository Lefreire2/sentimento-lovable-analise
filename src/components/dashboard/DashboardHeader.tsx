
import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const DashboardHeader = () => {
    return (
        <div className="flex items-center mb-6">
            <Button asChild variant="outline" size="icon" className="mr-4">
                <Link to="/"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard de Métricas</h1>
        </div>
    );
};
