import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

/**
 * Derive the barrel's type entry from `src/index.ts` — the single source of truth for exports.
 * vite-plugin-dts emits an empty `export {}` for this CSS+reexport barrel, so we regenerate it by
 * keeping only the `export …` lines (dropping the `import "./styles.css"` side-effect, which has no
 * type surface). Deriving instead of hand-listing means the shipped `.d.ts` can never drift from the
 * runtime exports.
 */
function buildPackageEntryDts(): string {
  const source = readFileSync(resolve(__dirname, "src/index.ts"), "utf8");
  const exportLines = source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("export "));

  if (exportLines.length === 0) {
    throw new Error("buildPackageEntryDts: no `export` lines found in src/index.ts");
  }

  return exportLines.join("\n") + "\n";
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      exclude: ["src/**/*.stories.tsx", "src/**/*.stories.ts"],
      include: ["src"],
      insertTypesEntry: true,
      outDir: "dist",
      afterBuild: () => {
        // Rewrite the barrel type entry from src/index.ts (single source of truth); see helper above.
        writeFileSync(resolve(__dirname, "dist/src/index.d.ts"), buildPackageEntryDts(), "utf8");
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
      cssFileName: "style"
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"]
    },
    sourcemap: true
  }
});
