import { test, expect } from "@playwright/test";

test("web tables - 1 ", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/form-fields/");
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");
  //await page.goto("https://practice.expandtesting.com/drag-and-drop");
  // await page.goto(
  //   "https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager"
  // );

  await page.goto("https://letcode.in/table");

  const rowApple = page.getByRole("row", { name: "Apple" }); //name i apple olan "satırı" almış olduk

  const targetColumn = await rowApple
    .getByRole("cell", { name: "180" })
    .textContent(); //name i price olan "hücreyi" almış olduk

  expect(targetColumn).toEqual("180");
  console.log(targetColumn);
});

test("web tables - 2 ", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/form-fields/");
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");
  //await page.goto("https://practice.expandtesting.com/drag-and-drop");
  // await page.goto(
  //   "https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager"
  // );

  await page.goto("https://letcode.in/table");

  const sourceRow = page.getByRole("row", { name: "man@letcode.in" });
  const targetCheckbox = sourceRow.getByRole("checkbox");
  await targetCheckbox.check();
});

test("web tables - 3 ", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/form-fields/");
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");
  //await page.goto("https://practice.expandtesting.com/drag-and-drop");
  // await page.goto(
  //   "https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager"
  // );

  await page.goto("https://letcode.in/table");

  const sourceRow = page
    .getByRole("row", { name: "16" })
    .filter({ has: page.getByRole("cell", { name: "Gingerbread" }) });
  //.filter({ hasText: "Gingerbread" });
  //hasNot
  //hasNotText

  const targetColumn = sourceRow.getByRole("cell", { name: "60" });
  //const targetColumn = sourceRow.locator("td").nth(5);

  await expect(targetColumn).toHaveText("60");
  console.log(await sourceRow.count());
});

test("web tables - 4 ", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/form-fields/");
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");
  //await page.goto("https://practice.expandtesting.com/drag-and-drop");
  // await page.goto(
  //   "https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager"
  // );

  await page.goto("https://letcode.in/advancedtable");

  const searchInput = page.getByLabel("Search:");

  const universities = ["American", "Wales", "Khan"]; //bu üniversite isimleri tabloda olması gerekiyor

  for (let university of universities) {
    await searchInput.fill(university);

    const rows = page.locator("table tbody > tr");

    for (let row of await rows.all()) {
      const uniName = await row.locator("td").nth(1).textContent(); //tablodaki 1. sütunu al (university name)
      expect(uniName).toContain(university);
    }
  }
});

//******* getByRole de seçenekelerin çıkması için control + space yapılır
