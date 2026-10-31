export declare function findGatedSuites(project: string, testDir?: string): string[];
export type ForgeTestJson = Record<string, {
    test_results: Record<string, {
        status: string;
        reason?: string | null;
    }>;
}>;
export interface SuiteSummary {
    readonly passed: number;
    readonly failed: number;
    readonly skipped: number;
    readonly suites: ReadonlyArray<{
        readonly name: string;
        readonly passed: number;
        readonly failed: number;
    }>;
    /** True when at least one suite inherits GatedTest, every one of them ran, and none failed a test. */
    readonly fiveState: boolean;
    readonly failures: ReadonlyArray<{
        readonly suite: string;
        readonly test: string;
        readonly reason: string | null;
    }>;
}
/** Counts a `forge test --json` result against the suites that inherit GatedTest. */
export declare function summariseTests(parsed: ForgeTestJson, gatedSuites: readonly string[]): SuiteSummary;
