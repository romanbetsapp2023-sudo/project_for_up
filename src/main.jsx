import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Buttons from "./App.jsx"; // Твій основний компонент
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

// 2. Ініціалізація Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  environment: import.meta.env.MODE, // 'development' або 'production'
});

// 3. Збір базових метрик продуктивності (для звіту)
Sentry.metrics.count("app_startup", 1);
Sentry.metrics.gauge("page_load_time", 150);

// 4. Рендеринг додатку (один раз!)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Buttons />
  </StrictMode>,
);
