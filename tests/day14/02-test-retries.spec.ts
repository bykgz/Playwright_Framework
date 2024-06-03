import { expect, test } from "@playwright/test";

test.describe("test suite ", () => {
  //test.only --> bu sadece bu testi calistirir
  //test.skip --> bu testi calistirmaz

  test.describe.configure({ retries: 2 }), //bu suitteki  fail olan testlerin 2 kez koşulmasını sağlar  ,  burası terminalden daha baskın
    test.describe.configure({ mode: "parallel" }), //bu suitteki testlerin paralel çalışmasını sağlar
    //terminalde --retries=3  eklentisi ile fail olan testler tekrar çalıştırılabilir
    test("tesy - 1", async ({ page }) => {
      await page.goto("https://practicesoftwaretesting.com/#/");
      await expect(page).toHaveTitle(
        "Practice Software Testing - Toolshop - v5.0"
      );
    });

  test("tesy - 2", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/");
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("tesy - 3", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/");
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });
});
