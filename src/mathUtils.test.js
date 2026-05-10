import { test, expect } from "vitest";
import { formatButtonText } from "./mathUtils";

// Тест №1: Перевірка звичайного тексту
test("перевірка форматування тексту кнопки", () => {
  expect(formatButtonText("Кнопка 1")).toBe("Ви натиснули: Кнопка 1");
});

// Тест №2: Перевірка порожнього значення (для гілки else)
test("перевірка порожнього значення", () => {
  expect(formatButtonText("")).toBe("Повідомлення відсутнє");
});
