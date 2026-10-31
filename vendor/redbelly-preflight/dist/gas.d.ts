export declare const GAS_VERSION: string;
export interface GasRow {
    /** `Contract:item`, the key rows are matched on across two files. */
    readonly name: string;
    readonly contract: string;
    /** A test name from a snapshot, a function signature from a gas report, or `deployment`. */
    readonly item: string;
    readonly gas: bigint;
    /** From a gas report: how many calls the mean is over. From a fuzz line: the runs. */
    readonly calls?: number;
    readonly min?: bigint;
    readonly max?: bigint;
}
export type GasSource = {
    readonly kind: 'snapshot';
    readonly file: string;
} | {
    readonly kind: 'gas-report';
    readonly command: string;
} | {
    readonly kind: 'gas-report-file';
    readonly file: string;
};
export interface GasQuote {
    readonly chain: 151 | 153;
    readonly network: 'mainnet' | 'testnet';
    readonly rpc: string;
    readonly block: number;
    readonly baseFeeWei: bigint;
    /** The feed's raw integer (six decimals) and the derived USD per RBNT. */
    readonly priceRaw: bigint;
    readonly usdPerRbnt: number;
    readonly priceTimestamp: string;
    readonly priceFeed: string;
}
export interface PricedRow extends GasRow {
    readonly wei: bigint;
    readonly rbnt: string;
    readonly usd: number;
    /** US cents to three decimal places, as a number. */
    readonly cents: number;
    readonly before?: {
        readonly gas: bigint;
        readonly cents: number;
    };
    readonly delta?: {
        readonly gas: bigint;
        readonly cents: number;
    };
}
export interface GasReport {
    readonly tool: 'redbelly-gas';
    readonly version: string;
    readonly generatedAt: string;
    readonly project: string;
    readonly source: GasSource;
    readonly quote: GasQuote;
    readonly rows: readonly PricedRow[];
    readonly diff: {
        readonly file: string;
        readonly rows: number;
        readonly added: readonly string[];
        readonly removed: readonly string[];
    } | null;
}
export interface GasOptions {
    /** A Foundry project, or a scaffold root (its contracts/ is used). Default: cwd. */
    project?: string;
    chain?: 151 | 153;
    rpc?: string;
    /** A snapshot or gas-report JSON file to price instead of the project's .gas-snapshot. */
    snapshot?: string;
    /** Run `forge test --gas-report --json` even when a .gas-snapshot exists. */
    report?: boolean;
    /** A previous snapshot or gas-report JSON to compare against. */
    diff?: string;
    env?: NodeJS.ProcessEnv;
}
/** `.gas-snapshot`: `Contract:test() (gas: N)`, fuzz lines by their mean (μ), invariant lines (no gas) skipped. */
export declare function parseGasSnapshot(text: string): GasRow[];
/** `forge test --gas-report --json`: the deployment row, then each function by its mean. Contract names lose their path. */
export declare function parseGasReportJson(json: unknown): GasRow[];
/** Either format, by content: JSON that parses as an array is a gas report; anything else is a snapshot. */
export declare function parseGasFile(text: string): {
    kind: 'snapshot' | 'gas-report-file';
    rows: GasRow[];
};
/** wei = gas * baseFee; thousandths of a US cent = wei * raw / 10^(18 + 6 - 5). Only the last step leaves BigInt. */
export declare function priceGas(gas: bigint, quote: Pick<GasQuote, 'baseFeeWei' | 'priceRaw'>): {
    wei: bigint;
    rbnt: string;
    usd: number;
    cents: number;
};
export declare function priceRows(rows: readonly GasRow[], quote: Pick<GasQuote, 'baseFeeWei' | 'priceRaw'>, before?: readonly GasRow[]): {
    rows: PricedRow[];
    added: string[];
    removed: string[];
};
export declare function quoteGas(rpc: string, expected?: 151 | 153): Promise<GasQuote>;
/** A scaffold root's contracts/ when that is where foundry.toml is; otherwise the directory itself. */
export declare function foundryDir(project: string): string;
export declare function readGasSource(dir: string, opts: Pick<GasOptions, 'snapshot' | 'report' | 'env'>): Promise<{
    source: GasSource;
    rows: GasRow[];
}>;
export declare function runGas(opts?: GasOptions): Promise<GasReport>;
export declare function renderGasText(report: GasReport): string;
/** JSON with BigInt as decimal strings. */
export declare function gasReportJson(report: GasReport): string;
