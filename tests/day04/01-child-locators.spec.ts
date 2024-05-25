import { test, expect } from "@playwright/test";

test("Child Locators - 1", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/#/");

  await expect(page.getByText("Pliers").first()).toBeVisible();
  await expect(page.getByText("Pliers").nth(1)).toBeVisible();

  // CSS Selector
  await page.locator('#filters .checkbox :text("Pliers")').click();

  //bu şekilde de yazılabilior ,
  //Her .locator() çağrısı, bir önceki seçilen elementin çocukları arasında arama yapar.
  await page
    .locator("#filters")
    .locator(".checkbox")
    .locator(':text("Pliers")')
    .click();

  // CSS Selector + User Facing  --> locatorler zincirleme yapılabilir
  await page
    .locator("#filters")
    .locator(".checkbox")
    .getByText("Pliers")
    .click();

  // Xpath
  await page
    .locator(
      '//div[@id="filters"]//div[@class="checkbox"]//*[text()=" Pliers "]'
    )
    .click();

  await page
    .locator('//div[@id="filters"]')
    .locator('//div[@class="checkbox"]')
    .locator('//*[text()=" Pliers "]')
    .click();

  await page
    .locator('//div[@id="filters"]')
    .locator('//div[@class="checkbox"]')
    .getByText("Pliers")
    .click();
});

test("Child Locators - 2", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/#/");

  await page.getByPlaceholder("Search").fill("pliers");

  await page.getByRole("button", { name: "Search" }).click();

  //.col-md-9 altındaki a elementlerinin sayısını kontrol et
  await expect(page.locator(".col-md-9").locator("a")).toHaveCount(4);

  //toHaveCount() bu method ile kaç tane element olduğunu kontrol edebiliriz, yani bundan 1 tane var dedik
  await expect(
    page.locator(".col-md-9").locator("a").getByText("Out of stock")
  ).toHaveCount(1);
});

test("Child Locators - 3", async ({ page }) => {
  await page.goto("https://automationteststore.com/");

  await page
    .locator("#block_frame_bestsellers_1771")
    .getByTitle("Absolue Eye Precious Cells")
    .click();
});

test("Child Locators - 4", async ({ page }) => {
  await page.goto("https://www.kitapyurdu.com/");

  await page
    .locator(".box")
    .locator(".ribbon-container")
    .locator(':text("Çocuk Kitapları")')
    .click();
});
