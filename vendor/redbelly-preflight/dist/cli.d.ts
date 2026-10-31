#!/usr/bin/env node
import type { RunOptions } from './run.js';
export declare function parseArgs(argv: readonly string[]): RunOptions & {
    json: boolean;
    help: boolean;
    version: boolean;
};
export declare function main(argv?: readonly string[]): Promise<number>;
