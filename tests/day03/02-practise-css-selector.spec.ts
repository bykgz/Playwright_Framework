import { test, expect } from "@playwright/test";

test("Practise-Css-Selector", async ({ page }) => {
  await page.goto("https://saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator('[type="submit"]').click();

  await expect(page.locator(":text-is('Products')")).toBeVisible();

  await page.locator('[alt="Sauce Labs Backpack"]').click();

  // elementin "Back to products" textine sahip olduğunu kontrol ediyoruz.
  await expect(page.locator("#back-to-products")).toHaveText(
    "Back to products"
  );

  await page.locator("#add-to-cart").click();
  await expect(page.locator("#remove")).toHaveText("Remove");
  await expect(page.locator('[class="shopping_cart_badge"]')).toHaveText("1");

  await page.locator('[class="shopping_cart_link"]').click();
  await expect(page.locator(":text-is('Your Cart')")).toBeVisible();

  await page.locator("#continue-shopping").click();
  await expect(page.locator(":text-is('Products')")).toBeVisible();
});
