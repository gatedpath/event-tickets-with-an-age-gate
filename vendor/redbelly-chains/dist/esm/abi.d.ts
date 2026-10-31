export type Hex = `0x${string}`;
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
export declare const selectors: {
    readonly isAllowed: "0xbabcc539";
    readonly getContractAddress: "0x04433bbc";
    readonly getLatestPrice: "0x8e15f473";
    readonly decimals: "0x313ce567";
};
export declare const signatures: {
    readonly isAllowed: "isAllowed(address)";
    readonly getContractAddress: "getContractAddress(string)";
    readonly getLatestPrice: "getLatestPrice()";
    readonly decimals: "decimals()";
};
export declare function assertSelectorsMatchSignatures(): void;
export declare function encodeAddress(address: string): string;
export declare function encodeUint256(value: bigint): string;
/** ABI encoding of a single `string` argument: offset word, length word, padded UTF-8. */
export declare function encodeString(value: string): string;
export declare function encodeCall(selector: Hex, ...args: string[]): Hex;
export declare function decodeWords(data: string): bigint[];
export declare function decodeBool(data: string): boolean;
export declare function decodeAddress(data: string): Hex;
