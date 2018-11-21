export interface EventNode {
    title: string;
    key: string;
    expanded?: boolean;
    children?: EventNode[];
    correlationId: string;
    clientIp: string;
    elapsedMilliseconds: number;
    timestamp?: Date;
}
