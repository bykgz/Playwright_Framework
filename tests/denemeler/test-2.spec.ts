import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').click();
  await page.locator('[data-test="email"]').fill("admin@gmail.com");

  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("12345678");
  await expect(page.getByRole("heading")).toContainText("Login");
  await expect(page.locator('[data-test="email"]')).toHaveValue(
    "admin@gmail.com"
  );
  await expect(page.locator('[data-test="password"]')).toHaveValue("12345678");
  await expect(page.locator('[data-test="login-submit"]')).toBeVisible();
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="login-error"] div')).toContainText(
    "Invalid email or password"
  );
});
