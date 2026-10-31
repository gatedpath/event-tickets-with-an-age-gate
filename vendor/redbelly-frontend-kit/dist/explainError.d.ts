import type { EligibilityStatusName } from '@gatedpath/agent-rules/failures';
export interface ExplainedError {
    /** A kind from the failure table, or "unknown". */
    kind: string;
    plainWords: string;
    cause: string;
    fix: {
        command?: string;
        link?: string;
    };
    /** The table entry's heading, when known. */
    title?: string;
    /** The site page for this kind, when known. */
    docsPage?: string;
    /** `NotEligible(wallet, requestId)` arguments when they could be read from the revert. */
    notEligible?: {
        wallet: string;
        requestId: string;
    };
    /** The revert selector when the error carried revert data. */
    selector?: string;
    /** The error's own words, shortened, for a details line. */
    raw: string;
}
export interface ExplainErrorOptions {
    /**
     * The credential state behind a NotEligible revert, when the page already knows it (from
     * `receptorMockStatus` on a ReceptorMock, or the dev state panel). Picks the entry for that
     * state; a real verifier cannot tell, so leave it unset there.
     */
    eligibilityStatus?: EligibilityStatusName | number | null;
}
/** Explains an error from wagmi's `useWriteContract`, viem's clients, or anything with a `cause` chain. */
export declare function explainError(error: unknown, options?: ExplainErrorOptions): ExplainedError;
