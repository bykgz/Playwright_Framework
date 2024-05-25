import { expect, test } from "@playwright/test";

test("difference-between-assertion-types - 1", async ({ page }) => {
  await page.goto("https://demoqa.com/dynamic-properties");

  const buttonLocator = page.locator("#colorChange");

  //auto-retriyng assertion  --> burada tekrar tekrar dener ve bekler
  await expect(buttonLocator).toHaveClass("mt-4 text-danger btn btn-primary");

  //eğer istersek bu şekilde timout süresini değiştirebiliriz
  /* xpect fonksiyonunun varsayılan bekleme süresi 30 saniyedir. 
  Ancak, expect fonksiyonunu kullanırken bir timeout seçeneği belirtirseniz,
    bu süre yerine belirttiğiniz süre kullanılır.
Örneğin, aşağıdaki kodda expect fonksiyonu, buttonLocator'ın "mt-4 text-danger btn btn-primary" 
sınıflarına sahip olmasını 10 saniye boyunca bekler:
*/
  await expect(buttonLocator).toHaveClass("mt-4 text-danger btn btn-primary", {
    timeout: 10000,
  });

  //non-retriying assertion
  const buttonClassValue = await buttonLocator.getAttribute("class"); //"mt-4 btn btn-primary"  bu değeri alıyor
  //burda bekleme yapmadan direk assertion yapılıyor haliyle
  expect(buttonClassValue).toEqual("mt-4 text-danger btn btn-primary"); //burda fail almamız gerekiyor
  /*
Error: expect(received).toEqual(expected) // deep equality

Expected: "mt-4 text-danger btn btn-primary"
Received: "mt-4 btn btn-primary"
*/
});

/*

Error: expect.toHaveValue: Error: Not an input element Call log:

expect.toHaveValue with timeout 30000ms
waiting for locator('#colorChange') bu hata nedir

bu hatanın sebebi, toHaveValue assertion'ı sadece input elementler için çalışır.


Kodunuzda #colorChange id'sine sahip bir element üzerinde expect().toHaveValue() metodunu kullanıyorsunuz. 
Eğer bu element bir input elementi değilse, bu hata meydana gelir.

Bu durumu düzeltmek için, expect().toHaveValue() metodunu bir input elementi üzerinde kullanmalısınız. 
Eğer #colorChange id'sine sahip element bir buton veya başka bir türde bir element ise ve
bu elementin class özelliğini kontrol etmek istiyorsanız, expect().toHaveClass() metodunu kullanabilirsiniz:
*/

test("difference-between-assertion-types - 2", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/dynamic_controls");

  const buttonLocator = page.locator("#checkbox-example").getByRole("button");
  await buttonLocator.click();

  /*
  //non-retriying assertion (generic assertion)
  const buttonText = await buttonLocator.innerText();
  expect(buttonText).toEqual("Add"); //FAİL ALIRIZ
*/
  //auto-retriyng assertion (locator assertion)

  await expect(buttonLocator).toHaveText("Add"); //PASS
});
