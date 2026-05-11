import React, { useState, useEffect } from "react";
import "./App.css";
import posthog from "posthog-js";
import * as Sentry from "@sentry/react"; // Імпорт Sentry для ідентифікації

function Buttons() {
  const [message, setMessage] = useState("");
  const [showExtraButtons, setShowExtraButtons] = useState(false);
  const appStatus = import.meta.env.VITE_APP_STATUS;

  // Слідкуємо за Feature Flags від PostHog
  useEffect(() => {
    posthog.onFeatureFlags(() => {
      if (posthog.isFeatureEnabled("show-urgent-buttons")) {
        setShowExtraButtons(true);
      } else {
        setShowExtraButtons(false);
      }
    });
  }, []);

  // ФУНКЦІЯ АВТОРИЗАЦІЇ: Ідентифікуємо тебе в системі
  const handleLogin = () => {
    const userData = {
      id: "777",
      username: "Roman",
      email: "roman.dev@university.edu",
      segment: "premium_user",
    };

    // Передаємо дані користувача в Sentry
    Sentry.setUser({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      segment: userData.segment,
    });

    // Також ідентифікуємо в PostHog
    posthog.identify(userData.id, {
      name: userData.username,
      email: userData.email,
    });

    setMessage(`Привіт, ${userData.username}! Тепер Sentry знає, хто ти.`);
  };

  // Звичайна обробка натискання кнопок
  const handlePress = (btnName, msg) => {
    setMessage(msg);
    posthog.capture("button_clicked", {
      button_name: btnName,
      status: appStatus,
    });
  };

  // СИМУЛЯЦІЯ ПОМИЛКИ
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
        {/* Кнопка авторизації */}
        <button
          className="button login-btn"
          style={{ backgroundColor: "#4a90e2", marginBottom: "20px" }}
          onClick={handleLogin}
        >
          Увійти як Роман
        </button>

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

        {/* Feature Flag кнопка */}
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

        {/* Кнопка для перевірки Sentry */}
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
