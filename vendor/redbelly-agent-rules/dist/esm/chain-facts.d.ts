export declare const chainFacts: {
    readonly verifiedOn: "2026-09-12";
    readonly nativeCurrency: {
        readonly name: "Redbelly Network Coin";
        readonly symbol: "RBNT";
        readonly decimals: 18;
    };
    readonly mainnet: {
        readonly id: 151;
        readonly name: "Redbelly Network Mainnet";
        readonly rpc: "https://governors.mainnet.redbelly.network";
        readonly publicRpcs: readonly ["https://governors.mainnet.redbelly.network", "https://rpc.ankr.com/redbelly_mainnet"];
        readonly explorer: {
            readonly name: "Routescan";
            readonly url: "https://redbelly.routescan.io";
            readonly apiUrl: "https://api.routescan.io/v2/network/mainnet/evm/151/etherscan/api";
        };
        readonly addresses: {
            readonly accreditedIssuerRegistry: {
                readonly address: "0x2d68f1C50a057a310EeF28DF3199F95A65cE4ac5";
                readonly verifiedOn: "2026-09-12";
            };
            readonly bootstrapRegistry: {
                readonly address: "0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5";
                readonly verifiedOn: "2026-09-12";
            };
            readonly eip2935History: {
                readonly address: "0x0000F90827F1C53a10cb7A02335B175320002935";
                readonly verifiedOn: "2026-09-12";
            };
            readonly gasfees: {
                readonly address: "0x292Cc6D79E95B2848579735c24B70215179D4a33";
                readonly verifiedOn: "2026-09-12";
            };
            readonly multicall3: {
                readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
                readonly verifiedOn: "2026-09-12";
            };
            readonly nicksDeployer: {
                readonly address: "0x4e59b44847b379578588920cA78FbF26c0B4956C";
                readonly verifiedOn: "2026-09-12";
            };
            readonly permission: {
                readonly address: "0xcb385cD90ca6b219798F57B4a7958897e91A9163";
                readonly verifiedOn: "2026-09-12";
            };
            readonly pricefeed: {
                readonly address: "0x0CD42d829F88fe539f710E9b7692C70b94aaEad4";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeCreateCall: {
                readonly address: "0x9b35Af71d77eaf8d7e40252370304687390A1A52";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeFallbackHandler: {
                readonly address: "0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeL2Singleton: {
                readonly address: "0x29fcB43b46531BcA003ddC8FCB67FFE91900C762";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeMultiSend: {
                readonly address: "0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeMultiSendCallOnly: {
                readonly address: "0x9641d764fc13c8B624c04430C7356C1C7C8102e2";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeProxyFactory: {
                readonly address: "0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeSignMessageLib: {
                readonly address: "0xd53cd0aB83D845Ac265BE939c57F53AD838012c9";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeSimulateTxAccessor: {
                readonly address: "0x3d4BA2E0884aa488718476ca2FB8Efc291A46199";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeSingleton: {
                readonly address: "0x41675C099F32341bf84BFc5382aF534df5C7461a";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeSingletonFactory: {
                readonly address: "0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7";
                readonly verifiedOn: "2026-09-12";
            };
        };
    };
    readonly testnet: {
        readonly id: 153;
        readonly name: "Redbelly Network Testnet";
        readonly rpc: "https://governors.testnet.redbelly.network";
        readonly publicRpcs: readonly ["https://governors.testnet.redbelly.network"];
        readonly explorer: {
            readonly name: "Routescan";
            readonly url: "https://redbelly.testnet.routescan.io";
            readonly apiUrl: "https://api.routescan.io/v2/network/testnet/evm/153/etherscan/api";
        };
        readonly addresses: {
            readonly accreditedIssuerRegistry: {
                readonly address: "0x6aEe06F4052ff6d01Ed7E13Fa5Ab53675756A057";
                readonly verifiedOn: "2026-09-12";
            };
            readonly bootstrapRegistry: {
                readonly address: "0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5";
                readonly verifiedOn: "2026-09-12";
            };
            readonly eip2935History: {
                readonly address: "0x0000F90827F1C53a10cb7A02335B175320002935";
                readonly verifiedOn: "2026-09-12";
            };
            readonly gasfees: {
                readonly address: "0x292Cc6D79E95B2848579735c24B70215179D4a33";
                readonly verifiedOn: "2026-09-12";
            };
            readonly multicall3: {
                readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
                readonly verifiedOn: "2026-09-12";
            };
            readonly nicksDeployer: {
                readonly address: "0x4e59b44847b379578588920cA78FbF26c0B4956C";
                readonly verifiedOn: "2026-09-12";
            };
            readonly permission: {
                readonly address: "0x519ba1b48D571FD92FAF6FE4D20fe74Ca435B690";
                readonly verifiedOn: "2026-09-12";
            };
            readonly permit2: {
                readonly address: "0x000000000022D473030F116dDEE9F6B43aC78BA3";
                readonly verifiedOn: "2026-09-12";
            };
            readonly pricefeed: {
                readonly address: "0xBf207257412D3672F9C772ef263583611B98039a";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeCreateCall: {
                readonly address: "0x9b35Af71d77eaf8d7e40252370304687390A1A52";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeFallbackHandler: {
                readonly address: "0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeL2Singleton: {
                readonly address: "0x29fcB43b46531BcA003ddC8FCB67FFE91900C762";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeMultiSend: {
                readonly address: "0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeMultiSendCallOnly: {
                readonly address: "0x9641d764fc13c8B624c04430C7356C1C7C8102e2";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeProxyFactory: {
                readonly address: "0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeSignMessageLib: {
                readonly address: "0xd53cd0aB83D845Ac265BE939c57F53AD838012c9";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeSimulateTxAccessor: {
                readonly address: "0x3d4BA2E0884aa488718476ca2FB8Efc291A46199";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeSingleton: {
                readonly address: "0x41675C099F32341bf84BFc5382aF534df5C7461a";
                readonly verifiedOn: "2026-09-12";
            };
            readonly safeSingletonFactory: {
                readonly address: "0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7";
                readonly verifiedOn: "2026-09-12";
            };
        };
    };
    readonly keyedRpcs: {
        readonly mainnet: {
            readonly uniblock: {
                readonly url: "https://api.uniblock.dev/uni/v1/json-rpc?chainId=151";
                readonly header: "x-api-key";
            };
        };
    };
    readonly agentNotes: "Redbelly Network, facts for a coding agent (verified 2026-09-12).\nChain IDs: 151 mainnet, 153 testnet. Native coin RBNT, 18 decimals.\nRPCs: https://governors.mainnet.redbelly.network and https://governors.testnet.redbelly.network. Ankr also serves mainnet at https://rpc.ankr.com/redbelly_mainnet.\nExplorers: https://redbelly.routescan.io (151) and https://redbelly.testnet.routescan.io (153), Etherscan-style API under https://api.routescan.io/v2/network/{mainnet,testnet}/evm/{151,153}/etherscan/api.\nGas model in one sentence: gas is priced in US dollars (a 21,000-gas transfer costs US$0.01) and converted to RBNT at execution from an on-chain price feed, so RBNT fees move with the RBNT price and the priority fee is always zero.\nEvery wallet must pass isAllowed before it can transact: permission.isAllowed(address) on the contract the bootstrap registry (0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5, both chains) names as \"permission\" must return true, which requires identity verification at https://access.redbelly.network. Check it before deploying or sending.\nCompile for prague with solc 0.8.30. Transient storage, PUSH0, MCOPY and the Prague precompiles are all present.\nBlocks are produced on demand; poll aggressively. There is no block cadence: with no traffic there is no block, and a transaction lands within seconds or not at all. Do not sleep for a block time.\nNo debug or trace RPC methods. debug_* and trace_* are not served by the governors endpoints; net_version is not served either.";
};
export type ChainFacts = typeof chainFacts;
