import { type LocalDeployment } from './localDeployment.js';
export interface DevStatePanelProps {
    /** The parsed `deployments/local.json`; see `parseLocalDeployment`. */
    deployment: LocalDeployment;
    className?: string;
}
/**
 * The dev-only state switcher (PLAN.md 18.1). Lists the five wallets `npm run dev` seeded, marks
 * the connected one, and flips the connected wallet through the five credential states by calling
 * `setStatus` on the `ReceptorMock` as the deployer, through Anvil's impersonation RPC. Every
 * mounted `useEligibility` for that wallet refetches on the resulting signal, so the page moves
 * into the new state without a reload.
 *
 * It renders only when the wallet (or, unconnected, the app) is on chain 31337 and the deployment
 * it was given says 31337 too. On 151 or 153 it renders nothing, whatever it was given. In a
 * scaffold it is imported only by the dev server and is absent from production bundles; the
 * scaffolder's test asserts both.
 */
export declare function DevStatePanel({ deployment, className }: DevStatePanelProps): import("react/jsx-runtime").JSX.Element | null;
