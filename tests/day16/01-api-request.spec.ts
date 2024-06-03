import { test, expect } from "@playwright/test";

test("Get request - pet store", async ({ request }) => {
  //burda page yerine request kullanıyoruz , cünkü api request yapacagız

  //api ile veri çekme için kullanılır
  //request gönderilir respons alınır
  const response = await request.get("https://petstore.swagger.io/v2/pet/5");

  const responseData = await response.json(); //böyle yaparak responsun içerisindeki json verilerine ulaşabiliriz yani body kısmı almış oluruz
  //bununla headersi veya status code u test edemeyiz
  //içerisinde sadece body kısmı var

  const headers = response.headers(); //burada responsun içerisindeki headers bilgilerine ulaşabiliriz

  //respons body nasıl yazdırılır
  console.log(responseData);
  console.log(headers);

  //responsDatayı stringe çevirip yazdırmak için
  console.log(JSON.stringify(responseData, null, 2)); //buradaki null ve 2 parametreleri json formatında yazdırmak için kullanılır
  //null tüm özellikleri stringe dönüştürür, 2 ise 2 boşluk bırakarak yazdırır

  /*

1- Replacer Fonksiyonu: Eğer bir fonksiyon belirtirseniz, bu fonksiyon her bir özelliği dönüştürmeden önce çağrılır. Fonksiyon iki parametre alır: anahtar ve değer.
  Değerin nasıl dönüştürüleceğini belirlemek için bu fonksiyonun bir değer döndürmesi gerekir.

  console.log(JSON.stringify(responseData, (key, value) => {
  if (key === 'password') return undefined;
  return value;
}, 2));

Bu örnekte, replacer fonksiyonu password anahtarına sahip özellikleri dönüştürmez.


2- Dizi: Eğer bir dizi belirtirseniz, bu dizi dönüştürülecek özelliklerin anahtarlarını içerir.
console.log(JSON.stringify(responseData, ['id', 'name'], 2));

bu örnekte, yalnızca id ve name anahtarlarına sahip özellikler dönüştürülür. Diğer tüm özellikler dönüştürülmez.


Eğer null belirtirseniz, bu tüm özelliklerin dönüştürülmesi anlamına gelir.
  */

  //status code doğrulama nasıl yapılır ?
  expect(response.status()).toBe(200); //burada status code 200 olup olmadığını kontrol ediyoruz
  expect(response.ok).toBeTruthy(); //bu şekilde de kontrol edilebilir  --> burda "OK"  200 ile 299 arasında mı anlamında , arasında ise true döner
  expect(response.statusText()).toEqual("OK"); //status texti kontrol eder

  //property (özellik) kontrolü
  expect(responseData).toHaveProperty("id"); //burada responsun içerisinde id özelliği olup olmadığını kontrol ediyoruz
  expect(responseData).toHaveProperty("name"); //burada responsun içerisinde id özelliği olup olmadığını kontrol ediyoruz
  expect(responseData).toHaveProperty("status"); //burada responsun içerisinde id özelliği olup olmadığını kontrol ediyoruz

  //veri tipi doğrulaması
  expect(typeof responseData.id).toBe("number"); //burada responsun içerisindeki id nin number olup olmadığını kontrol ediyoruz
  expect(typeof responseData.category).toBe("object"); //burada responsun içerisindeki category nin tipinin object olup olmadığını kontrol ediyoruz
  expect(typeof responseData.photoUrls).toBe("object");
  expect(typeof responseData.name).toBe("string");
  expect(typeof responseData.tags[0].name).toBe("string");

  //veri içeriği kontrolü
  expect(responseData.id).toBe(5); //burada responsun içerisindeki id yi kontrol ediyoruz
  expect(responseData.name).toEqual("doggie");
  expect(responseData.category.id).toBe(0);
  expect(responseData.category.name).toEqual("string");
  expect(responseData.photoUrls[0]).toEqual("string");
  expect(responseData.tags[0].id).toBe(0);
  expect(responseData.tags[0].name).toEqual("string");
  expect(responseData.status).toEqual("string");

  //header kontrolü
  expect(headers).toHaveProperty("content-type"); //burada responsun içerisinde content-type özelliği olup olmadığını kontrol ediyoruz
  expect(headers["content-type"]).toContain("application/json");
  expect(headers["content-type"]).toEqual("application/json");

  //header içeriği kontrolü
  expect(headers["content-type"]).toEqual("application/json");
  expect(headers["server"]).toContain("Jetty"); //burada responsun içerisindeki server bilgisini kontrol ediyoruz
  expect(headers["date"]).toBeDefined(); //burada responsun içerisindeki date bilgisini kontrol ediyoruz --> undefined olmamalı
});

test("post request", async ({ request }) => {
  const payload = {
    id: 6161,
    category: {
      id: 0,
      name: "KÖPEK",
    },
    name: "pamuk",
    photoUrls: ["string"],
    tags: [
      {
        id: 0,
        name: "sibirya kurdu",
      },
    ],
    status: "satılık değil",
  };

  const response = await request.post("https://petstore.swagger.io/v2/pet", {
    data: payload,
  });

  const responseData = await response.json();

  //onsole.log(response);
  console.log(JSON.stringify(responseData, null, 2));
});
