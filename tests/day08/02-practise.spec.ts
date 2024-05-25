import { test, expect } from "@playwright/test";

test("practise", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/#/");

  //1-url doğrula
  await expect(page).toHaveURL("https://practicesoftwaretesting.com/#/");

  //2-title doğrula
  await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

  //3 - arama motorunda "hammer" kelimesini arat
  const search = page.getByPlaceholder("Search");
  await expect(search).toBeEnabled();
  await search.fill("Hammer");

  const searchButton = page.getByRole("button", { name: "Search" });
  await expect(searchButton).toBeVisible();
  await expect(searchButton).toBeEnabled();
  await searchButton.click();

  //4 - "Searched for " başlığının görüntülendiğini doğrula
  await expect(page.getByText("Searched for: ")).toBeVisible();

  //5- ürün listesindeki ürünlerin adedini doğrula
  const productList = page.locator("div.container > a.card");
  await expect(productList).toHaveCount(7);

  //6- ürünlerden ilkine tıkla

  const productName1 = await productList
    .first()
    .getByRole("heading")
    .textContent();

  expect(productName1).toContain("Claw Hammer with Shock Reduction Grip");

  await productList.first().click();
  //nth()

  //7 - ürün sayfası doğrulamalarını yap
  await expect(page).toHaveURL(
    "https://practicesoftwaretesting.com/#/product/01HXMQ9D7MP2JKAYX071BTSBVW"
  );

  //8 - ürün adını doğrula
  const productName2 = await page.locator(".col-md-6 > h1").textContent();
  expect(productName1).toContain(productName2);
});
