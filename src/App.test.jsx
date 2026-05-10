/**
 * @vitest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
// Обов'язково додай цей рядок нижче:
import { describe, it, expect, afterEach, vi } from "vitest";
import Buttons from "./App"; // Перевір, щоб шлях до компонента був правильним

describe("Buttons Component Unit Tests", () => {
  afterEach(() => {
    cleanup();
  });

  it("відображає початковий заголовок та порожнє повідомлення", () => {
    render(<Buttons />);
    expect(screen.getByText(/Second test/i)).toBeDefined();
    const message = screen.getByRole("paragraph");
    expect(message.textContent).toBe("");
  });

  it("демонструє використання Mock-функції", () => {
    const mockFn = vi.fn();
    mockFn("test data");
    expect(mockFn).toHaveBeenCalledWith("test data");
  });

  it("змінює повідомлення при натисканні на Кнопку 1", () => {
    render(<Buttons />);
    fireEvent.click(screen.getByText("Кнопка 1"));
    expect(screen.getByText("Натиснута перша кнопка")).toBeDefined();
  });
});
