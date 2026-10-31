import type { CheckResult } from '../types.js';
/**
 * keccak256 of the runtime code at the canonical Safe 1.4.1 addresses, read with eth_getCode
 * from both governors RPCs on 2026-09-12 (identical on 151 and 153). A singleton whose code
 * hashes to something else is not the Safe 1.4.1 release, whatever address it sits at.
 */
export declare const SAFE_141_CODE_HASHES: {
    readonly safeSingleton: "0x1fe2df852ba3299d6534ef416eefa406e56ced995bca886ab7a553e6d0c5e1c4";
    readonly safeL2Singleton: "0xb1f926978a0f44a2c0ec8fe822418ae969bd8c3f18d61e5103100339894f81ff";
    readonly safeProxyFactory: "0x50c3cdc4074750a7a974204a716c999edd37482f907608d960b2b025ee0b3317";
    readonly safeFallbackHandler: "0x7c6007a5d711cea8dfd5d91f5940ec29c7f200fe511eb1fc1397b367af3c42f9";
    /** The 171-byte runtime code of a SafeProxy made by that factory, the same at every address; derived 2026-09-19 from the fixtures (code hash). */
    readonly safeProxy: "0xd7d408ebcd99b2b70be43e20253d6d92a8ea8fab29bd3be7f55b10032331fb4c";
};
/** keccak256 of runtime code given as a 0x hex string, hashing the bytes rather than the text. */
export declare function codeHash(codeHex: string): string;
export interface AdminReading {
    address: string;
    isContract: boolean;
    singleton: string | null;
    singletonKind: 'safeSingleton' | 'safeL2Singleton' | null;
    singletonCodeMatches: boolean | null;
    /** The admin's own runtime code is the SafeProxy 1.4.1 code. Its answers prove nothing; its code does. */
    proxyCodeMatches: boolean;
    threshold: number | null;
    ownerCount: number | null;
}
export declare function readAdmin(address: string, rpc: string, network: 'mainnet' | 'testnet'): Promise<AdminReading>;
export declare function checkAdminSafe(admin: string | null, rpc: string, chain: number | null): Promise<CheckResult>;
