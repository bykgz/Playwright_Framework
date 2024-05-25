import { expect, test } from "@playwright/test";
test("extracting values", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");

  //Test value

  /*
  //bu şekilde yaparsam bu openWindowButton bir String olacağı için click yapamam
  const openWindowButton = await page
    .getByRole("button", { name: "Open Window" })
    .textContent();

  */
  const openWindowButton = page.getByRole("button", { name: "Open Window" });
  const openWindowButtonText = await openWindowButton.textContent();

  //eğer biz buraya bir locator eklersek bu auto-retrying assertion olur
  //ve otomatik olarak tekrar dener

  //bu expectin içerisine biz bir string değeri ekledik
  //bu yüzden bu non-retrying assertion (generic) olduğu için otomatik olarak tekrar denemez,
  //bekleme yapmaz , yani eğer bu "openWindowButtonText" null gelirse veya başka birşey olursa hata alırız test fail olur
  //burda string ile string karşılaştırması yapıyoruz
  expect(openWindowButtonText).toEqual("Open Window");

  /*
  placeholder value ları textContent() ile alınamaz
  textContent() metodu bir elementin görünür metnini alır, 
  ancak bir input elementinin placeholder değeri görünür metin olarak kabul edilmez.
  Placeholder değerini almak için placeholder özelliğini kullanmalısınız.
  Örneğin, bir input elementinin referansını inputElement olarak aldığınızı varsayarsak,
  placeholder değerini aşağıdaki gibi alabilirsiniz:
  
  const placeholderValue = await inputElement.getAttribute('placeholder');
  
  Bu kod, inputElement'in placeholder özelliğini alır 
  ve bu değeri placeholderValue değişkenine atar.
  
  */

  //input değeri almak için
  const inputField = page.getByPlaceholder("Enter Your Name");
  await inputField.fill("Mustafa");

  const inputFieldValue = await inputField.inputValue(); //inputValue() metodu input elementinin değerini alır
  expect(inputFieldValue).toEqual("Mustafa");

  //attribute value almak için --> elementlerin atttribute değerlerini almak
  //getAttribute("name") --> name attribute değerini alır , bu method bizden attribute adı ister değerini verir
  const inputFieldNameAttributeValue = await inputField.getAttribute("name");
  expect(inputFieldNameAttributeValue).toEqual("enter-name");
});
