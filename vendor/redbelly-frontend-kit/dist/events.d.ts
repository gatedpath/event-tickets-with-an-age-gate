import type { Address } from './useEligibility.js';
type Listener = (address: Address | undefined) => void;
/** Tells every mounted `useEligibility` for `address` (or every one, when omitted) to refetch. */
export declare function notifyEligibilityChanged(address?: Address): void;
/** Subscribes; returns the unsubscribe function. Used by `useEligibility`. */
export declare function onEligibilityChanged(listener: Listener): () => void;
export {};
