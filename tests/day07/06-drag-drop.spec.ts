import { test, expect } from "@playwright/test";

test("drag and drop", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");
  await page.goto("https://practice.expandtesting.com/drag-and-drop");

  const a = page.locator("#column-a");
  const b = page.locator("#column-b");

  await a.dragTo(b);

  /*
  //belirli bir konuma sürüklemek için
  await a.dragTo(b, {
    sourcePosition: { x: 34, y: 7 },
    targetPosition: { x: 10, y: 20 },
  });

  */
});

test("drag and drop - 2 ", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");
  //await page.goto("https://practice.expandtesting.com/drag-and-drop");
  await page.goto(
    "https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager"
  );

  const resim1 = page
    .frameLocator("[class='demo-frame lazyloaded']")
    .getByAltText("The peaks of High Tatras");

  const trash = page
    .frameLocator("[class='demo-frame lazyloaded']")
    .locator("#trash");

  await resim1.dragTo(trash);
});

test("drag and drop - 3 - mouse ", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");
  //await page.goto("https://practice.expandtesting.com/drag-and-drop");
  await page.goto(
    "https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager"
  );

  const resim1 = page
    .frameLocator("[class='demo-frame lazyloaded']")
    .getByAltText("The peaks of High Tatras");

  const trash = page
    .frameLocator("[class='demo-frame lazyloaded']")
    .locator("#trash");

  await resim1.hover(); //mouse'u resmin üzerine getirir
  await page.mouse.down(); //mouse'un soltyuşuna basılı tutar
  await trash.hover(); //mouse'u trash üzerine getirir
  await page.mouse.up(); //mouse'un soltuşunu bırakır
});

test("drag and drop - 4 ", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  //await page.goto("https://practice-automation.com/popups/");
  await page.goto("https://practice.expandtesting.com/drag-and-drop");

  const a = page.locator("#column-a");
  const b = page.locator("#column-b");

  //dragAndDrop(b) 2 parametre ile çalışır, kaynak (taşıanacak element locati) ve hedef (elemenetin taşınacağı yerin locati)

  // await page.dragAndDrop('#source', '#target', {
  //   sourcePosition: { x: 34, y: 7 },
  //   targetPosition: { x: 10, y: 20 },
  // });

  await page.dragAndDrop("#column-a", "#column-b");
});

/*
  //await page.geByText("Practice Page").click({position: {x: 10, y: 10}}); //bu şekilde de istediğimiz kordinata tıklayabiliriz
  //await page.geByText("Practice Page").click({force: true}); //bu şekilde de force ile tıklama yapabiliriz

.click({force: true}) ifadesi, bulunan elemente tıklar. {force: true} seçeneği, elementin görünür olmasa bile tıklanmasını sağlar. 
Bu, sayfa yüklenirken veya belirli bir durumda elementin görünmez olduğu durumlarda kullanışlı olabilir.

  //await page.geByText("Practice Page").click({timeout: 1000}); //bu şekilde de timeout süresini ayarlayabiliriz
  //await page.geByText("Practice Page").click({noWaitAfter: true}); //bu şekilde de tıkladıktan sonra bekleme yapmaz
  //await page.geByText("Practice Page").click({delay: 1000}); //bu şekilde de tıklamadan önce bekler
  //await page.geByText("Practice Page").click({clickCount: 2}); //bu şekilde de iki kere tıklar
  //await page.geByText("Practice Page").click({button: "right"}); //bu şekilde de sağ tıklar
  //await page.geByText("Practice Page").click({clickCount: 2, button: "right"}); //bu şekilde de sağ tıklar ve iki kere tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Shift"]}); //bu şekilde de shift tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Control"]}); //bu şekilde de control tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Alt"]}); //bu şekilde de alt tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Meta"]}); //bu şekilde de meta tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Shift", "Control"]}); //bu şekilde de shift ve control tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Shift", "Alt"]}); //bu şekilde de shift ve alt tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Shift", "Meta"]}); //bu şekilde de shift ve meta tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Control", "Alt"]}); //bu şekilde de control ve alt tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Control", "Meta"]}); //bu şekilde de control ve meta tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Alt", "Meta"]}); //bu şekilde de alt ve meta tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Shift", "Control", "Alt"]}); //bu şekilde de shift, control ve alt tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Shift", "Control", "Meta"]}); //bu şekilde de shift, control ve meta tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Shift", "Alt", "Meta"]}); //bu şekilde de shift, alt ve meta tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Control", "Alt", "Meta"]}); //bu şekilde de control, alt ve meta tuşu ile tıklar
  //await page.geByText("Practice Page").click({modifiers: ["Shift", "Control", "Alt", "Meta"]}); //bu şekilde de shift, control, alt ve meta tuşu ile tıklar
*/
