export interface ProjectConfig {
    kind: 'foundry' | 'hardhat' | 'none';
    file: string | null;
    profile: string | null;
    solc: string | null;
    evmVersion: string | null;
    optimizerRuns: number | null;
    /** foundry: `src`; hardhat: `contracts`. */
    sourceDir: string;
    /** foundry `chain_id` or the hardhat network's `chainId`. */
    chainId: number | null;
    /** foundry [rpc_endpoints] or hardhat networks' url values, by name. */
    rpcEndpoints: Record<string, string>;
    /** The RPC url of the chosen hardhat network, if any. */
    rpcUrl: string | null;
}
export declare const HARDHAT_CONFIG_NAMES: string[];
export declare function readProjectConfig(project: string, profile?: string, env?: NodeJS.ProcessEnv): ProjectConfig;
type TomlValue = string | number | boolean | TomlValue[];
type TomlTable = Record<string, TomlValue>;
/** Enough TOML for foundry.toml: sections, dotted headers, scalars, one-line arrays, comments. */
export declare function parseToml(text: string): Record<string, TomlTable>;
export declare function readFoundryConfig(file: string, profile: string): ProjectConfig;
export declare function readHardhatConfig(file: string, network: string | null): ProjectConfig;
export {};
