import type { GasOptions } from './gas.js';
export declare const GAS_HELP = "redbelly gas [options]\n\nPrices a gas snapshot or a forge gas report at the chain's latest base fee and on-chain feed\nprice, one row per test or function, in RBNT and US cents. Reads .gas-snapshot when the project\nhas one, else runs forge test --gas-report --json. Read-only: two RPC reads, no key.\n\n  --project <dir>      Foundry project or scaffold root (default: current directory)\n  --chain <151|153>    chain to price on (default 153); the RPC must report it\n  --rpc <url>          JSON-RPC endpoint (default: the governors RPC for --chain; a fork works)\n  --snapshot <file>    price this .gas-snapshot or gas-report JSON instead of the project's\n  --report             run forge test --gas-report --json even when .gas-snapshot exists\n  --diff <file>        a previous .gas-snapshot or gas-report JSON to compare against\n  --json               print the report as JSON\n  --version, --help\n";
export declare function parseGasArgs(argv: readonly string[]): GasOptions & {
    json: boolean;
    help: boolean;
    version: boolean;
};
export declare function gasMain(argv?: readonly string[]): Promise<number>;
