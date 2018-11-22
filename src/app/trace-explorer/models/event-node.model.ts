export interface EventNode {
    title: string;
    id: string;
    key: string;
    children?: EventNode[];
    correlationId: string;
    clientIp: string;
    elapsedMilliseconds: number;
    isExpanded?: boolean;
    timestamp?: Date;
}
