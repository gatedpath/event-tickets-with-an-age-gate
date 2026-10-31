import type { AdminReading } from './checks/admin.js';
import type { GasQuote, PricedRow } from './gas.js';
import type { SuiteSummary } from './suites.js';
import type { CheckStatus, PreflightReport } from './types.js';
export declare const SHIP_VERSION: string;
export interface ShipOptions {
    /** Foundry project or scaffold root (its contracts/ is used). Default: cwd. */
    project?: string;
    chain: 151 | 153;
    /** Foundry keystore name; cast resolves the address, nothing else is read from it. */
    account: string;
    passwordFile?: string;
    /** The Safe that receives every role. Required on 151; ADMIN_SAFE in .env fills it in. */
    admin?: string;
    /** Deployment gas for the balance check. Default: the gas report's deployment row, then 3,000,000. */
    gas?: number | bigint;
    rpc?: string;
    /** The dApp's verifier. Required on 151; VERIFIER in .env fills it in. */
    verifier?: string;
    /** Where to write. Default: deployments/ship-<chain>-<date>.md under the Foundry project. */
    out?: string;
    env?: NodeJS.ProcessEnv;
}
export interface ShipCheck {
    readonly id: string;
    readonly status: CheckStatus;
    readonly reason: string;
    readonly data?: Record<string, unknown>;
}
export interface ShipContract {
    readonly name: string;
    readonly address: string;
    readonly record: string;
    readonly deployer: string | null;
    readonly admin: string | null;
    readonly verifier: string | null;
    readonly requestId: string | null;
    readonly constructorSignature: string | null;
    readonly constructorArgs: string | null;
    readonly verifyCommand: string;
    readonly explorer: string;
}
export interface ShipReport {
    readonly tool: 'redbelly-ship';
    readonly version: string;
    readonly generatedAt: string;
    /** UTC date the report is dated; the deploy script wants today's. */
    readonly date: string;
    readonly project: string;
    readonly chain: 151 | 153;
    readonly network: 'mainnet' | 'testnet';
    readonly rpc: string;
    readonly ok: boolean;
    /** The file written, or null when a check failed. */
    readonly written: string | null;
    readonly checks: readonly ShipCheck[];
    readonly preflight: PreflightReport;
    readonly deployer: {
        readonly address: string | null;
        readonly how: string;
        readonly isAllowed: boolean | null;
        readonly wellKnownDevAccount: boolean;
    };
    readonly admin: (AdminReading & {
        readonly isAllowed: boolean | null;
        readonly owners: readonly string[] | null;
    }) | null;
    readonly verifier: {
        readonly address: string | null;
        readonly isContract: boolean | null;
        readonly source: string;
    };
    readonly requestId: string | null;
    readonly tests: SuiteSummary | null;
    readonly gas: {
        readonly quote: GasQuote;
        readonly deployment: PricedRow | null;
        readonly rows: readonly PricedRow[];
    } | null;
    readonly contracts: readonly ShipContract[];
    readonly pins: {
        readonly solc: string | null;
        readonly evm: string | null;
        readonly runs: number | null;
    };
    readonly forgeVersion: string | null;
    readonly commit: string | null;
}
export declare function utcDate(d?: Date): string;
export declare function shipReportPath(dir: string, chain: 151 | 153, date?: string): string;
/** The header every generated report starts with, and what `status` and the tests read back. */
export declare const SHIP_HEADER: RegExp;
export declare function parseShipHeader(text: string): {
    chain: number;
    date: string;
    ok: boolean;
    generatedAt: string;
} | null;
export declare function routescanBase(chain: 151 | 153): {
    verifier: string;
    explorer: string;
};
/** The deployment records the deploy script wrote for this chain, with the verify command each needs. */
export declare function readShipContracts(dir: string, chain: 151 | 153, pins: ShipReport['pins']): ShipContract[];
export declare function runShip(opts: ShipOptions): Promise<ShipReport>;
/**
 * The deploy scripts find today's report by its name, `ship-<chain>-<date>.md`. `--out` may put the
 * report anywhere, except under a name that says it is for a different chain: a passing testnet
 * report must never sit where the mainnet gate looks (audit of 2026-09-19).
 */
export declare function refuseAnotherChainsName(out: string, chain: number): void;
/** A mistake in how ship was called, as opposed to a check that failed. The CLI exits 2 on it. */
export declare class ShipUsageError extends Error {
}
export declare function renderShipMarkdown(r: ShipReport): string;
export declare function renderShipText(r: ShipReport): string;
export declare function shipReportJson(report: ShipReport): string;
