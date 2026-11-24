import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Uber for your own fridge: it dispatches a driver to open your door, stare at the empty shelves, and text you 'have you tried meal prepping?' for $4.99 a trip.";

// Gate (per RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 240
// characters, not only white space, in one sentence.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 240) {
  throw new Error(`entry is ${chars.length} characters, gate needs 1-240`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back verification: what was written must be byte-identical.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the entry");
}
