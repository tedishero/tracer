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
