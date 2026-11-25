// Two Lines to Your Past Self — entry program.
//
// Writes the entry text (exactly two lines) to /output/entry.txt.
// The text is fixed and deterministic: no network, no randomness, no
// input files. The gate requires UTF-8 text of 1 to 280 characters,
// so the program checks the length before writing.

import { mkdirSync, writeFileSync } from "node:fs";

// Line one warns the past self about one specific moment, in a single
// sentence. Line two says in one sentence why that moment mattered and
// what changed because of it.
//
// How the text targets the judge brief, most important first:
//  1. One specific moment: the night Dad comes home with his toolbox
//     and no job, and the letter left unopened in the drawer.
//  2. Concrete enough to picture: a drawer, a toolbox, a sealed letter
//     found three years later, a coffee shop at thirty.
//  3. Real cause and effect: the unopened letter is the degree never
//     used, which is why the writer is still in the coffee shop —
//     the second line traces the consequence instead of restating
//     the warning.
//  4. Plain voice, no wasted words: written to one person, not an
//     audience.
const LINE_1 =
  "Don't leave the university letter unopened in the drawer the night Dad comes home carrying his toolbox and no job.";
const LINE_2 =
  "You'll find it still sealed three years later, and the degree inside was the one way out of the coffee shop where you still work at thirty.";

const entry = `${LINE_1}\n${LINE_2}`;

// The bounty shape: exactly two lines, one sentence each.
const lines = entry.split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
}
for (const [i, line] of lines.entries()) {
  const sentences = line.split(/[.!?]/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`line ${i + 1} must be one sentence, got ${sentences.length}`);
  }
}

if (entry.length > 280) {
  throw new Error(`entry too long: ${entry.length} characters (limit 280)`);
}
if (entry.trim().length === 0) {
  throw new Error("entry is empty");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
console.log(`wrote /output/entry.txt (${entry.length} characters, 2 lines)`);
