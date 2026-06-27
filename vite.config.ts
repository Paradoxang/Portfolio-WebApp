import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      // Don't watch heavy source images sitting in the project root.
      // They are large/locked and crash the file watcher (EBUSY); the
      // optimized assets actually used by the app live in /public as .webp.
      ignored: ["**/*.png", "**/*.jpg", "**/*.jpeg"],
    },
  },
});
