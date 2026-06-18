import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@alejandria/ui-kit/style.css",
        replacement: fileURLToPath(new URL("../../packages/ui/src/styles.css", import.meta.url))
      },
      {
        find: "@alejandria/ui-kit",
        replacement: fileURLToPath(new URL("../../packages/ui/src/index.ts", import.meta.url))
      }
    ]
  }
});
