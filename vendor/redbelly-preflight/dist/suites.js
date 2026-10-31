// The five-state suites: test contracts under test/ that inherit GatedTest from @gatedpath/receptor-mock.
// Shared by `ship` here and by the MCP server's five_state_tests and status.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
export function findGatedSuites(project, testDir = 'test') {
    const dir = join(project, testDir);
    if (!existsSync(dir))
        return [];
    const names = [];
    const walk = (d) => {
        for (const entry of readdirSync(d, { withFileTypes: true })) {
            const p = join(d, entry.name);
            if (entry.isDirectory())
                walk(p);
            else if (entry.name.endsWith('.t.sol')) {
                const text = readFileSync(p, 'utf8');
                for (const m of text.matchAll(/\bcontract\s+([A-Za-z0-9_]+)\s+is\s+([^{]*)\bGatedTest\b/g))
                    names.push(m[1]);
            }
        }
    };
    walk(dir);
    return names;
}
/** Counts a `forge test --json` result against the suites that inherit GatedTest. */
export function summariseTests(parsed, gatedSuites) {
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    const perSuite = new Map();
    const failures = [];
    for (const [suitePath, v] of Object.entries(parsed)) {
        const name = suitePath.split(':').pop() ?? suitePath;
        const s = perSuite.get(name) ?? { passed: 0, failed: 0 };
        for (const [test, r] of Object.entries(v.test_results ?? {})) {
            if (r.status === 'Success') {
                passed++;
                s.passed++;
            }
            else if (r.status === 'Failure') {
                failed++;
                s.failed++;
                failures.push({ suite: name, test, reason: r.reason ?? null });
            }
            else
                skipped++;
        }
        perSuite.set(name, s);
    }
    const suites = gatedSuites.map((name) => ({ name, ...(perSuite.get(name) ?? { passed: 0, failed: 0 }) }));
    const fiveState = gatedSuites.length > 0 && suites.every((s) => s.failed === 0 && s.passed > 0);
    return { passed, failed, skipped, suites, fiveState, failures };
}
