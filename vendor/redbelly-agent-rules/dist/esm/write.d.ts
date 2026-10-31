import type { Format } from './render.js';
import type { RulesSource } from './source.js';
export interface WriteOptions {
    /** Subset of formats to write. Default: all. */
    only?: readonly Format[];
    /** Compute everything, touch nothing. */
    dryRun?: boolean;
    /** Compare with disk instead of writing. `drifted` lists files that differ or are missing. */
    check?: boolean;
    /** Override the source (tests do). */
    source?: RulesSource;
}
export interface WriteResult {
    /** Files written or, in dry-run and check modes, files that would be written. */
    written: string[];
    /** Files already identical on disk. */
    unchanged: string[];
    /** Check mode only: files that differ from the render, or are missing. */
    drifted: string[];
    /** Rendered content by relative path, for callers that want to write it themselves. */
    files: Record<string, string>;
}
export declare function writeRulesFiles(dir: string, options?: WriteOptions): WriteResult;
