import React, { useState, useEffect } from "react"; // ДОДАНО: useEffect
import "./App.css";
import posthog from "posthog-js"; // 1. Імпортуємо бібліотеку

function Buttons() {
  const [message, setMessage] = useState("");
  const [showExtraButtons, setShowExtraButtons] = useState(false); // ДОДАНО: стан для Feature Flag
  const appStatus = import.meta.env.VITE_APP_STATUS;

  // ДОДАНО: Перевірка Feature Flags при завантаженні компонента
  useEffect(() => {
    posthog.onFeatureFlags(() => {
      if (posthog.isFeatureEnabled("show-urgent-buttons")) {
        setShowExtraButtons(true);
      } else {
        setShowExtraButtons(false);
      }
    });
  }, []);

  // Функція-обробник, яка і текст міняє, і в аналітику пише
  const handlePress = (btnName, msg) => {
    setMessage(msg); // Змінюємо текст на екрані

    // 2. ВІДПРАВЛЯЄМО ПОДІЮ В POSTHOG
    posthog.capture("button_clicked", {
      button_name: btnName,
      status: appStatus,
    });
  };

  return (
    <div className="container">
      <div
        className="app-badge"
        style={{
          padding: "5px 10px",
          background: appStatus === "Development" ? "#ffcc00" : "#28a745",
          borderRadius: "4px",
          marginBottom: "10px",
          display: "inline-block",
        }}
      >
        Mode: {appStatus}
      </div>

      <h1 className="title">Перевірка роботи кнопок</h1>

      <div className="card">
        {/* Використовуємо handlePress для кожної кнопки */}
        <button
          className="button"
          onClick={() => handlePress("Button 1", "Натиснута перша кнопка")}
        >
          Кнопка 1
        </button>
        <button
          className="button"
          onClick={() => handlePress("Button 2", "Натиснута друга кнопка")}
        >
          Кнопка 2
        </button>
        <button
          className="button"
          onClick={() => handlePress("Button 3", "Натиснута третя кнопка")}
        >
          Кнопка 3
        </button>
        <button
          className="button"
          onClick={() => handlePress("Button 4", "Натиснута четверта кнопка")}
        >
          Кнопка 4
        </button>

        {/* ДОДАНО: Кнопка, яка з'являється лише при увімкненому Feature Flag */}
        {showExtraButtons && (
          <button
            className="button"
            style={{ backgroundColor: "#d9534f", marginTop: "10px" }} // Червоний колір для "Urgent"
            onClick={() =>
              handlePress("Urgent Button", "Натиснута секретна кнопка!")
            }
          >
            Спеціальний фільтр (Feature Flag)
          </button>
        )}
      </div>

      <p className="message">{message}</p>
    </div>
  );
}

export default Buttons;
