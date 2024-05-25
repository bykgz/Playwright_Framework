import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.goto("https://practicesoftwaretesting.com/#/");
  await page.getByRole("link", { name: "Practice Software Testing -" }).click();
  await page
    .locator('[data-test="product-01HW5D7P6SC9GVCEK44D2GM5N6"]')
    .click();
  await page.locator('[data-test="nav-categories"]').click();
  await page.locator('[data-test="nav-categories"]').click();
  await page.locator('[data-test="nav-categories"]').click();
  await page.locator('[data-test="nav-contact"]').click();
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.getByRole("link", { name: "Practice Software Testing -" }).click();
});
