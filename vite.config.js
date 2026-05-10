import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Дозволяє не імпортувати 'describe' та 'it' у кожному файлі
    environment: "jsdom", // Імітація браузера для тестів компонентів
  },
});
