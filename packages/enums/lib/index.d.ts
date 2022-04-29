export declare const DEFAULT_TOPIC = "DEFAULT_TOPIC";
export declare const COLLECTION_NAME = "SYNC_DOCUMENT";
export declare const PORT = 8083;
export declare const PROTOCAL = "ws://";
export declare const WS_URL: string;
export interface DataContent {
    content: string;
}
export declare const cs: (base: string, extra: {
    [key: string]: boolean;
}) => string;
