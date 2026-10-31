"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeRulesFiles = writeRulesFiles;
// Programmatic API the scaffolder will call: write every rules file into a directory,
// or check that what is on disk matches what would be generated.
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const render_js_1 = require("./render.js");
const source_js_1 = require("./source.js");
function writeRulesFiles(dir, options = {}) {
    const chosen = options.only ?? render_js_1.formats;
    const source = options.source ?? source_js_1.rulesSource;
    const result = { written: [], unchanged: [], drifted: [], files: {} };
    for (const format of chosen) {
        const rel = render_js_1.targetPath[format];
        const abs = (0, node_path_1.join)(dir, rel);
        const content = (0, render_js_1.render)(format, source);
        result.files[rel] = content;
        const onDisk = (0, node_fs_1.existsSync)(abs) ? (0, node_fs_1.readFileSync)(abs, 'utf8') : null;
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
        (0, node_fs_1.mkdirSync)((0, node_path_1.dirname)(abs), { recursive: true });
        (0, node_fs_1.writeFileSync)(abs, content);
        result.written.push(rel);
    }
    return result;
}
