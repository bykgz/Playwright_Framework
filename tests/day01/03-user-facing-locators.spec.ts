import { expect, test } from "@playwright/test";

test("user facing locators", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");

  //getByRole() --> Bir öğenin başlık, buton ya da checkbox gibi rolleri ile locate alma şeklidir.
  await page.getByRole("textbox", { name: "Search" }).fill("Pliers");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("heading", { name: "Combination Pliers" }).click();

  //incele deyip "accessibility" kısmından role ve name bilgilerini alabiliriz

  //getByText() --> genellikle etkileşimli olmayan elementlerde kullanılması önerilir, sayfadaki tıklanmayan yazılar vs
  await page.getByText("Contact").click();

  //await page.getByText('Welcome, John', { exact: true });  --> tam eşleşme yapmasını istedğimiz zaman, default olarak false  yani şu demek "Welcome, John" içerecek kesinlikle
  //await page.getByText(/welcome, [A-Za-z]+$/i); //regex ile de kullanılabilir , welcome dan sonra büyük ya da küçük harfle başlayan bir kelime olacak demiş oluruz

  //getByLabel() --> genellikle form elementlerinde kullanılır
  await page.getByLabel("First name").fill("Ayşe");

  //getByPlaceholder() --> placeholder metinleri olan form elementlerini bulurken kullanılır
  await page.getByPlaceholder("Your last name").fill("Yilmaz");

  //getByTestId() --> test id'si olan elementleri bulmak için kullanılır
  //developerlar tarafından eklenen test id'lerini kullanarak locate işlemi yapar , data-testid="login-button" gibi , bunlar genellikle testerlar için eklenir
  //playwright'ta default olarak data-testid kullanılır , ama bunu değiştirebiliriz ,
  //bunun için playwright.config.ts dosyasına gidip defineConfig içine testIdAttribute: "data-test" ekleyebiliriz
  await page.getByTestId("email").fill("ayse@yilmaz.com");

  //getByTitle() --> title attribute'ü olan elementleri locate etmek için kullanılır
  await page.getByTitle("Practice Software Testing - Toolshop").click();

  //getByAltText() --> alt text'i olan elementleri locate etmek için kullanılır  --> alt attributesi alternatif text anlamına gelir resim yüklenmezse görünecek yazı ,
  // bu genellikle img veya area elementlerinde kullanılır
  await expect(page.getByAltText("Banner")).toBeVisible();
});
