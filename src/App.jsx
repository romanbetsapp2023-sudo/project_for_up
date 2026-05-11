import React, { useState, useEffect } from "react";
import "./App.css";
import posthog from "posthog-js";
import * as Sentry from "@sentry/react";

function Buttons() {
  const [message, setMessage] = useState("");
  const [showExtraButtons, setShowExtraButtons] = useState(false);
  const appStatus = import.meta.env.VITE_APP_STATUS;

  useEffect(() => {
    posthog.onFeatureFlags(() => {
      if (posthog.isFeatureEnabled("show-urgent-buttons")) {
        setShowExtraButtons(true);
      } else {
        setShowExtraButtons(false);
      }
    });
  }, []);

  const handleLogin = () => {
    const userData = {
      id: "79787",
      username: "Roman",
      email: "betha7762@gmail.com",
      segment: "premium_user",
    };

    Sentry.setUser({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      segment: userData.segment,
    });

    posthog.identify(userData.id, {
      name: userData.username,
      email: userData.email,
    });

    setMessage(`Привіт, ${userData.username}! Тепер Sentry знає, хто ти.`);
  };

  // ФУНКЦІЯ ВИХОДУ: Очищуємо контекст користувача
  const handleLogout = () => {
    // 1. Очищуємо дані в Sentry
    Sentry.setUser(null);

    // 2. Скидаємо ідентифікацію в PostHog
    posthog.reset();

    setMessage("Контекст користувача очищено. Тепер ти анонім.");
  };

  const handlePress = (btnName, msg) => {
    setMessage(msg);
    posthog.capture("button_clicked", {
      button_name: btnName,
      status: appStatus,
    });
  };

  const throwTestError = () => {
    setMessage("Викликаю критичну помилку...");
    throw new Error("Sentry Test Error: Критичний збій у компоненту Buttons!");
  };

  return (
    <div className="container">
      <div
        className="app-badge"
        style={{
          background: appStatus === "Development" ? "#ffcc00" : "#28a745",
        }}
      >
        Mode: {appStatus}
      </div>

      <h1 className="title">Панель моніторингу: Роман</h1>

      <div className="card">
        {/* Кнопки авторизації та виходу */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <button
            className="button login-btn"
            style={{ backgroundColor: "#4a90e2" }}
            onClick={handleLogin}
          >
            Увійти як Роман
          </button>

          <button
            className="button logout-btn"
            style={{ backgroundColor: "#6c757d" }}
            onClick={handleLogout}
          >
            Вийти (Logout)
          </button>
        </div>

        <div className="button-group">
          <button
            className="button"
            onClick={() => handlePress("Button 1", "Натиснута кнопка 1")}
          >
            Кнопка 1
          </button>
          <button
            className="button"
            onClick={() => handlePress("Button 2", "Натиснута кнопка 2")}
          >
            Кнопка 2
          </button>
          <button
            className="button"
            onClick={() => handlePress("Button 3", "Натиснута кнопка 3")}
          >
            Кнопка 3
          </button>
          <button
            className="button"
            onClick={() => handlePress("Button 4", "Натиснута кнопка 4")}
          >
            Кнопка 4
          </button>
        </div>

        {showExtraButtons && (
          <button
            className="button"
            style={{ backgroundColor: "#d9534f", marginTop: "10px" }}
            onClick={() =>
              handlePress("Urgent Button", "Секретна кнопка активована!")
            }
          >
            Спеціальний фільтр (Feature Flag)
          </button>
        )}

        <button
          className="button error-btn"
          style={{
            backgroundColor: "#e11d48",
            marginTop: "20px",
            fontWeight: "bold",
          }}
          onClick={throwTestError}
        >
          Break the World (Error)
        </button>
      </div>

      <p className="message">{message}</p>
    </div>
  );
}

export default Buttons;
