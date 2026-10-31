export interface RunResult {
    code: number | null;
    stdout: string;
    stderr: string;
    /** Set when the binary could not be started at all (ENOENT and friends). */
    spawnError?: string;
}
export declare function run(cmd: string, args: readonly string[], opts?: {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    timeoutMs?: number;
    stdin?: string;
}): Promise<RunResult>;
export declare const ACCOUNT_NAME: RegExp;
