import { expect, test } from "@playwright/test";
import { PageManager } from "../../page-objects/pageManager";

test.describe("test suite ", () => {
  test("test - 1", async ({ page }) => {
    const pm = new PageManager(page);

    await page.goto("https://practicesoftwaretesting.com/#/");

    await expect(page).toHaveScreenshot();

    await pm.navigateTo().openSignInPage();

    await page.getByPlaceholder("Your email").fill("Mustafa Buyukgoze");

    await expect(page.locator(".auth-form")).toHaveScreenshot({
      maxDiffPixels: 100, //en fazla 100 piksel fark olabilir , yani 100 piksellik farka kadar görmezden gel diyebiliriz
    });

    //await expect(page.locator(".auth-form")).toHaveScreenshot({animations:"disabled"}); //animasyonları devre dışı bırakır
    //await expect(page.locator(".auth-form")).toHaveScreenshot({caret : "hide"}); //caret yani imleci gizler
  });
});
