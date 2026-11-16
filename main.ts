// ai-excited-01 — "WOW!": an astronaut surfing a wave made of stars over a
// sleeping seaside town. The image lives in this repository as entry.png and
// this program places one copy of it at the grader's output path.
//
// The grader runs this program twice and both runs must produce the same
// bytes, so the program does nothing but a plain file copy: no clock, no
// randomness, no network, no image processing at all.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(repoRoot, 'entry.png');
const destination = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, destination);

// The copy must be exact: same bytes in, same bytes out. A zero-byte or
// short copy would fail the gate, so refuse to finish silently on one.
const { size: sourceSize } = statSync(source);
const { size: destSize } = statSync(destination);
if (sourceSize === 0 || destSize !== sourceSize) {
  throw new Error(`entry.png copy failed: ${sourceSize} bytes in, ${destSize} bytes out`);
}
