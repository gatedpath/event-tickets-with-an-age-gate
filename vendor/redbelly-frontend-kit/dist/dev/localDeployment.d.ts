import type { Address } from '../useEligibility.js';
/** The chain id `npm run dev` gives its Anvil. The panel renders on this chain and no other. */
export declare const LOCAL_CHAIN_ID = 31337;
/** The five credential states, in `EligibilityStatus` enum order from @gatedpath/receptor-mock. */
export declare const ELIGIBILITY_STATES: readonly ["NeverIssued", "Valid", "Expired", "Revoked", "WrongJurisdiction"];
export type EligibilityStateName = (typeof ELIGIBILITY_STATES)[number];
/** One seeded wallet. `index` is the Anvil account index; the file never carries a key. */
export interface LocalWallet {
    index: number;
    state: EligibilityStateName;
    address: Address;
    note: string;
}
/**
 * `deployments/local.json` as `scripts/dev.mjs` writes it in a scaffold (PLAN.md 18.1). `deployer`
 * is Anvil account 7, the account that deployed the mock and holds the contract's admin roles; the
 * panel impersonates it to call `setStatus`. Accounts 0 and 1 are never used (RESEARCH.md 30).
 */
export interface LocalDeployment {
    chainId: number;
    forkOf: 151 | 153 | null;
    verifier: Address;
    contract: Address;
    requestId: number;
    deployer: {
        index: number;
        address: Address;
    };
    wallets: LocalWallet[];
    startedAt: string;
}
/**
 * Parses the JSON `next.config.ts` inlines as `NEXT_PUBLIC_LOCAL_DEPLOYMENT` in the dev server.
 * Returns null for anything that is not a well-formed local deployment on chain 31337, so a
 * stray value can never make the panel appear against a real network.
 */
export declare function parseLocalDeployment(json: string | undefined | null): LocalDeployment | null;
