import { test, expect } from "@playwright/test";

test.describe("test suite @regression", () => {
  //test.only --> bu sadece bu testi calistirir
  //test.skip --> bu testi calistirmaz

  //npx playwright test --headed --grep @smoke  --> sadece smoke tagli testleri calistirir
  //npx playwright test --headed --grep @smoke  --project=chromium --> sadece smoke tagli testleri calistirir ve chrome browserda acar
  //npx playwright test --headed --grep "@smoke|@tc02" --project=chromium --> smoke ve tc02 tagli testleri calistirir ve chrome browserda acar

  test("test - 1 @smoke ", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/");
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("test - 2 @tc02", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/");
  });

  test("test - 3", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/");
  });
});
