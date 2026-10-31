#!/usr/bin/env node
export declare const DOCTOR_HELP = "redbelly-doctor [options]\n\nChecks the machine before the first command: Node 22 or later; forge, anvil and cast on\nPATH, one version, and the real binaries rather than the @foundry-rs npm shim that exits 0\nwhatever the binary returned; slither and aderyn (optional); git; no .env tracked by git;\nand, in a scaffold, vendor/ matching the versions the scaffolder recorded. One line per\ncheck with the fix on the same line. Touches no network and no key.\n\n  --project <dir>   scaffold root, its contracts/ folder, or any directory (default: cwd)\n  --json            print the report as JSON\n  --version, --help\n\nExit 0 when every required check passes (optional checks may warn), 1 otherwise, 2 on bad arguments.\n";
export declare function parseDoctorArgs(argv: readonly string[]): {
    project?: string;
    json: boolean;
    help: boolean;
    version: boolean;
};
export declare function doctorMain(argv?: readonly string[]): Promise<number>;
