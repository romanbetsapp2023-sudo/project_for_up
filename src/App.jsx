import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Натисніть кнопку");

  const handleButtonClick = (name) => {
    setMessage(`Ви натиснули кнопку: ${name}`);
  };

  return (
    <div className="container">
      <h1>Three Buttons App</h1>
      <div className="card">
        <button onClick={() => handleButtonClick("Перша")}>Кнопка 1</button>
        <button onClick={() => handleButtonClick("Друга")}>Кнопка 2</button>
        <button onClick={() => handleButtonClick("Третя")}>Кнопка 3</button>
      </div>
      <p className="display-message">{message}</p>
      <div className="footer">
        <p>Text from second branch</p>
      </div>
    </div>
  );
}

export default App;
