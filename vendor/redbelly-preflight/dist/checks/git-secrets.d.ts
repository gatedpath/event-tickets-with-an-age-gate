import type { CheckResult } from '../types.js';
export interface SecretFinding {
    commit: string;
    file: string;
    kind: string;
    why: string;
}
/** True when the history scan leaves this path alone. Exported for the tests. */
export declare function ignoredPath(file: string): boolean;
export declare function scanGitHistory(project: string): Promise<{
    findings: SecretFinding[];
    commits: number;
    isRepo: boolean;
    trackedEnv: string[];
}>;
export declare function checkGitSecrets(project: string): Promise<CheckResult>;
