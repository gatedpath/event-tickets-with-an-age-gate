import type { Hex } from './abi.js';
export interface VerifiedAddress {
    readonly address: Hex;
    /** Date the address was confirmed on this chain, ISO 8601. */
    readonly verifiedOn: '2026-09-12';
    /** Primary page URL, or the RPC method that proved it. */
    readonly source: string;
    readonly note?: string;
}
export declare const addresses: {
    readonly mainnet: {
        readonly multicall3: VerifiedAddress;
        readonly nicksDeployer: VerifiedAddress;
        readonly safeSingletonFactory: VerifiedAddress;
        readonly safeSingleton: VerifiedAddress;
        readonly safeL2Singleton: VerifiedAddress;
        readonly safeProxyFactory: VerifiedAddress;
        readonly safeFallbackHandler: VerifiedAddress;
        readonly safeMultiSend: VerifiedAddress;
        readonly safeMultiSendCallOnly: VerifiedAddress;
        readonly safeCreateCall: VerifiedAddress;
        readonly safeSignMessageLib: VerifiedAddress;
        readonly safeSimulateTxAccessor: VerifiedAddress;
        readonly eip2935History: VerifiedAddress;
        readonly bootstrapRegistry: VerifiedAddress;
        readonly permission: VerifiedAddress;
        readonly pricefeed: VerifiedAddress;
        readonly gasfees: VerifiedAddress;
        readonly accreditedIssuerRegistry: VerifiedAddress;
    };
    readonly testnet: {
        readonly multicall3: VerifiedAddress;
        readonly nicksDeployer: VerifiedAddress;
        readonly safeSingletonFactory: VerifiedAddress;
        readonly safeSingleton: VerifiedAddress;
        readonly safeL2Singleton: VerifiedAddress;
        readonly safeProxyFactory: VerifiedAddress;
        readonly safeFallbackHandler: VerifiedAddress;
        readonly safeMultiSend: VerifiedAddress;
        readonly safeMultiSendCallOnly: VerifiedAddress;
        readonly safeCreateCall: VerifiedAddress;
        readonly safeSignMessageLib: VerifiedAddress;
        readonly safeSimulateTxAccessor: VerifiedAddress;
        readonly eip2935History: VerifiedAddress;
        readonly bootstrapRegistry: VerifiedAddress;
        readonly permission: VerifiedAddress;
        readonly pricefeed: VerifiedAddress;
        readonly gasfees: VerifiedAddress;
        readonly accreditedIssuerRegistry: VerifiedAddress;
        readonly permit2: VerifiedAddress;
    };
};
export type MainnetAddressName = keyof typeof addresses.mainnet;
export type TestnetAddressName = keyof typeof addresses.testnet;
/** Names the bootstrap registry resolves. Any other name reverts on 151 and returns the zero address on 153. */
export declare const registryNames: readonly ["permission", "pricefeed", "gasfees"];
export type RegistryName = (typeof registryNames)[number];
/**
 * Addresses that `permission.isAllowed` returned true for on 2026-09-12. Used by the
 * live tests as positive controls. They are third parties; do not rely on them
 * staying allowed.
 */
export declare const knownAllowed: {
    readonly mainnet: {
        readonly address: Hex;
        readonly source: "Deployer of the verified RedbellyPermissionChecker on 153 (tx 0xe870ea77a1d173b8956c9144f3f52ffcc7421639b4727ed698d4634b07f03f85); isAllowed true on 151 and 153";
    };
    readonly testnet: {
        readonly address: Hex;
        readonly source: "Deployer of the verified RedbellyPermissionChecker on 153 (tx 0xe870ea77a1d173b8956c9144f3f52ffcc7421639b4727ed698d4634b07f03f85); isAllowed true on 151 and 153";
    };
};
