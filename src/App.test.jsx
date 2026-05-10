import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Buttons from "./App";

describe("Buttons Component Unit Tests", () => {
  afterEach(cleanup);

  it("відображає початковий заголовок та режим роботи", () => {
    render(<Buttons />);
    // Шукаємо твій новий заголовок
    expect(screen.getByText(/Перевірка роботи кнопок/i)).toBeDefined();
    // Перевіряємо, чи відображається плашка режиму
    expect(screen.getByText(/Mode:/i)).toBeDefined();
  });

  it("змінює повідомлення при натисканні на Кнопку 1", () => {
    render(<Buttons />);
    const button1 = screen.getByText("Кнопка 1");
    fireEvent.click(button1);
    // Перевіряємо точний текст, який ти вказав у App.jsx
    expect(screen.getByText("Натиснута перша кнопка")).toBeDefined();
  });
});
// Фінальна перевірка
