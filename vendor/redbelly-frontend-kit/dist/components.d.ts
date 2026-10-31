import type { ReactNode } from 'react';
import type { Address, EligibilityResult, EligibilityState } from './useEligibility.js';
export interface StateProps {
    className?: string;
    children?: ReactNode;
}
/** State 1: nothing is connected. */
export declare function NotConnected({ className, children }: StateProps): import("react/jsx-runtime").JSX.Element;
export interface NotVerifiedProps extends StateProps {
    address: Address;
    /** Human name of the chain, for the sentence. */
    chainName?: string;
    /** True on chain 153: shows the faucet link. */
    testnet?: boolean;
}
/** State 2: connected, but `permission.isAllowed` is false. The wallet cannot transact at all. */
export declare function NotVerified({ address, chainName, testnet, className, children }: NotVerifiedProps): import("react/jsx-runtime").JSX.Element;
export interface IneligibleProps extends StateProps {
    /** What the action needs, in plain words: "an Australian proof of address", "an over-18 credential". */
    requirement?: string;
}
/** State 3: verified on the network, but the verifier says no for this action. */
export declare function Ineligible({ requirement, className, children }: IneligibleProps): import("react/jsx-runtime").JSX.Element;
/** State 4: eligible. Usually wraps the action button. */
export declare function Eligible({ className, children }: StateProps): import("react/jsx-runtime").JSX.Element;
export interface ExpiringSoonProps extends StateProps {
    expiresAt: number;
    secondsToExpiry: number;
}
/** State 5: eligible, and the verifier says the credential expires soon. Wraps the action too. */
export declare function ExpiringSoon({ expiresAt, secondsToExpiry, className, children }: ExpiringSoonProps): import("react/jsx-runtime").JSX.Element;
/** Shown while both reads are in flight for the first time. */
export declare function Checking({ className, children }: StateProps): import("react/jsx-runtime").JSX.Element;
export interface EligibilityErrorProps extends StateProps {
    error: Error | null;
    onRetry?: () => void;
}
/** An RPC or contract read failed and nothing is cached. Says so; does not guess. */
export declare function EligibilityError({ error, onRetry, className, children }: EligibilityErrorProps): import("react/jsx-runtime").JSX.Element;
export interface EligibilityGateProps {
    /** The result of `useEligibility`. */
    eligibility: EligibilityResult;
    address: Address | undefined;
    chainName?: string;
    testnet?: boolean;
    requirement?: string;
    className?: string;
    /** Rendered inside the eligible and expiring states: the action itself. */
    children?: ReactNode;
    /** Override any state with your own markup. A function receives the hook result. */
    render?: Partial<Record<EligibilityState, ReactNode | ((r: EligibilityResult) => ReactNode)>>;
}
/** One component that picks the state component for you. Bring your own action as `children`. */
export declare function EligibilityGate({ eligibility, address, chainName, testnet, requirement, className, children, render }: EligibilityGateProps): import("react/jsx-runtime").JSX.Element;
export interface LastCheckedProps {
    eligibility: EligibilityResult;
    className?: string;
}
/** "Last checked" line with a refresh button. Put it under any gate. */
export declare function LastChecked({ eligibility, className }: LastCheckedProps): import("react/jsx-runtime").JSX.Element;
export interface GasWarningProps {
    /** A live USD figure for a plain transfer, from `gasCostUsd` in @gatedpath/chains, if you have one. */
    transferUsd?: string | null;
    className?: string;
}
/**
 * The wallet gas warning from Vine, which every Redbelly dApp should show near its first
 * transaction. See docs/wallet-gas-warning.md for the source and the reasoning.
 */
export declare function GasWarning({ transferUsd, className }: GasWarningProps): import("react/jsx-runtime").JSX.Element;
