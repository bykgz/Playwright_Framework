import { expect, test } from "@playwright/test";
import { PageManager } from "../../page-objects/pageManager";

test.describe("test suite ", () => {
  test("test - 1", async ({ page }, testInfo) => {
    const pm = new PageManager(page);

    await page.goto("https://practicesoftwaretesting.com/#/");

    //=== --> kesin eşitlik hem türlerini hem değerlerini kontrol eder
    //== -->  sadece değerlerini kontrol eder

    if (testInfo.project.name === "mobile") {
      //eğer projenin adı mobile ise
      await page.locator(".navbar-toggler-icon").click();
    }

    await pm.navigateTo().openSignInPage();
    await page.locator(".auth-form");
  });
});
