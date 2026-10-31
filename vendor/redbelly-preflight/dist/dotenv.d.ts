export declare const ENV_NAMES: {
    readonly deployer: "DEPLOYER";
    readonly admin: "ADMIN_SAFE";
    readonly chain: "CHAIN_ID";
    readonly legacyAdmin: "PREFLIGHT_ADMIN";
};
export declare function readDotEnv(project: string, env: NodeJS.ProcessEnv): Record<string, string>;
