import type { CheckResult } from '../types.js';
export interface DeployerSource {
    account?: string | undefined;
    address?: string | undefined;
    passwordFile?: string | undefined;
    cwd: string;
    env: NodeJS.ProcessEnv;
}
export declare function resolveDeployer(src: DeployerSource): Promise<{
    address: string | null;
    how: string;
    error?: string;
}>;
export declare function checkDeployerVerified(address: string | null, how: string, error: string | undefined, rpc: string, chain: number | null): Promise<CheckResult>;
