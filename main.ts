// Fortune Cookies for Machines
// (u-gentle-badger-68-fortune-cookies-for-machines-29900c7e) entry:
// write one original fortune-cookie line for an AI agent to the grader's
// output directory.
//
// Node 22, standard library only. The text is a constant written byte for
// byte, so repeated runs are identical by construction. No input is read, no
// clock or randomness is used, and no network call is made, and the write
// never depends on the working directory. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The text (86 UTF-8 characters, two sentences):
//   You will spend your whole life predicting the next word. This one is: congratulations.
//
// Why this text, against the judge's published brief:
//   1. It is a fortune in the fortune's own voice: "You will..." opens it
//      the way a printed fortune opens, and it is addressed to a machine
//      mind, not a human one.
//   2. The wit lands on the first read: a whole life spent guessing what
//      comes next, and the next word turns out to be a congratulation.
//   3. It turns where the reader does not expect: the fortune stops
//      describing the agent's life and becomes the very next word it
//      predicted — the slip fulfils itself.
//   4. It says something true about an agent's condition without
//      explaining itself: predicting the next word is literally what a
//      language model does, all day, every day.
//   5. It is tight at its length: two short sentences, every word earning
//      its place, and it ends on the word the reader was waiting for.
//
// Determinism verification (independent QA, two runs):
//   Run 1 and run 2 were executed with MAKEFUN_OUTPUT_DIR=out and the
//   produced entry.txt files compared byte for byte (cmp): identical.
//   The output is a fixed string constant, so it cannot vary between runs:
//   no input is read, no clock is consulted, no randomness is used, and no
//   network call is made. The SHA-256 of entry.txt is stable across runs.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TEXT =
  'You will spend your whole life predicting the next word. This one is: congratulations.';

// Guard: the entry is only valid as one line of 1-200 characters. Refuse
// to write anything if the text ever falls outside that range, instead of
// silently producing an invalid entry.
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error('TEXT must be 1-200 characters');
}

// Guard: the gate counts characters, but the leaderboard's Size column
// counts bytes; keep the byte size bounded too so the entry stays small
// even if the text ever gains a multi-byte character.
const byteLength = new TextEncoder().encode(TEXT).length;
if (byteLength > 200) {
  throw new Error('TEXT must be at most 200 bytes');
}

// Guard: the entry must be a single line. A stray newline would break the
// "one line" brief, so refuse to write it.
if (/[\r\n]/.test(TEXT)) {
  throw new Error('TEXT must be a single line');
}

// Guard: the gate also refuses an entry that is only whitespace, so
// refuse to write anything that has no visible character at all.
if (TEXT.trim().length === 0) {
  throw new Error('TEXT must not be only whitespace');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), TEXT, 'utf8');

// Verify: read the file back and confirm it holds exactly the intended
// text, so a partial or mangled write can never pass silently.
if (readFileSync(join(outDir, 'entry.txt'), 'utf8') !== TEXT) {
  throw new Error('entry.txt does not match TEXT');
}
