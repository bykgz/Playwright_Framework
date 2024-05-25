import { test, expect } from "@playwright/test";
test("Parent Locators - 1", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/#/");

  //şunu demiş olduk : checkbox class'ına sahip elementler
  //arasından texti "Power Tools" olanları seç ve bu elementlerin içindeki input elementlerinin sayısı 5 olmalı
  await expect(
    page
      .locator(".checkbox")
      .filter({ hasText: "Power Tools" })
      .locator("input")
  ).toHaveCount(5);
});

test("Parent Locators - 2", async ({ page }) => {
  await page.goto("https://www.kitapyurdu.com/");

  //şunu demiş olduk : box class'ına sahip elementler arasından texti "En Çok Satılanlar" olanları seç ve bu elementlerin
  //içindeki bestseller-item class'ına sahip elementlerin sayısı 10 olmalı
  await expect(
    page
      .locator(".box")
      .filter({ hasText: "En Çok Satılanlar" })
      .locator(".bestseller-item")
  ).toHaveCount(10);
});

// Örneğin, aşağıdaki kodda .filter() metodu, sayfadaki tüm div elementlerini seçer ve bunlar arasından sadece class özelliği "active" olanları döndürür:
//await page.locator('div').filter({ has: '.active' });

/*
const childElement = await page.locator('.child').elementHandle();
const parentElement = await childElement.parentElement();


Bu kod, .child class'ına sahip bir elementi (childElement) seçer ve ardından bu elementin parent elementine (parentElement) ulaşır.
/*



/*
const childElement = await page.locator('.child').elementHandle();
: Bu satır, sayfada .child class'ına sahip bir elementi seçer ve bu elementin bir ElementHandle nesnesini oluşturur. 
ElementHandle nesnesi, bir DOM elementine programatik erişim sağlar ve bu element üzerinde çeşitli işlemler yapmamızı sağlar (örneğin, elementi tıklamak, elementin metnini almak, vb.).

const parentElement = await childElement.parentElement();
: Bu satır, bir önceki satırda seçilen elementin parent elementini bulur ve bu elementin bir ElementHandle nesnesini oluşturur.
Bu ElementHandle nesnesi, parent element üzerinde çeşitli işlemler yapmamızı sağlar.
 */
