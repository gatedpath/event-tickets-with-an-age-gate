export interface RuleLink {
    readonly label: string;
    readonly url: string;
    readonly note?: string;
}
export interface RuleSection {
    /** Stable slug. Used for anchors and for `--only`-style filtering in tests. */
    readonly id: string;
    readonly heading: string;
    /** One or two plain sentences that frame the rules. Optional. */
    readonly intro?: string;
    /** Plain imperative sentences. One rule per entry. */
    readonly rules: readonly string[];
    /** ISO date the facts in this section were last checked against a primary source. */
    readonly verified?: string;
    /** Where the reference material lives. Link, never duplicate. */
    readonly links?: readonly RuleLink[];
}
export interface RulesSource {
    readonly title: string;
    /** One paragraph. Becomes the llms.txt blockquote and the opening of every rules file. */
    readonly summary: string;
    /** Date the newest fact in the source was verified. */
    readonly verified: string;
    readonly sections: readonly RuleSection[];
    /** Verbatim from @gatedpath/chains. Canonical there; quoted here. */
    readonly agentNotes: string;
}
export declare const ACCESS_URL = "https://access.redbelly.network";
export declare const FAUCET_URL = "https://redbelly.faucetme.pro/";
export declare const CHAINS_PACKAGE = "@gatedpath/chains";
export declare const CHAINS_PACKAGE_PATH = "packages/chain-definitions";
export declare const CREDENTIAL_STATES: readonly ["valid", "expired", "revoked", "wrong-jurisdiction", "never-issued"];
/** The list from PLAN.md section 12.1, extended by section 15. Tests assert each one appears in every format. */
export declare const neverDo: readonly string[];
export declare const rulesSource: RulesSource;
/** Every address the rules mention, for tests that compare against addresses.ts. */
export declare const mentionedAddresses: readonly string[];
