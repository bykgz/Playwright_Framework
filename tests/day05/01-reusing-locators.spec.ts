import { expect, test } from "@playwright/test";

test("Reusing Locators", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");

  //open window buttonun locator'ını bir değişken içerisine tanımladık
  const openWindowButton = page.getByRole("button", { name: "Open Window" });

  //textContent() --> elementin içerisindeki yazıyı almak için kullanılır
  //burda textContent() promise döndürdüğü için await kullandık
  const buttonText = await page
    .getByRole("button", { name: "Open Window" })
    .textContent();

  await expect(openWindowButton).toBeVisible();
  await expect(openWindowButton).toHaveText("Open Window");

  //buraya await yazmalıyız çünkü click fonksiyonu bir promise döndürür
  //!!!!!!  promis dönen fonksiyonlar await ile kullanılmalıdır  , await i buna göre kullanacağız !!!!!!!!!!!!!!!
  await openWindowButton.click();
});
