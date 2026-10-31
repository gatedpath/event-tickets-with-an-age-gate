const listeners = new Set();
/** Tells every mounted `useEligibility` for `address` (or every one, when omitted) to refetch. */
export function notifyEligibilityChanged(address) {
    for (const listener of listeners)
        listener(address);
}
/** Subscribes; returns the unsubscribe function. Used by `useEligibility`. */
export function onEligibilityChanged(listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}
