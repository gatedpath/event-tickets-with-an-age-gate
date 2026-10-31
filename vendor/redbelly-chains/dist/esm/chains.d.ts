import type { Hex } from './abi.js';
export interface ChainContract {
    readonly address: Hex;
    readonly blockCreated?: number;
}
export interface ChainRpcUrls {
    readonly http: readonly string[];
    readonly webSocket?: readonly string[];
}
export interface ChainBlockExplorer {
    readonly name: string;
    readonly url: string;
    readonly apiUrl?: string;
}
export interface ChainDefinition {
    readonly id: number;
    readonly name: string;
    readonly nativeCurrency: {
        readonly name: string;
        readonly symbol: string;
        readonly decimals: number;
    };
    readonly rpcUrls: {
        readonly default: ChainRpcUrls;
        readonly public: ChainRpcUrls;
    };
    readonly blockExplorers: {
        readonly default: ChainBlockExplorer;
    };
    readonly contracts: Readonly<Record<string, ChainContract>>;
    readonly testnet: boolean;
}
export declare const redbellyMainnet: ChainDefinition;
export declare const redbellyTestnet: ChainDefinition;
/**
 * Public endpoints that need a key. Kept out of the Chain objects on purpose so a
 * client never picks one up without the header. Use
 * `createRpc(keyedRpcs.mainnet.uniblock.url, { headers: { 'x-api-key': key } })`.
 */
export declare const keyedRpcs: {
    readonly mainnet: {
        readonly uniblock: {
            readonly url: "https://api.uniblock.dev/uni/v1/json-rpc?chainId=151";
            readonly header: "x-api-key";
            readonly source: "https://vine.redbelly.network/environments/";
            readonly verifiedOn: "2026-09-12";
        };
    };
};
export declare const chains: {
    readonly mainnet: ChainDefinition;
    readonly testnet: ChainDefinition;
};
export type NetworkName = keyof typeof chains;
export declare function chainById(id: number): ChainDefinition | undefined;
