import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Buttons from "./App.jsx";
import posthog from "posthog-js";
import * as Sentry from "@sentry/react";

// 1. Ініціалізація PostHog
if (typeof window !== "undefined") {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host:
      import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
  });
}

// 2. Ініціалізація Sentry з налаштуваннями продуктивності (APM)
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(), // Відстеження транзакцій
    Sentry.replayIntegration(), // Запис сесій
  ],
  // Tracing
  tracesSampleRate: 1.0, // 1.0 означає збір 100% транзакцій продуктивності
  environment: import.meta.env.MODE, // Автоматично визначає 'development' або 'production'
});

// 3. Збір метрик продуктивності (Custom Metrics)
// Це допоможе у звіті показати, що ми відстежуємо завантаження
Sentry.metrics.count("app_startup", 1);
Sentry.metrics.gauge("page_load_time", 150);

// 4. Рендеринг додатку
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Buttons />
  </StrictMode>,
);
