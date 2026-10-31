export type JsonRpcCaller = (method: string, params?: unknown[]) => Promise<unknown>;
/** A URL string or a `(method, params) => result` function. */
export type RpcSource = string | JsonRpcCaller;
export interface RpcOptions {
    rpc: RpcSource;
}
export declare class RpcError extends Error {
    readonly code: number | undefined;
    readonly data: unknown;
    constructor(message: string, code?: number, data?: unknown);
}
/**
 * Wraps a JSON-RPC URL in a caller using the global `fetch` (Node 18+, browsers).
 * Extra headers go on every request, which is how a keyed endpoint such as Uniblock
 * is used: `createRpc(url, { headers: { 'x-api-key': key } })`.
 */
export declare function createRpc(url: string, init?: {
    headers?: Record<string, string>;
    fetch?: typeof fetch;
}): JsonRpcCaller;
export declare function toCaller(rpc: RpcSource): JsonRpcCaller;
export declare function ethCall(rpc: RpcSource, to: string, data: string, block?: string): Promise<string>;
export declare function isRevert(error: unknown): boolean;
