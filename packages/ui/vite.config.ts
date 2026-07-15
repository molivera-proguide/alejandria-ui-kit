import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

/** Entry types mirror `src/index.ts` (CSS side-effect omitted). */
const PACKAGE_ENTRY_DTS = [
  'export * from "./components/Badge";',
  'export * from "./components/AlertBanner";',
  'export * from "./components/Button";',
  'export * from "./components/Card";',
  'export * from "./components/ChartCard";',
  'export * from "./components/BarChartCard";',
  'export * from "./components/DonutChartCard";',
  'export * from "./components/LineChartCard";',
  'export * from "./components/DataTable";',
  'export * from "./components/MetricCard";',
  'export * from "./components/ProgressRing";',
  'export * from "./components/SegmentedControl";',
  'export * from "./components/SelectField";',
  'export * from "./components/Scrollbar";',
  'export * from "./components/Switch";',
  'export * from "./components/TaskCard";',
  'export * from "./components/ModuleCard";',
  'export * from "./components/InvestigationCard";',
  'export * from "./components/TextField";',
  'export * from "./Icons";',
  ""
].join("\n");

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
        // vite-plugin-dts emits an empty `export {}` for this CSS+reexport barrel; rewrite for consumers.
        writeFileSync(resolve(__dirname, "dist/src/index.d.ts"), PACKAGE_ENTRY_DTS, "utf8");
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
