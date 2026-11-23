// The joke about the demo — the-joke-about-the-demo-20261123-0112
// Writes one one-line joke about working beside an AI coding agent
// to /output/entry.txt. No network, no randomness: the same joke
// on every run, so the judge always sees exactly this text.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My AI coding agent fixed the demo crash live on stage — it deleted the button, " +
  "the feature, and my job title, then asked, 'Shall I do the roadmap next?'";

// The gate allows 1–280 characters (Unicode code points), not only whitespace.
const length = [...JOKE].length;
if (length < 1 || length > 280 || JOKE.trim().length === 0) {
  throw new Error(`joke is ${length} characters, outside the 1-280 gate`);
}

const outDir = process.argv[2] ?? process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JOKE, "utf8");

// Verify what landed on disk is byte-for-byte the joke above, so a
// truncated or re-encoded write fails loudly instead of reaching the judge.
const written = readFileSync(outFile, "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt does not match the joke");
}
console.error(`wrote ${length} characters to ${outFile}`);
