// scripts/copy-knowledge.mjs
// Copies the repo-root knowledge/ tree into packages/ui/knowledge/ so it ships inside the
// @alejandria/ui-kit tarball (files: ["dist","knowledge"]). Excludes the 35 MB
// design-reference.pdf (external consumers use knowledge/references/pdf-text-extract.md).
// Invoked by `prepack` (copy) and `postpack` with --clean (remove) in packages/ui.
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, sep } from "node:path";
import { existsSync, rmSync, cpSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url)); // <root>/scripts
const repoRoot = resolve(here, "..");                 // <root>
const src = join(repoRoot, "knowledge");
const dest = join(repoRoot, "packages", "ui", "knowledge");

// Paths within knowledge/ to omit from the shipped copy (forward-slash form).
const EXCLUDE = ["references/design-reference.pdf"];

// Always start clean so the copy is idempotent and stale files never linger.
if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });

if (process.argv.includes("--clean")) {
  console.log(`[copy-knowledge] removed ${dest}`);
  process.exit(0);
}

cpSync(src, dest, {
  recursive: true,
  filter: (from) => {
    const rel = from.slice(src.length + 1).split(sep).join("/");
    return !EXCLUDE.includes(rel);
  },
});
console.log(`[copy-knowledge] copied knowledge/ -> packages/ui/knowledge/ (excluded ${EXCLUDE.join(", ")})`);
