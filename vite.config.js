import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Дозволяє використовувати describe, it, expect без імпорту
    environment: "jsdom", // Необхідно для тестування React-компонентів
  },
});
