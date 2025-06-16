
export interface FunnelStepData {
    name: string;
    value: number;
    color: string;
    description: string;
}

export interface FunnelData {
    steps: FunnelStepData[];
    conversionRate: number;
}
