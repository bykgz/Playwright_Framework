import { test, expect } from "@playwright/test";

test("CSS Selector Locators", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/#/auth/register");

  //CSS ve xpat için pace.locator() fonksiyonu kullanılır.
  //Tag Name
  await page.locator("input").first().fill("Tag Name");

  //ID
  await page.locator("#first_name").fill("ID");

  //Class Name
  await page.locator(".form-control").first().fill("Class Name");

  //Attribute-value
  await page.locator('[id="first_name"]').fill("Attribute value");

  //class-value
  await page
    .locator('[class="form-control ng-untouched ng-dirty ng-valid"]')
    .fill("Class value");

  //tagname-attribute-value
  await page.locator('input[id="first_name"]').fill("tagname-attribute-value");

  //tagname-multiple-attribute-value
  await page
    .locator('input[id="first_name"][placeholder="Your first name *"]')
    .fill("tagname-multiple-attribute-value");

  //partial text
  await expect(page.locator(':text("Customer")')).toBeVisible();

  //Exact text
  await expect(page.locator(':text-is("Customer registration")')).toBeVisible();
});
