// The smallest slice of ABI encoding the helpers need. No dynamic types other than
// `string` as a single argument, no tuples, no arrays.
import { checksumAddress, functionSelector } from './keccak.js';
/**
 * Function selectors used by the helpers, with where each signature comes from.
 * `functionSelector` recomputes them; the unit tests assert the two agree.
 *
 * - `isAllowed(address)`: interface `IPermission` in the verified
 *   `RedbellyPermissionChecker` at 0xf0da85AB0D065c46290501C3c138035fA8f9EE8F on 153
 *   (Routescan, verified 2026-06-21). The permission contract itself is not verified.
 * - `getContractAddress(string)`: ABI printed on vine.redbelly.network/network-fees/
 *   and the same `IBootstrap` interface in the checker above.
 * - `getLatestPrice()`: ABI printed on vine.redbelly.network/network-fees/.
 * - `decimals()`: not documented anywhere; measured on 2026-09-12 to answer 6 on
 *   both price feeds. Used only to re-check the six-decimal assumption.
 */
export const selectors = {
    isAllowed: '0xbabcc539',
    getContractAddress: '0x04433bbc',
    getLatestPrice: '0x8e15f473',
    decimals: '0x313ce567',
};
export const signatures = {
    isAllowed: 'isAllowed(address)',
    getContractAddress: 'getContractAddress(string)',
    getLatestPrice: 'getLatestPrice()',
    decimals: 'decimals()',
};
export function assertSelectorsMatchSignatures() {
    for (const key of Object.keys(selectors)) {
        const computed = functionSelector(signatures[key]);
        if (computed !== selectors[key])
            throw new Error(`selector for ${signatures[key]} is ${computed}, table says ${selectors[key]}`);
    }
}
const strip = (h) => (h.startsWith('0x') ? h.slice(2) : h);
export function encodeAddress(address) {
    const lower = address.toLowerCase();
    if (!/^0x[0-9a-f]{40}$/.test(lower))
        throw new Error(`not an address: ${address}`);
    return lower.slice(2).padStart(64, '0');
}
export function encodeUint256(value) {
    if (value < 0n || value >= 1n << 256n)
        throw new Error(`uint256 out of range: ${value}`);
    return value.toString(16).padStart(64, '0');
}
/** ABI encoding of a single `string` argument: offset word, length word, padded UTF-8. */
export function encodeString(value) {
    const bytes = new TextEncoder().encode(value);
    let hex = '';
    for (const b of bytes)
        hex += b.toString(16).padStart(2, '0');
    const padded = hex.padEnd(Math.ceil(bytes.length / 32) * 64, '0');
    return encodeUint256(32n) + encodeUint256(BigInt(bytes.length)) + padded;
}
export function encodeCall(selector, ...args) {
    return (selector + args.join(''));
}
export function decodeWords(data) {
    const body = strip(data);
    if (body.length % 64 !== 0)
        throw new Error(`return data is not whole words: ${data}`);
    const words = [];
    for (let i = 0; i < body.length; i += 64)
        words.push(BigInt('0x' + body.slice(i, i + 64)));
    return words;
}
export function decodeBool(data) {
    const [w] = decodeWords(data);
    if (w === undefined)
        throw new Error('empty return data where a bool was expected');
    if (w !== 0n && w !== 1n)
        throw new Error(`not a bool word: ${data}`);
    return w === 1n;
}
export function decodeAddress(data) {
    const [w] = decodeWords(data);
    if (w === undefined)
        throw new Error('empty return data where an address was expected');
    if (w >= 1n << 160n)
        throw new Error(`address word has high bits set: ${data}`);
    return checksumAddress('0x' + w.toString(16).padStart(40, '0'));
}
