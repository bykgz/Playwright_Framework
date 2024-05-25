import { test, expect } from "@playwright/test";

test("single select - dropdown - menu", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  await page.goto("https://practice-automation.com/form-fields/");

  const siblingMenu = page.locator("#siblings");
  const siblingOptions = page.locator("#siblings").locator("option");
  const optionText = await siblingOptions.allTextContents();

  console.log(optionText);

  //menüdeki bir seçeneği seçme
  await siblingMenu.selectOption({ index: 1 }); //index ile
  await siblingMenu.selectOption({ value: "no" }); //value ile
  await siblingMenu.selectOption({ label: "Yes" }); //label ile

  //menüdeki seçeneklerin adedini doğrulama
  await expect(siblingOptions).toHaveCount(4);

  //seçili olan seçeneğin değerini doğrulama
  await expect(siblingMenu).toHaveValue("yes");

  //menüde beklenen seçeneklerin olup olmadığını doğrulama
  expect(optionText).toEqual(["", "Yes", "No", "Maybe"]);

  expect(optionText).toContain("Yes");
  expect(optionText).toContain("Yes" && "No");

  await expect(siblingOptions).toContainText(["Yes"]);
  await expect(siblingOptions).toContainText(["Yes", "No"]);
});

//multiple seçim yapılabilen dropdown menülerde "multiple" diye bir attribute bulunur.
test("multiple select dropdown menu", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");

  //çoklu seçim yapma
  const multipleMenu = page.locator("#multiple-select-example");
  await multipleMenu.selectOption(["Apple", "Orange", "Peach"]);

  //menünün sayfada görünür olup olmadığını doğrulama
  await expect(multipleMenu).toBeVisible();

  //menüden bir seçimin yapılabilirliğinin doğrulaması
  await expect(multipleMenu).toBeEnabled();
});
