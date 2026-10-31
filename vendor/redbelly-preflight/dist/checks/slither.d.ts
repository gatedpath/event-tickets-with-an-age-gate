import type { CheckResult } from '../types.js';
export declare const DEFAULT_REPORT_PATHS: string[];
/** Sidecar written next to the report: the hash of the sources Slither saw. */
export declare const SOURCES_HASH_FILE = "slither.sources.sha256";
/**
 * SHA-256 over every `.sol` file under `dir`, in sorted order of its POSIX relative path:
 * for each file, `<relative path>\n`, the file's bytes, then a NUL byte. The scaffold's
 * `scripts/slither.mjs` computes the same value with the same recipe; keep them in step.
 */
export declare function hashSources(dir: string): string;
export declare function checkSlitherReport(project: string, sourceDir: string, reportPath?: string): Promise<CheckResult>;
