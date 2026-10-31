// One place that spawns processes. Arguments go as an array, never through a shell, so a
// keystore name or a path cannot become a command.
import { spawn } from 'node:child_process';
export function run(cmd, args, opts = {}) {
    return new Promise((resolve) => {
        const child = spawn(cmd, args, { cwd: opts.cwd, env: opts.env ?? process.env, stdio: [opts.stdin === undefined ? 'ignore' : 'pipe', 'pipe', 'pipe'] });
        let stdout = '';
        let stderr = '';
        let done = false;
        const finish = (r) => {
            if (done)
                return;
            done = true;
            resolve(r);
        };
        const timer = opts.timeoutMs ? setTimeout(() => { child.kill('SIGKILL'); finish({ code: null, stdout, stderr: stderr + `\n${cmd} timed out after ${opts.timeoutMs}ms` }); }, opts.timeoutMs) : null;
        child.stdout?.on('data', (d) => (stdout += d));
        child.stderr?.on('data', (d) => (stderr += d));
        child.on('error', (e) => { if (timer)
            clearTimeout(timer); finish({ code: null, stdout, stderr, spawnError: e.message }); });
        child.on('close', (code) => { if (timer)
            clearTimeout(timer); finish({ code, stdout, stderr }); });
        if (opts.stdin !== undefined && child.stdin) {
            child.stdin.end(opts.stdin);
        }
    });
}
export const ACCOUNT_NAME = /^[A-Za-z0-9._-]{1,64}$/;
