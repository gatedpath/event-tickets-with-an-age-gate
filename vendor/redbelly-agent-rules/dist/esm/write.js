// Programmatic API the scaffolder will call: write every rules file into a directory,
// or check that what is on disk matches what would be generated.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { formats, render, targetPath } from './render.js';
import { rulesSource } from './source.js';
export function writeRulesFiles(dir, options = {}) {
    const chosen = options.only ?? formats;
    const source = options.source ?? rulesSource;
    const result = { written: [], unchanged: [], drifted: [], files: {} };
    for (const format of chosen) {
        const rel = targetPath[format];
        const abs = join(dir, rel);
        const content = render(format, source);
        result.files[rel] = content;
        const onDisk = existsSync(abs) ? readFileSync(abs, 'utf8') : null;
        if (onDisk === content) {
            result.unchanged.push(rel);
            continue;
        }
        if (options.check) {
            result.drifted.push(rel);
            continue;
        }
        if (options.dryRun) {
            result.written.push(rel);
            continue;
        }
        mkdirSync(dirname(abs), { recursive: true });
        writeFileSync(abs, content);
        result.written.push(rel);
    }
    return result;
}
