import type { ProjectConfig } from '../config.js';
import type { CheckResult } from '../types.js';
export declare const SOLC_PIN = "0.8.30";
export declare const EVM_PIN = "prague";
export declare function checkCompilerPins(config: ProjectConfig): CheckResult;
