import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Buttons from "./App.jsx";
import posthog from "posthog-js";
import * as Sentry from "@sentry/react";

// ГЕНЕРАЦІЯ ID
let customUserId = "anonymous_user";
if (typeof window !== "undefined") {
  let localId = localStorage.getItem("sentry_anonymous_id");
  if (!localId) {
    localId = "user_" + Math.random().toString(36).substring(2, 11);
    localStorage.setItem("sentry_anonymous_id", localId);
  }
  customUserId = localId;
}

// 1. Ініціалізація PostHog (через Vercel реверс-проксі)
if (typeof window !== "undefined") {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest", // ← через проксі
    ui_host: "https://eu.posthog.com", // ← для UI посилань
    person_profiles: "identified_only",
    capture_pageview: true,
  });

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
  initialScope: {
    user: { id: customUserId },
  },
});

// 3. Рендеринг додатку
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Buttons />
  </StrictMode>,
);
