export declare const DOCTOR_VERSION: string;
export type DoctorCheckId = 'node' | 'git' | 'forge' | 'anvil' | 'cast' | 'foundry-version' | 'foundry-exit-code' | 'slither' | 'aderyn' | 'env-tracked' | 'vendor';
export declare const DOCTOR_CHECK_IDS: readonly DoctorCheckId[];
export type DoctorStatus = 'pass' | 'warn' | 'fail';
export interface DoctorCheck {
    readonly id: DoctorCheckId;
    /** A required check that fails makes the exit code 1. Optional checks warn at worst. */
    readonly required: boolean;
    readonly status: DoctorStatus;
    /** One sentence, printed after the status and the id. */
    readonly reason: string;
    /** The next command, printed on the same line. From the failure table where the table has the entry. */
    readonly fix: string | null;
    /** The failure-table kind the fix comes from, so explain_failure says the same thing. */
    readonly kind: string | null;
    readonly data?: Record<string, unknown>;
}
export interface DoctorOptions {
    /** Project directory: a scaffold root, its contracts/ folder, or any directory. Default: cwd. */
    project?: string;
    /** Environment to read PATH (and PATHEXT on Windows) from. Default: process.env. */
    env?: NodeJS.ProcessEnv;
    /** Node version to judge. Default: process.version. Tests hand in an older one. */
    nodeVersion?: string;
    platform?: NodeJS.Platform;
    arch?: string;
}
export interface DoctorReport {
    readonly tool: 'redbelly-doctor';
    readonly version: string;
    readonly generatedAt: string;
    readonly project: string;
    readonly scaffold: boolean;
    readonly checks: readonly DoctorCheck[];
    /** True when every required check passes. Warnings never clear or cause a fail. */
    readonly ok: boolean;
}
export declare const NODE_MIN_MAJOR = 22;
export declare const SLITHER_PIN = "0.11.6";
export declare const ADERYN_PIN = "0.6.8";
declare const FOUNDRY_TOOLS: readonly ["forge", "anvil", "cast"];
type FoundryTool = (typeof FOUNDRY_TOOLS)[number];
/** First match for `name` on PATH, the way a shell finds it. Windows adds PATHEXT. */
export declare function whichOnPath(name: string, env?: NodeJS.ProcessEnv, platform?: NodeJS.Platform): string | null;
/** The semantic version a tool prints for --version, or null. */
export declare function toolVersion(path: string): Promise<{
    version: string | null;
    output: string;
}>;
/** Does the binary hand its exit code back? The npm shim spawns the real tool and always exits 0. */
export declare function exitCodePropagates(path: string): Promise<boolean | null>;
/** A Node script where a binary should be: a .mjs/.js/.cjs, a `#!…node` shebang, or a Windows .cmd calling node. */
export declare function looksLikeNodeShim(path: string): boolean;
/** The platform binary the @foundry-rs shim would spawn, when it sits beside the shim. */
export declare function realBinaryNear(shimPath: string, tool: FoundryTool, platform?: NodeJS.Platform, arch?: string): string | null;
/** Scaffold root for a directory: itself, or its parent when the directory is a scaffold's contracts/. */
export declare function scaffoldRoot(project: string): string | null;
export declare function runDoctor(opts?: DoctorOptions): Promise<DoctorReport>;
export declare function renderDoctorText(report: DoctorReport): string;
export {};
