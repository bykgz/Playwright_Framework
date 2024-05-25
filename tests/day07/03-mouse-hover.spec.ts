import { test, expect } from "@playwright/test";

test("mouse hover", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");

  await page.getByRole("button", { name: "Mouse Hover" }).hover();
  await page.getByRole("link").getByText("Reload").click();
});
