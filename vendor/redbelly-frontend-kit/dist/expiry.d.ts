import type { PublicClient } from 'viem';
import type { Address } from './useEligibility.js';
/**
 * An `expiry` reader for `useEligibility` that works when the verifier is a `ReceptorMock`
 * (testnet and forks). It reads `recordFor(wallet, requestId).expiresAt`; zero means no expiry.
 * Real verifiers (an Iden3 `ZKPVerifier` child, a `VCVerifierBaseContract` child) do not expose
 * an expiry, so on mainnet leave `expiry` unset and the `expiring` state never shows.
 */
export declare function receptorMockExpiry(client: PublicClient, verifier: Address): ({ address, requestId }: {
    address: Address;
    requestId: bigint;
}) => Promise<number | null>;
