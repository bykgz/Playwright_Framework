import { test, expect } from "@playwright/test";

test("iframe", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");

  const titlePage = await page.locator("h1").textContent();

  console.log(titlePage); //Practice Page

  //iframe içine girebilmek için --> frameLocator() methodunu kullanırız. bu şekilde
  //sayfadaki iframin locatini alırız , ve bu locatere göre işlem yapabiliriz.
  //eğer sadece bir iframe varsa, bu şekilde işlem yapabiliriz.
  const frame = page.frameLocator("iframe");
  const titleFrame = await frame.locator("h1").textContent();

  console.log(titleFrame); //All Courses

  expect(titleFrame).toEqual("All Courses");
});
