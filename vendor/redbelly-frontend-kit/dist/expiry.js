import { receptorMockAbi } from './abi.js';
/**
 * An `expiry` reader for `useEligibility` that works when the verifier is a `ReceptorMock`
 * (testnet and forks). It reads `recordFor(wallet, requestId).expiresAt`; zero means no expiry.
 * Real verifiers (an Iden3 `ZKPVerifier` child, a `VCVerifierBaseContract` child) do not expose
 * an expiry, so on mainnet leave `expiry` unset and the `expiring` state never shows.
 */
export function receptorMockExpiry(client, verifier) {
    return async ({ address, requestId }) => {
        const record = await client.readContract({
            address: verifier,
            abi: receptorMockAbi,
            functionName: 'recordFor',
            args: [address, requestId],
        });
        const expiresAt = Number(record.expiresAt);
        return record.isSet && expiresAt > 0 ? expiresAt : null;
    };
}
