import type { CheckId, PreflightOptions, PreflightReport } from './types.js';
export declare const VERSION: string;
export declare const CHECK_IDS: readonly CheckId[];
export declare const DEFAULT_GAS = 3000000n;
export interface RunOptions extends PreflightOptions {
    passwordFile?: string;
}
export declare function runPreflight(opts?: RunOptions): Promise<PreflightReport>;
export declare function renderText(report: PreflightReport): string;
