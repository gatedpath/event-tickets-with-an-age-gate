"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = exports.keyedRpcs = exports.redbellyTestnet = exports.redbellyMainnet = void 0;
exports.chainById = chainById;
// viem-compatible Chain objects. The shape mirrors viem's `Chain` type without
// importing it, so this file compiles with no dependencies; `npm run check:viem`
// proves assignability against the real type.
const addresses_js_1 = require("./addresses.js");
/**
 * RBNT has 18 decimals. Confirmed three ways on 2026-09-12: the ethereum-lists entries
 * for 151 and 153 say `decimals: 18`; a balance read with eth_getBalance came back as
 * 54,647,919,730,062,155,425,000 wei for an account whose activity fits ~54,648 RBNT;
 * and the fee arithmetic only closes at 18: base fee 195,882,548,823,725 wei times
 * 21,000 gas is 4.11e18 wei, which at the feed's US$0.002432 per RBNT is US$0.0100,
 * the transfer price Vine states.
 */
const nativeCurrency = { name: 'Redbelly Network Coin', symbol: 'RBNT', decimals: 18 };
const pick = (set, keys, created = {}) => {
    const out = {};
    for (const k of keys) {
        const a = set[k];
        if (!a)
            throw new Error(`no address named ${k}`);
        out[k] = created[k] === undefined ? { address: a.address } : { address: a.address, blockCreated: created[k] };
    }
    return out;
};
const sharedContractNames = [
    'bootstrapRegistry', 'permission', 'pricefeed', 'gasfees', 'accreditedIssuerRegistry',
    'nicksDeployer', 'safeSingletonFactory', 'safeSingleton', 'safeL2Singleton', 'safeProxyFactory',
    'safeFallbackHandler', 'safeMultiSend', 'safeMultiSendCallOnly', 'safeCreateCall', 'safeSignMessageLib',
    'safeSimulateTxAccessor', 'eip2935History',
];
exports.redbellyMainnet = {
    id: 151,
    name: 'Redbelly Network Mainnet',
    nativeCurrency,
    rpcUrls: {
        default: { http: ['https://governors.mainnet.redbelly.network'] },
        public: { http: ['https://governors.mainnet.redbelly.network', 'https://rpc.ankr.com/redbelly_mainnet'] },
    },
    blockExplorers: {
        default: {
            name: 'Routescan',
            url: 'https://redbelly.routescan.io',
            apiUrl: 'https://api.routescan.io/v2/network/mainnet/evm/151/etherscan/api',
        },
    },
    contracts: {
        multicall3: { address: addresses_js_1.addresses.mainnet.multicall3.address, blockCreated: 2714761 },
        ...pick(addresses_js_1.addresses.mainnet, sharedContractNames, { permission: 25, bootstrapRegistry: 0 }),
    },
    testnet: false,
};
exports.redbellyTestnet = {
    id: 153,
    name: 'Redbelly Network Testnet',
    nativeCurrency,
    rpcUrls: {
        default: { http: ['https://governors.testnet.redbelly.network'] },
        public: { http: ['https://governors.testnet.redbelly.network'] },
    },
    blockExplorers: {
        default: {
            name: 'Routescan',
            url: 'https://redbelly.testnet.routescan.io',
            apiUrl: 'https://api.routescan.io/v2/network/testnet/evm/153/etherscan/api',
        },
    },
    contracts: {
        multicall3: { address: addresses_js_1.addresses.testnet.multicall3.address, blockCreated: 2823505 },
        permit2: { address: addresses_js_1.addresses.testnet.permit2.address },
        ...pick(addresses_js_1.addresses.testnet, sharedContractNames, { permission: 26, bootstrapRegistry: 0 }),
    },
    testnet: true,
};
/**
 * Public endpoints that need a key. Kept out of the Chain objects on purpose so a
 * client never picks one up without the header. Use
 * `createRpc(keyedRpcs.mainnet.uniblock.url, { headers: { 'x-api-key': key } })`.
 */
exports.keyedRpcs = {
    mainnet: {
        uniblock: {
            url: 'https://api.uniblock.dev/uni/v1/json-rpc?chainId=151',
            header: 'x-api-key',
            source: 'https://vine.redbelly.network/environments/',
            verifiedOn: '2026-09-12',
        },
    },
};
exports.chains = { mainnet: exports.redbellyMainnet, testnet: exports.redbellyTestnet };
function chainById(id) {
    return id === 151 ? exports.redbellyMainnet : id === 153 ? exports.redbellyTestnet : undefined;
}
