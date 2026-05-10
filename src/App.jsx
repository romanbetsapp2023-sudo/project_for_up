import { useState } from "react";
import "./App.css";

function Buttons() {
  const [message, setMessage] = useState("");
  // Vite автоматично підставить значення залежно від режиму
  const appStatus = import.meta.env.VITE_APP_STATUS;

  return (
    <div className="container">
      {/* Плашка, яка покаже режим роботи */}
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
        <button
          className="button"
          onClick={() => setMessage("Натиснута перша кнопка")}
        >
          Кнопка 1
        </button>
        <button
          className="button"
          onClick={() => setMessage("Натиснута друга кнопка")}
        >
          Кнопка 2
        </button>
        <button
          className="button"
          onClick={() => setMessage("Натиснута третя кнопка")}
        >
          Кнопка 3
        </button>
        <button
          className="button"
          onClick={() => setMessage("Натиснута четверта кнопка")}
        >
          Кнопка 4
        </button>
      </div>

      <p className="message">{message}</p>
    </div>
  );
}

export default Buttons;
