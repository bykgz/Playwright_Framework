import { test, expect } from "@playwright/test";

test("tooltip", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/tooltips");
  //await page.goto("https://practice-automation.com/popups/");

  await page.getByRole("button", { name: "Tooltip on top" }).hover();
  const tooltipText = await page
    .getByRole("tooltip", { name: "Tooltip on top" })
    .textContent();

  expect(tooltipText).toEqual("Tooltip on top");
});
