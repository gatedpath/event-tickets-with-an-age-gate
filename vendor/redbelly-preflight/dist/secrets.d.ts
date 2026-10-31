export type SecretKind = 'hex64' | 'hex64-keyword' | 'key-assignment' | 'mnemonic' | 'keystore-json';
export interface SecretMatch {
    readonly kind: SecretKind;
    /** Why this counts. One sentence, no secret material. */
    readonly why: string;
}
/**
 * Hashes a line proves about itself: `keccak256("X")` beside a value that really is keccak256 of X,
 * where X is shaped like a role name. A key cannot be dressed up that way without its preimage.
 */
export declare function provenHashes(line: string): Set<string>;
/** Every secret-shaped thing on one line of text. */
export declare function scanLine(line: string): SecretMatch[];
/** True when the line holds 12+ consecutive BIP-39 words separated by single spaces. */
export declare function mnemonicRun(line: string): boolean;
/** Scan a whole string; returns matches with 1-based line numbers. */
export declare function scanText(text: string): Array<SecretMatch & {
    line: number;
}>;
/** Walks any JSON-like value (tool arguments, config) and reports secret-shaped strings by path. */
export declare function scanValue(value: unknown, path?: string): Array<SecretMatch & {
    path: string;
}>;
