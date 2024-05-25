import { test, expect } from "@playwright/test";
test("xpath locators", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/#/auth/register");

  //tag name
  await expect(page.locator("//h3")).toHaveText("Customer registration");

  //attribute value
  await page.locator("//*[@id='first_name']").fill("attribute value");

  // tag name ve attribute value
  await page
    .locator("//input[@id='first_name']")
    .fill("tag name ve attribute value");

  // multiple attribute value
  await page
    .locator("//input[@id='first_name' and @placeholder='Your first name *']")
    .fill("multiple attribute value");

  // full text
  await expect(
    page.locator("//h3[text()='Customer registration']")
  ).toBeVisible();

  //await expect(page.locator("//h3[.='Customer registration']")).toBeVisible();

  //contains text value
  await expect(page.locator("//h3[contains(text(),'Customer re')]")).toHaveText(
    "Customer registration"
  );
});
