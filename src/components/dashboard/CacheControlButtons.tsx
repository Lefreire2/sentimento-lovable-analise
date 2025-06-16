
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Trash2 } from "lucide-react";
import { useCacheManager } from "@/hooks/useCacheManager";
import { useState } from "react";

interface CacheControlButtonsProps {
    selectedAgent?: string;
}

export const CacheControlButtons = ({ selectedAgent }: CacheControlButtonsProps) => {
    const { clearAllCache, clearAgentCache, forceRefreshAllData } = useCacheManager();
    const [isClearing, setIsClearing] = useState(false);

    const handleClearAllCache = async () => {
        setIsClearing(true);
        try {
            await forceRefreshAllData();
            // Recarregar a página para garantir que tudo seja atualizado
            window.location.reload();
        } finally {
            setIsClearing(false);
        }
    };

    const handleClearAgentCache = async () => {
        if (!selectedAgent) return;
        
        setIsClearing(true);
        try {
            await clearAgentCache(selectedAgent);
            // Recarregar a página para garantir que o agente seja atualizado
            window.location.reload();
        } finally {
            setIsClearing(false);
        }
    };

    return (
        <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                    Controle de Cache
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Se ainda aparecem dados de demonstração, use os botões para limpar o cache
                </p>
            </div>
            <div className="flex gap-2">
                {selectedAgent && (
                    <Button
                        onClick={handleClearAgentCache}
                        disabled={isClearing}
                        variant="outline"
                        size="sm"
                        className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                    >
                        {isClearing ? (
                            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            <Database className="h-4 w-4 mr-2" />
                        )}
                        Limpar Cache do Agente
                    </Button>
                )}
                <Button
                    onClick={handleClearAllCache}
                    disabled={isClearing}
                    variant="outline"
                    size="sm"
                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                >
                    {isClearing ? (
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Limpar Todo Cache
                </Button>
            </div>
        </div>
    );
};
