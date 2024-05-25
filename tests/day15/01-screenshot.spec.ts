import { expect, test } from "@playwright/test";
import { PageManager } from "../../page-objects/pageManager";

test.describe("test suite ", () => {
  test("test - 1", async ({ page }) => {
    const pm = new PageManager(page);

    await page.goto("https://practicesoftwaretesting.com/#/");

    //screenshot almak için iki seçenek var , ya sayfanın tamamını alırız ya da elementin ekran görüntüsünü alırız
    await page.screenshot({ path: "screenshots/HomePage..png" });

    await pm.navigateTo().openSignInPage();
    await page
      .locator(".auth-form")
      .screenshot({ path: "screenshots/LoginForm.png" });
  });

  test("test - 2", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/");
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("test - 3", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/");
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });
});
