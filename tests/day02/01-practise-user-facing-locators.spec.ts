import { test, expect } from "@playwright/test";

test("practise 1 - user facing locators", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/");

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Dashboard" })).toHaveText(
    "Dashboard"
  );

  await page.getByRole("link", { name: "My Info" }).click();
  await expect(page.getByRole("heading", { name: "PIM" })).toBeVisible();
});

test("practise 2 - user facing locators", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Products")).toBeVisible();

  //burda 6 tane çıkıyor istersek first() kullanabiliriz ilkini seçmek için
  // await page.getByTestId("inventory-item-name").first().click();

  //yada last() ile sonuncuyu seçebiliriz
  // await page.getByTestId("inventory-item-name").last().click();

  //yada nth() ile istediğimiz indexi seçebiliriz
  // await page.getByTestId("inventory-item-name").nth(0).click();

  //yada filter() ile istediğimiz bir özelliğe göre filtreleme yapabiliriz
  // await page
  //   .getByTestId("inventory-item-name")
  //   .filter({ hasText: "Sauce Labs Bolt T-Shirt" })
  //   .click();

  await page.getByAltText("Sauce Labs Backpack").click();
  await expect(
    page.getByRole("button", { name: "Go back Back to products" })
  ).toBeVisible();

  await page.getByRole("button", { name: "Add to cart" }).click();

  await expect(page.getByRole("button", { name: "Remove" })).toBeVisible();

  await expect(page.getByText("1", { exact: true })).toBeVisible();

  await page.getByTestId("shopping-cart-link").click();

  await expect(page.getByText("Your Cart")).toBeVisible();

  await page.getByRole("button", { name: "Go back Continue Shopping" }).click();
});

test("practise 3 - user facing locators", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");

  await page.getByPlaceholder("Search entire store").fill("t-shirt");

  await page.getByTitle("Search").click();

  await page.getByAltText("Balboa Persistence Tee").click();

  await expect(
    page.getByRole("heading", { name: "Balboa Persistence Tee" })
  ).toHaveText("Balboa Persistence Tee");

  await page.getByRole("option", { name: "XL" }).click();
  await page.getByRole("option", { name: "Green" }).click();
  await page.getByRole("button", { name: "Add to Cart" }).click();

  await expect(page.getByRole("link", { name: "1" })).toBeVisible();
  await page.getByRole("link", { name: "1" }).click();
  await page.getByRole("button", { name: "Proceed to Checkout" }).click();

  await expect(page.getByText("Shipping Address")).toBeVisible();
});
