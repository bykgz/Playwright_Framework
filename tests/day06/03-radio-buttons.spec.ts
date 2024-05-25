import { expect, test } from "@playwright/test";

test("radio-buttons", async ({ page }) => {
  await page.goto("https://practice-automation.com/form-fields/");

  const radioButtonRed = page.getByRole("radio", { name: "Red" });
  const radioButtonBlue = page.getByRole("radio", { name: "Blue" });

  await radioButtonRed.check(); //click() de kullanılabilir

  //generic asserrtion
  const radioRedStatus = await radioButtonRed.isChecked(); //true
  const radioBlueStatus = await radioButtonBlue.isChecked(); //false

  //aynı grutaki radio butonlarından biri seçildiğinde diğeri seçilmemiş olmalı , sadece birini seçebiliyoruz
  //name attribute değerleri aynı olan radio butonları aynı grupta oluyorlar

  expect(radioRedStatus).toBeTruthy();
  expect(radioBlueStatus).toBeFalsy();

  //locator assertion
  await expect(radioButtonRed).toBeChecked();
  await expect(radioButtonBlue).not.toBeChecked();
});
