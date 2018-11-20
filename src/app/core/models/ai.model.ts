export interface AIColumn {
    name: string;
    type: string;
}

export interface AITable {
    name: string;
    columns: AIColumn[];
    rows: any[][];
}

export interface AIResponse {
    tables: AITable[];
}

export interface AIEvent {
    methodName: string;
    activityId: string;
    correlationId: string;
    clientIp: string;
    elapsedMilliseconds: number;
}
