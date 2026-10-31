import type { CheckResult } from '../types.js';
export declare const MARGIN_PERCENT = 25;
export declare function checkBalance(deployer: string | null, gas: bigint, rpc: string, chain: number | null): Promise<CheckResult>;
