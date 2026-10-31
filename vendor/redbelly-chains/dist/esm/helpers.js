// Read-only helpers. Each takes `{ rpc }`, a URL or a caller; nothing signs.
import { decodeAddress, decodeBool, decodeWords, encodeAddress, encodeCall, encodeString, selectors } from './abi.js';
import { addresses, registryNames } from './addresses.js';
import { ethCall, isRevert, toCaller } from './rpc.js';
/**
 * Six decimals on the price feed. Inferred on 2026-09-12 from `getLatestPrice()`
 * returning 2427 while the base fee times 21,000 gas came to US$0.01 at that price,
 * then confirmed the same day by calling `decimals()` (selector 0x313ce567) on both
 * feeds, which answered 6. Re-check with `getPriceFeedDecimals`; the live test does.
 */
export const PRICE_FEED_DECIMALS = 6;
const BOOTSTRAP_REGISTRY = addresses.mainnet.bootstrapRegistry.address;
const ZERO = '0x0000000000000000000000000000000000000000';
async function chainIdOf(rpc) {
    const raw = await toCaller(rpc)('eth_chainId');
    const id = Number(BigInt(raw));
    if (id !== 151 && id !== 153)
        throw new Error(`rpc reports chain ${id}; this package knows 151 and 153`);
    return id;
}
/**
 * Calls `getContractAddress(name)` on the bootstrap registry. Returns null when the
 * name is not registered: mainnet reverts (custom error 0x6b8e16c1), testnet returns
 * the zero address. Any other RPC failure is thrown.
 */
export async function resolveRegistry(name, opts) {
    const data = encodeCall(selectors.getContractAddress, encodeString(name));
    let result;
    try {
        result = await ethCall(opts.rpc, opts.registry ?? BOOTSTRAP_REGISTRY, data);
    }
    catch (error) {
        if (isRevert(error))
            return null;
        throw error;
    }
    const address = decodeAddress(result);
    return address.toLowerCase() === ZERO ? null : address;
}
/** The three names the registry is known to resolve, looked up in one pass. */
export async function resolveAllRegistryNames(opts) {
    const out = {};
    for (const name of registryNames)
        out[name] = await resolveRegistry(name, opts);
    return out;
}
/**
 * `permission.isAllowed(address)`: whether the wallet may send transactions on this
 * chain. The permission contract is resolved from the registry unless `permission`
 * is given. False for any wallet that has not completed access.redbelly.network.
 */
export async function isAllowed(address, opts) {
    const permission = opts.permission ?? (await resolveRegistry('permission', opts));
    if (!permission)
        throw new Error('registry did not resolve "permission"');
    const data = encodeCall(selectors.isAllowed, encodeAddress(address));
    return decodeBool(await ethCall(opts.rpc, permission, data));
}
/** Reads `getLatestPrice()` from the price feed the registry names. */
export async function getLatestPrice(opts) {
    const priceFeed = opts.priceFeed ?? (await resolveRegistry('pricefeed', opts));
    if (!priceFeed)
        throw new Error('registry did not resolve "pricefeed"');
    const returnData = (await ethCall(opts.rpc, priceFeed, selectors.getLatestPrice));
    const words = decodeWords(returnData);
    const raw = words[0];
    const ts = words[1];
    if (raw === undefined || ts === undefined)
        throw new Error(`getLatestPrice returned ${words.length} words, expected at least 2`);
    return {
        usdPerRbnt: Number(raw) / 10 ** PRICE_FEED_DECIMALS,
        raw,
        timestamp: Number(ts),
        decimals: PRICE_FEED_DECIMALS,
        returnData,
        priceFeed,
    };
}
/** Calls `decimals()` on the price feed so the six-decimal assumption can be re-checked. */
export async function getPriceFeedDecimals(opts) {
    const priceFeed = opts.priceFeed ?? (await resolveRegistry('pricefeed', opts));
    if (!priceFeed)
        throw new Error('registry did not resolve "pricefeed"');
    const [w] = decodeWords(await ethCall(opts.rpc, priceFeed, selectors.decimals));
    if (w === undefined)
        throw new Error('decimals() returned nothing');
    return Number(w);
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
export async function gasCostUsd(opts) {
    const gasUsed = BigInt(opts.gasUsed);
    const caller = toCaller(opts.rpc);
    const gasPriceWei = opts.gasPriceWei ?? (await latestBaseFee(caller));
    const price = await getLatestPrice(opts);
    const wei = gasUsed * gasPriceWei;
    const usdScaled = wei * price.raw; // USD times 10^(18+6)
    const scale = 10n ** BigInt(18 + PRICE_FEED_DECIMALS);
    const usd = Number((usdScaled * 1000000000n) / scale) / 1e9; // nine decimal places of USD
    return { usd, rbnt: formatUnits(wei, 18), wei, gasUsed, gasPriceWei, usdPerRbnt: price.usdPerRbnt, priceTimestamp: price.timestamp };
}
async function latestBaseFee(caller) {
    const block = (await caller('eth_getBlockByNumber', ['latest', false]));
    if (!block?.baseFeePerGas)
        throw new Error('latest block has no baseFeePerGas');
    return BigInt(block.baseFeePerGas);
}
/** Integer-to-decimal string, like viem's formatUnits. */
export function formatUnits(value, decimals) {
    const s = value.toString().padStart(decimals + 1, '0');
    const whole = s.slice(0, s.length - decimals);
    const frac = s.slice(s.length - decimals).replace(/0+$/, '');
    return frac ? `${whole}.${frac}` : whole;
}
/** Which network an RPC serves, so callers can pick the matching `addresses` entry. */
export async function networkOf(rpc) {
    return (await chainIdOf(rpc)) === 151 ? 'mainnet' : 'testnet';
}
