import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      exclude: ["src/**/*.stories.tsx"],
      include: ["src"],
      insertTypesEntry: true,
      outDir: "dist"
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
