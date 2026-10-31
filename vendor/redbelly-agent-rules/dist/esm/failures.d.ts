export type FailureGroup = 'contract' | 'deploy-script' | 'preflight' | 'network' | 'wallet' | 'forge' | 'cast' | 'anvil' | 'tooling' | 'doctor';
/** How an entry is recognised. Every matcher is data so a page can show it. */
export type FailureMatcher = 
/** The first four bytes of revert data, lower-case, 0x-prefixed. */
{
    readonly type: 'selector';
    readonly value: string;
}
/** A case-insensitive regular expression source matched against a message or a pasted stderr. */
 | {
    readonly type: 'text';
    readonly value: string;
}
/** A pre-flight check line: `fail  <id>  ...` or the JSON check with that id and status. */
 | {
    readonly type: 'preflight';
    readonly id: string;
}
/** A viem or wagmi error class name, matched against `error.name` while walking the cause chain. */
 | {
    readonly type: 'error-name';
    readonly value: string;
}
/** A redbelly-doctor check line: `fail  <id>  ...` or the JSON check with that id and status. */
 | {
    readonly type: 'doctor';
    readonly id: string;
};
export interface FailureEntry {
    /** Stable kebab-case id. Anchors on the site's /errors page and the `kind` every decoder returns. */
    readonly kind: string;
    readonly group: FailureGroup;
    /** A short heading. */
    readonly title: string;
    /** What happened, in one or two plain sentences. */
    readonly plainWords: string;
    /** Why it happened. */
    readonly cause: string;
    /** The next thing to run, or the page that says what to do. One or both. */
    readonly fix: {
        readonly command?: string;
        readonly link?: string;
    };
    /** Site page the entry belongs on, as a path. The /errors page lists every entry as well. */
    readonly docsPage: string;
    /** A docs_lookup topic in the MCP server, when the network fact behind the entry has one. */
    readonly topic?: string;
    /** `measured` when the exact shape was captured from a real run; `pending` when it is the best reading so far. */
    /**
     * `measured`: we saw it ourselves, and `measured` says where. `reported`: someone else saw it and
     * published where; we have not, and `reportedBy` credits them. `pending`: nobody we know of has.
     */
    readonly status: 'measured' | 'reported' | 'pending';
    /** For `reported` entries: whose observation this is. Never a substitute for seeing it ourselves. */
    readonly reportedBy?: {
        readonly who: string;
        readonly url: string;
        readonly date: string;
    };
    /** Where and when the shape was seen, or what is still missing. */
    readonly measured: string;
    readonly match: readonly FailureMatcher[];
}
/** `Gated.NotEligible(address,uint64)`: keccak256 of the signature, first four bytes. Checked by tests against a keccak implementation. */
export declare const NOT_ELIGIBLE_SELECTOR = "0x879342fb";
/** `Gated.ZeroVerifier()`. */
export declare const ZERO_VERIFIER_SELECTOR = "0x4a8bdce3";
/** Solidity's `Error(string)`. */
export declare const ERROR_STRING_SELECTOR = "0x08c379a0";
/** Solidity's `Panic(uint256)`. */
export declare const PANIC_SELECTOR = "0x4e487b71";
/** The five credential states, in `EligibilityStatus` enum order (receptor-mock/src/IRedbellyVerifier.sol). */
export declare const ELIGIBILITY_STATUS_NAMES: readonly ["NeverIssued", "Valid", "Expired", "Revoked", "WrongJurisdiction"];
export type EligibilityStatusName = (typeof ELIGIBILITY_STATUS_NAMES)[number];
/** The line `redbelly-doctor` prints when the npm shim is on PATH; the real binary sits in the platform package beside it. */
export declare const FOUNDRY_SHIM_FIX = "foundryup   # or link the real binary over the shim: ln -sf <shim dir>/node_modules/@foundry-rs/<tool>-<os>-<arch>/bin/<tool> <a dir on PATH>/<tool>";
export declare const failures: readonly FailureEntry[];
export declare const FAILURE_KINDS: readonly string[];
export declare function failureByKind(kind: string): FailureEntry | undefined;
/** The entry for a `NotEligible` revert once the verifier has named the credential state. */
export declare function notEligibleEntry(status?: EligibilityStatusName | number | null): FailureEntry;
/** A decoded revert: the selector, and the arguments when the selector is one this table knows. */
export interface DecodedRevert {
    readonly selector: string;
    readonly kind: string | null;
    /** `NotEligible(wallet, requestId)` arguments. */
    readonly notEligible?: {
        readonly wallet: string;
        readonly requestId: string;
    };
    /** `Error(string)` text. */
    readonly reason?: string;
    /** `Panic(uint256)` code. */
    readonly panic?: number;
}
/** Decodes revert data. Unknown selectors return `kind: null` with the selector; malformed input returns null. */
export declare function decodeRevertData(data: string): DecodedRevert | null;
/** Finds revert data inside a message such as cast's `custom error 0x…: …, data: "0x…"` or a node's `execution reverted` text. */
export declare function revertHexIn(text: string): string | null;
/** The first entry whose text matcher hits, in table order. Pre-flight and doctor lines are matched by id. */
export declare function matchText(text: string): FailureEntry | undefined;
/** The entry for a viem or wagmi error class name, when the table knows it. */
export declare function matchErrorName(name: string): FailureEntry | undefined;
