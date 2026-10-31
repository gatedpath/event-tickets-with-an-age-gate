import { type EIP1193RequestFn } from 'viem';
import type { Address } from '../useEligibility.js';
import type { LocalDeployment } from './localDeployment.js';
export interface AnvilAccountConnectorOptions {
    /** The Anvil account to act as. Must be one the node has unlocked (its own ten, or an impersonated one). */
    address: Address;
    /** The account's index, for the connector's name. */
    index: number;
    /** A label for the button; defaults to `Wallet <index>`. */
    label?: string;
}
/**
 * A wagmi connector for one of Anvil's unlocked accounts. Every request goes straight to the
 * chain's RPC: `eth_sendTransaction` is signed by the node, so the browser never holds a key
 * and nothing is imported into a wallet extension. It only makes sense against a local Anvil
 * (chain 31337); `npm run dev` in a scaffold adds one per seeded wallet in the dev server and
 * none in a production build.
 */
export declare function anvilAccountConnector({ address, index, label }: AnvilAccountConnectorOptions): import("wagmi").CreateConnectorFn<{
    request: EIP1193RequestFn;
}, Record<string, unknown>, Record<string, unknown>>;
/** One connector per seeded wallet, in the file's order (NeverIssued first, Valid second). */
export declare function anvilAccountConnectors(deployment: LocalDeployment): import("wagmi").CreateConnectorFn<{
    request: EIP1193RequestFn;
}, Record<string, unknown>, Record<string, unknown>>[];
