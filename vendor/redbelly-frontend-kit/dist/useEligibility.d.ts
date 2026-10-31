export type Address = `0x${string}`;
/** The five UI states, plus the two every real page also has. */
export type EligibilityState = 'disconnected' | 'checking' | 'unverified' | 'ineligible' | 'eligible' | 'expiring' | 'error';
export interface UseEligibilityOptions {
    /** Chain to read on. Defaults to wagmi's current chain. */
    chainId?: number;
    /** The network's permission contract. Defaults to the address in @gatedpath/chains for `chainId`. */
    permission?: Address;
    /** Refetch floor in milliseconds; the reads also refetch on every new block. Default 30 000. */
    refreshInterval?: number;
    /** Watch `eth_blockNumber` and refetch when it changes. Default true. */
    watchBlocks?: boolean;
    /**
     * When the verifier can tell: a function that returns the credential's expiry as a Unix time in
     * seconds, or null when unknown. `ReceptorMock` can; adapters over real verifiers cannot.
     * See `receptorMockExpiry`.
     */
    expiry?: (args: {
        address: Address;
        requestId: bigint;
    }) => Promise<number | bigint | null>;
    /** How long before expiry the state turns to `expiring`. Default seven days. */
    expiringWindowSeconds?: number;
    /** Turn every read off (for example while a modal is closed). Default true. */
    enabled?: boolean;
}
export interface EligibilityResult {
    state: EligibilityState;
    /** `permission.isAllowed(address)`: the wallet has been through access.redbelly.network. */
    isAllowed: boolean | undefined;
    /** `verifier.isEligible(address, requestId)`: the wallet passes this action's gate. */
    isEligible: boolean | undefined;
    /** Unix seconds when the credential expires, when the verifier can tell. */
    expiresAt: number | null;
    /** Seconds until expiry, when known. */
    secondsToExpiry: number | null;
    /** When the eligibility read last returned, in milliseconds since the epoch. */
    lastCheckedAt: number | null;
    /** The block the last refetch was triggered by, when block watching is on. */
    blockNumber: bigint | undefined;
    isFetching: boolean;
    error: Error | null;
    /** Read both again now. */
    refresh: () => Promise<void>;
}
/**
 * Reads the two things a Redbelly UI has to know about a wallet before it offers a button: is
 * the wallet allowed to transact at all (the network's gate), and does it pass this action's
 * eligibility check (the dApp's verifier). Both are cached by wagmi's query client and shared by
 * every component that asks for the same wallet, verifier and request id; they refetch once per
 * new block, or every `refreshInterval` milliseconds if no block arrives (blocks on Redbelly are
 * produced on demand, so a quiet chain has no blocks to watch), and on `refresh()`.
 *
 * @param address The connected wallet, or undefined when nothing is connected.
 * @param verifier The dApp's verifier behind `IRedbellyVerifier`.
 * @param requestId The request id the gated contract is bound to (`Gated.requestId()`).
 */
export declare function useEligibility(address: Address | undefined, verifier: Address | undefined, requestId: bigint | number | undefined, options?: UseEligibilityOptions): EligibilityResult;
