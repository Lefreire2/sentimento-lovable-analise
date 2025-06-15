
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface PeriodFilter {
    type: 'last7days' | 'last30days' | 'last90days' | 'custom';
    startDate?: Date;
    endDate?: Date;
}

interface PeriodSelectorProps {
    selectedPeriod: PeriodFilter;
    onPeriodChange: (period: PeriodFilter) => void;
}

export const PeriodSelector = ({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) => {
    const [isStartDateOpen, setIsStartDateOpen] = useState(false);
    const [isEndDateOpen, setIsEndDateOpen] = useState(false);

    const handlePeriodTypeChange = (type: string) => {
        const periodType = type as PeriodFilter['type'];
        
        if (periodType === 'custom') {
            onPeriodChange({
                type: periodType,
                startDate: selectedPeriod.startDate || new Date(),
                endDate: selectedPeriod.endDate || new Date()
            });
        } else {
            onPeriodChange({ type: periodType });
        }
    };

    const handleStartDateChange = (date: Date | undefined) => {
        if (date) {
            onPeriodChange({
                ...selectedPeriod,
                startDate: date
            });
        }
        setIsStartDateOpen(false);
    };

    const handleEndDateChange = (date: Date | undefined) => {
        if (date) {
            onPeriodChange({
                ...selectedPeriod,
                endDate: date
            });
        }
        setIsEndDateOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Período de Análise
                </label>
                <Select onValueChange={handlePeriodTypeChange} value={selectedPeriod.type}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Selecione o período..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="last7days">Últimos 7 dias</SelectItem>
                        <SelectItem value="last30days">Últimos 30 dias</SelectItem>
                        <SelectItem value="last90days">Últimos 90 dias</SelectItem>
                        <SelectItem value="custom">Período personalizado</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {selectedPeriod.type === 'custom' && (
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Data Inicial
                        </label>
                        <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-48 justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {selectedPeriod.startDate ? 
                                        format(selectedPeriod.startDate, "dd/MM/yyyy", { locale: ptBR }) : 
                                        "Selecionar data"
                                    }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={selectedPeriod.startDate}
                                    onSelect={handleStartDateChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Data Final
                        </label>
                        <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-48 justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {selectedPeriod.endDate ? 
                                        format(selectedPeriod.endDate, "dd/MM/yyyy", { locale: ptBR }) : 
                                        "Selecionar data"
                                    }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={selectedPeriod.endDate}
                                    onSelect={handleEndDateChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            )}
        </div>
    );
};
