import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Buttons from "./App.jsx";
import posthog from "posthog-js";
import * as Sentry from "@sentry/react";

// ГЕНЕРАЦІЯ ID (Робимо на самому початку, щоб передати і в PostHog, і в Sentry)
let customUserId = "anonymous_user";
if (typeof window !== "undefined") {
  let localId = localStorage.getItem("sentry_anonymous_id");
  if (!localId) {
    localId = "user_" + Math.random().toString(36).substring(2, 11);
    localStorage.setItem("sentry_anonymous_id", localId);
  }
  customUserId = localId;
}

// 1. Ініціалізація PostHog (через Реверс-Проксі для обходу VPN викладача)
if (typeof window !== "undefined") {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    // Стукаємо на свій же домен /ingest, який Vercel непомітно перенаправить у PostHog
    api_host: window.location.origin + "/ingest",
    person_profiles: "identified_only",
    capture_pageview: true,
  });

  // Синхронізуємо користувача в PostHog, якщо він не анонімний
  if (customUserId !== "anonymous_user") {
    posthog.identify(customUserId);
  }
}

// 2. Ініціалізація Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  environment: import.meta.env.MODE,

  // ЗАЛІЗОБЕТОННЕ ПРИВ'ЯЗУВАННЯ ЮЗЕРА НА СТАРТІ:
  initialScope: {
    user: { id: customUserId },
  },
});

// 3. Збір метрик продуктивності
Sentry.metrics.count("app_startup", 1);
Sentry.metrics.gauge("page_load_time", 150);

// 4. Рендеринг додатку
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Buttons />
  </StrictMode>,
);
