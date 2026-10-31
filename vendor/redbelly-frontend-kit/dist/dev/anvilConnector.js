import { createConnector } from 'wagmi';
import { getAddress, numberToHex } from 'viem';
/**
 * A wagmi connector for one of Anvil's unlocked accounts. Every request goes straight to the
 * chain's RPC: `eth_sendTransaction` is signed by the node, so the browser never holds a key
 * and nothing is imported into a wallet extension. It only makes sense against a local Anvil
 * (chain 31337); `npm run dev` in a scaffold adds one per seeded wallet in the dev server and
 * none in a production build.
 */
export function anvilAccountConnector({ address, index, label }) {
    const account = getAddress(address);
    let connected = false;
    return createConnector((config) => ({
        id: `anvil-account-${index}`,
        name: label ?? `Wallet ${index}`,
        type: 'anvilAccount',
        async connect() {
            connected = true;
            // wagmi types the accounts by a `withCapabilities` generic; this connector has no capabilities to report.
            return { accounts: [account], chainId: await this.getChainId() };
        },
        async disconnect() {
            connected = false;
        },
        async getAccounts() {
            return connected ? [account] : [];
        },
        async getChainId() {
            const chain = config.chains[0];
            if (!chain)
                throw new Error('no chain configured');
            return chain.id;
        },
        async isAuthorized() {
            return connected;
        },
        async switchChain({ chainId }) {
            const chain = config.chains.find((c) => c.id === chainId);
            if (!chain)
                throw new Error(`chain ${chainId} is not configured`);
            return chain;
        },
        onAccountsChanged() { },
        onChainChanged() { },
        onDisconnect() {
            connected = false;
            config.emitter.emit('disconnect');
        },
        async getProvider() {
            const chain = config.chains[0];
            if (!chain)
                throw new Error('no chain configured');
            const url = chain.rpcUrls.default.http[0];
            if (!url)
                throw new Error('the chain has no HTTP RPC URL');
            const request = (async ({ method, params }) => {
                if (method === 'eth_accounts' || method === 'eth_requestAccounts')
                    return [account];
                if (method === 'eth_chainId')
                    return numberToHex(chain.id);
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params: params ?? [] }),
                });
                const body = (await response.json());
                if (body.error)
                    throw new Error(body.error.message ?? 'RPC error');
                return body.result;
            });
            return { request };
        },
    }));
}
/** One connector per seeded wallet, in the file's order (NeverIssued first, Valid second). */
export function anvilAccountConnectors(deployment) {
    return deployment.wallets.map((w) => anvilAccountConnector({ address: w.address, index: w.index, label: `Wallet ${w.index} (${w.state})` }));
}
