/** The chain id `npm run dev` gives its Anvil. The panel renders on this chain and no other. */
export const LOCAL_CHAIN_ID = 31337;
/** The five credential states, in `EligibilityStatus` enum order from @gatedpath/receptor-mock. */
export const ELIGIBILITY_STATES = ['NeverIssued', 'Valid', 'Expired', 'Revoked', 'WrongJurisdiction'];
/**
 * Parses the JSON `next.config.ts` inlines as `NEXT_PUBLIC_LOCAL_DEPLOYMENT` in the dev server.
 * Returns null for anything that is not a well-formed local deployment on chain 31337, so a
 * stray value can never make the panel appear against a real network.
 */
export function parseLocalDeployment(json) {
    if (!json)
        return null;
    let value;
    try {
        value = JSON.parse(json);
    }
    catch {
        return null;
    }
    if (!value || typeof value !== 'object')
        return null;
    const d = value;
    const isAddress = (a) => typeof a === 'string' && /^0x[0-9a-fA-F]{40}$/.test(a);
    if (d.chainId !== LOCAL_CHAIN_ID)
        return null;
    if (!isAddress(d.verifier) || !isAddress(d.contract))
        return null;
    if (typeof d.requestId !== 'number')
        return null;
    if (!d.deployer || !isAddress(d.deployer.address) || typeof d.deployer.index !== 'number')
        return null;
    if (!Array.isArray(d.wallets) || d.wallets.length !== ELIGIBILITY_STATES.length)
        return null;
    for (const [i, w] of d.wallets.entries()) {
        if (!w || !isAddress(w.address) || w.state !== ELIGIBILITY_STATES[i] || typeof w.index !== 'number')
            return null;
        if (w.index < 2)
            return null; // accounts 0 and 1 are never used
    }
    return d;
}
