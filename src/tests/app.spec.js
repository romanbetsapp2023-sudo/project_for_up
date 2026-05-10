import { test, expect } from "@playwright/test";

test("Критичний шлях: натискання кнопок та оновлення тексту", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");

  await expect(page.locator("h1")).toContainText("Three Buttons App");

  // Виправлено: використовуємо toHaveText
  await page.click("text=Кнопка 1");
  await expect(page.locator(".display-message")).toHaveText(
    "Натиснута перша кнопка",
  );

  await page.click("text=Кнопка 4");
  await expect(page.locator(".display-message")).toHaveText(
    "Натиснута четверта кнопка",
  );
});
