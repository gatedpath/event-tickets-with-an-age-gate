"use strict";
// Every helper takes either an RPC URL or a caller function. Nothing here needs viem.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcError = void 0;
exports.createRpc = createRpc;
exports.toCaller = toCaller;
exports.ethCall = ethCall;
exports.isRevert = isRevert;
class RpcError extends Error {
    code;
    data;
    constructor(message, code, data) {
        super(message);
        this.name = 'RpcError';
        this.code = code;
        this.data = data;
    }
}
exports.RpcError = RpcError;
let nextId = 1;
/**
 * Wraps a JSON-RPC URL in a caller using the global `fetch` (Node 18+, browsers).
 * Extra headers go on every request, which is how a keyed endpoint such as Uniblock
 * is used: `createRpc(url, { headers: { 'x-api-key': key } })`.
 */
function createRpc(url, init = {}) {
    const doFetch = init.fetch ?? globalThis.fetch;
    if (typeof doFetch !== 'function')
        throw new Error('no fetch available; pass one in or use Node 18+');
    return async (method, params = []) => {
        const response = await doFetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...(init.headers ?? {}) },
            body: JSON.stringify({ jsonrpc: '2.0', id: nextId++, method, params }),
        });
        if (!response.ok)
            throw new RpcError(`HTTP ${response.status} from ${url} for ${method}`);
        const body = (await response.json());
        if (body.error)
            throw new RpcError(body.error.message ?? JSON.stringify(body.error), body.error.code, body.error.data);
        return body.result;
    };
}
function toCaller(rpc) {
    return typeof rpc === 'string' ? createRpc(rpc) : rpc;
}
async function ethCall(rpc, to, data, block = 'latest') {
    const result = await toCaller(rpc)('eth_call', [{ to, data }, block]);
    if (typeof result !== 'string')
        throw new RpcError(`eth_call returned ${typeof result}`);
    return result;
}
function isRevert(error) {
    return error instanceof RpcError && /revert/i.test(error.message);
}
