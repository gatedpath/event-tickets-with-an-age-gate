#!/usr/bin/env node
import type { Format } from './render.js';
interface Args {
    out: string;
    only: Format[];
    dryRun: boolean;
    check: boolean;
    list: boolean;
    help: boolean;
}
export declare function parseArgs(argv: readonly string[]): Args;
export declare function main(argv?: readonly string[]): number;
export {};
