import { test } from "@playwright/test";
import { PageManager } from "../../page-objects/pageManager"; //

import { singleUserCredentials as user } from "../../data/userCredentials"; //as user diyerek isim değişikliği yapabiliriz
import { listUserCredentials as userList } from "../../data/userCredentials"; //as userList diyerek isim değişikliği yapabiliriz

test.beforeEach(async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/#/");
});

test("Login test with single data @smoke", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().openSignInPage();
  await pm.onSignInPage().performLogin(user.email, user.password, "Login");

  await pm.onSignInPage().waitForSecond(3);
});

for (const user of userList) {
  test(`Login Test with List Data ${user.email}`, async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigateTo().openSignInPage();
    await pm.onSignInPage().performLogin(user.email, user.password, "Login");
    await pm.onSignInPage().waitForSecond(3);
  });
}
