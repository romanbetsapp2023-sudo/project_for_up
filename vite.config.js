import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Перехоплюємо всі запити, які починаються на /ingest
      "/ingest": {
        target: "https://eu.i.posthog.com",
        changeOrigin: true,
        // Очищаємо префікс /ingest перед відправкою на сервери PostHog
        rewrite: (path) => path.replace(/^\/ingest/, ""),
      },
    },
  },
});
