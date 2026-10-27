import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { extname, isAbsolute, relative, resolve } from 'node:path';

const LINTABLE_EXTENSIONS = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs',
  '.cjs',
]);

async function readStdin() {
  let data = '';
  for await (const chunk of process.stdin) {
    data += chunk;
  }
  return data;
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    shell: process.platform === 'win32',
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    process.stderr.write(
      `[format-file] ${command} ${args.join(' ')} exited ${result.status}\n${result.stderr ?? ''}\n`,
    );
  }
}

async function main() {
  const raw = await readStdin();
  let filePath;
  try {
    const input = JSON.parse(raw);
    filePath = input?.tool_input?.file_path;
  } catch {
    return;
  }

  if (!filePath) return;

  const repoRoot = process.cwd();
  const absolutePath = isAbsolute(filePath)
    ? filePath
    : resolve(repoRoot, filePath);
  const rel = relative(repoRoot, absolutePath);

  if (rel.startsWith('..') || isAbsolute(rel)) return;
  if (!existsSync(absolutePath)) return;

  run('pnpm', [
    'exec',
    'prettier',
    '--write',
    '--ignore-unknown',
    absolutePath,
  ]);

  if (LINTABLE_EXTENSIONS.has(extname(absolutePath))) {
    run('pnpm', ['exec', 'eslint', '--fix', absolutePath]);
  }
}

main().catch((err) => {
  process.stderr.write(`[format-file] unexpected error: ${err}\n`);
});
