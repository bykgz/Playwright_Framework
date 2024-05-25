import { test } from "@playwright/test";

//temel test blogu
test("ilk test", async ({ page }) => {
  //javascript asenkron çalışan bir dil , yazdığımız kodları sırasıyla çalıştırmaz
  await page.goto("https://practicesoftwaretesting.com/"); //buradaki await sayesinde bu satırın çalışması bitmeden bir sonraki satıra geçmez,
  //yani bu adımı bekle demiş oluyoruz
  await page.getByText("Sign in").click();
  await page.getByText("Register your account").click();

  //promise yapısı nedir?
  //promise yapısı javascriptte asenkron çalışan bir yapıdır ve bir işlemi yaparken sonucunu beklememize gerek kalmaz ve işlem bittiğinde sonucu bize döner
  //promise yapısı 3 durumda olabilir
  //1- pending : işlem devam ediyor
  //2- fulfilled : işlem başarılı bir şekilde tamamlandı
  //3- rejected : işlem başarısız bir şekilde tamamlandı

  //işlem başarlı olduğunda pozitif bir sonuç döner
  //işlem başarısız olduğunda negatif bir sonuç döner hata mesajı döndürür , biraz true false benzeri bir yapıdır

  //bir promis bir işlemin başarılı veya başarısız sonucunu döndürür ve bu sonuçları işleyip asenkron işlemleri yönetebilir
  //gerekli beklemeleri de yaparak senkronize bir şekilde adımlarımızı koşabilir
});

test("ikinci test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
});

test("ucuncu test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
});

//test suite ile testleri gruplayabiliriz
//suit dediğimiz nedir mesela aynı kategoriye sahip testlerimiz vardır login işlemlerini yapacağımız testler vs
//bir tane login suiti oluşturup bütün testeri onun altında yapabiliriz

test.describe("test suit 1", () => {
  test("ilk test", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.getByText("Sign in").click();
    await page.getByText("Register your account").click();
  });

  test("ikinci test", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });
});

test.describe("test suit 2", () => {
  test("ilk test", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.getByText("Sign in").click();
    await page.getByText("Register your account").click();
  });

  test("ikinci test", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });
});

//beforeAll fonksiyonu testler başlamadan önce bir kere çalışır, dikkat her testten önce değil testler başlamadan önce çalışır , her suit için bir kere çalışır
//mesela tüm testerde kullanacağımız data düzenlemesi varsa burada çağırabiliriz, fake datalarımızı burda bir defa oluşturmamız yeterli olacaktır
test.beforeAll(async ({ page }) => {});

//afterAll fonksiyonu testler bittikten sonra bir kere çalışır , dikkat her testten sonra değil tüm testler bittikten sonra çalışır ,her suit için bir kere çalışır
//genellikle browserı kapatmak için kullanılır , genellikle çok kullanılmaz
test.afterAll(async ({ page }) => {});

//her test metodundan önce 1 kez çalışır
test.beforeEach(async ({ page }) => {});

//her test metodundan sonra 1 kez çalışır
test.afterEach(async ({ page }) => {});
