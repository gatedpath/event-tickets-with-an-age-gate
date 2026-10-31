import type { RulesSource } from './source.js';
export type Format = 'claude' | 'agents' | 'cursor' | 'copilot' | 'gemini' | 'llms' | 'llms-full';
export declare const formats: readonly Format[];
/** Where each format lands, relative to the target directory. */
export declare const targetPath: Readonly<Record<Format, string>>;
export declare const GENERATOR = "@gatedpath/agent-rules";
export declare const CLI = "redbelly-agent-rules";
/**
 * How to run this package with npx. The PACKAGE name, never the bin name: `redbelly-agent-rules` is
 * not a package, nobody owns that name on npm, and an agent told to `npx` it would run whatever a
 * stranger later published there (audit of 2026-09-19).
 */
export declare const NPX = "npx -y @gatedpath/agent-rules";
/** The shared markdown body. Identical in every rules-file format. */
export declare function renderBody(source?: RulesSource): string;
export declare function renderClaude(source?: RulesSource): string;
export declare function renderAgents(source?: RulesSource): string;
export declare function renderCursor(source?: RulesSource): string;
export declare function renderCopilot(source?: RulesSource): string;
export declare function renderGemini(source?: RulesSource): string;
export declare function renderLlms(source?: RulesSource): string;
export declare function renderLlmsFull(source?: RulesSource): string;
export declare function render(format: Format, source?: RulesSource): string;
export declare function renderAll(source?: RulesSource): Record<Format, string>;
export declare function isFormat(value: string): value is Format;
