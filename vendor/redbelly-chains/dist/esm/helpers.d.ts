import type { Hex } from './abi.js';
import type { RegistryName } from './addresses.js';
import type { RpcSource } from './rpc.js';
export interface HelperOptions {
    rpc: RpcSource;
    /** Override the bootstrap registry address. Defaults to the shared 0xDAFE... address. */
    registry?: Hex;
}
/**
 * Six decimals on the price feed. Inferred on 2026-09-12 from `getLatestPrice()`
 * returning 2427 while the base fee times 21,000 gas came to US$0.01 at that price,
 * then confirmed the same day by calling `decimals()` (selector 0x313ce567) on both
 * feeds, which answered 6. Re-check with `getPriceFeedDecimals`; the live test does.
 */
export declare const PRICE_FEED_DECIMALS: 6;
/**
 * Calls `getContractAddress(name)` on the bootstrap registry. Returns null when the
 * name is not registered: mainnet reverts (custom error 0x6b8e16c1), testnet returns
 * the zero address. Any other RPC failure is thrown.
 */
export declare function resolveRegistry(name: RegistryName | string, opts: HelperOptions): Promise<Hex | null>;
/** The three names the registry is known to resolve, looked up in one pass. */
export declare function resolveAllRegistryNames(opts: HelperOptions): Promise<Record<RegistryName, Hex | null>>;
/**
 * `permission.isAllowed(address)`: whether the wallet may send transactions on this
 * chain. The permission contract is resolved from the registry unless `permission`
 * is given. False for any wallet that has not completed access.redbelly.network.
 */
export declare function isAllowed(address: string, opts: HelperOptions & {
    permission?: Hex;
}): Promise<boolean>;
export interface LatestPrice {
    /** US dollars per RBNT as a JavaScript number, e.g. 0.002432. */
    usdPerRbnt: number;
    /** The first return word, unscaled: usdPerRbnt times 10^decimals. */
    raw: bigint;
    /** Unix seconds, second return word. Matched the latest block timestamp when measured. */
    timestamp: number;
    decimals: typeof PRICE_FEED_DECIMALS;
    /** Full return data. Three words were returned on 2026-09-12; Vine's ABI lists two. The third was zero. */
    returnData: Hex;
    priceFeed: Hex;
}
/** Reads `getLatestPrice()` from the price feed the registry names. */
export declare function getLatestPrice(opts: HelperOptions & {
    priceFeed?: Hex;
}): Promise<LatestPrice>;
/** Calls `decimals()` on the price feed so the six-decimal assumption can be re-checked. */
export declare function getPriceFeedDecimals(opts: HelperOptions & {
    priceFeed?: Hex;
}): Promise<number>;
export interface GasCost {
    usd: number;
    /** RBNT as a decimal string with 18 places, computed in integers. */
    rbnt: string;
    wei: bigint;
    gasUsed: bigint;
    /** Wei per gas actually used in the calculation. */
    gasPriceWei: bigint;
    usdPerRbnt: number;
    priceTimestamp: number;
}
/**
 * USD cost of `gasUsed` gas at the current base fee and feed price. The chain charges
 * base fee only: `eth_maxPriorityFeePerGas` is 0 and `eth_gasPrice` is the base fee
 * plus ten percent of headroom, so the base fee is the right multiplier. Pass
 * `gasPriceWei` to price a specific transaction from its receipt instead.
 *
 * Arithmetic: wei = gasUsed * gasPrice; usd = wei * raw / 10^(18 + 6). Only the last
 * division leaves BigInt.
 */
export declare function gasCostUsd(opts: HelperOptions & {
    gasUsed: bigint | number;
    gasPriceWei?: bigint;
}): Promise<GasCost>;
/** Integer-to-decimal string, like viem's formatUnits. */
export declare function formatUnits(value: bigint, decimals: number): string;
/** Which network an RPC serves, so callers can pick the matching `addresses` entry. */
export declare function networkOf(rpc: RpcSource): Promise<'mainnet' | 'testnet'>;
