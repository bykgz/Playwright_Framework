import { test, expect } from "@playwright/test";
import postContactData from "../../data/postContact.json";
import putContactData from "../../data/putContact.json";
import patchContactData from "../../data/patchContact.json";
import { getToken } from "../../utils/auth-service";

test.describe("contact list - api test suit", () => {
  test.describe.configure({ mode: "serial" });

  let token;
  let contactId;

  //burda aldığımız tokenle tüm testlerde kullanabiliriz
  test.beforeAll(async ({}) => {
    token = await getToken(); //token i alır
  });

  test("add contact", async ({ request }) => {
    const response = await request.post(
      "https://thinking-tester-contact-list.herokuapp.com/contacts",
      {
        data: postContactData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responData = await response.json();

    contactId = responData._id;
    console.log(JSON.stringify(responData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(201); //200 ok , 201 created

    //veri eşitliği
    expect(responData.firstName).toEqual(postContactData.firstName);
    expect(responData.lastName).toEqual(postContactData.lastName);
    expect(responData.birthdate).toEqual(postContactData.birthdate);
    expect(responData.email).toEqual(postContactData.email);
    expect(responData.phone).toEqual(postContactData.phone);
    expect(responData.street1).toEqual(postContactData.street1);
    expect(responData.street2).toEqual(postContactData.street2);
    expect(responData.city).toEqual(postContactData.city);
    expect(responData.stateProvince).toEqual(postContactData.stateProvince);
    expect(responData.postalCode).toEqual(postContactData.postalCode);
    expect(responData.country).toEqual(postContactData.country);

    //property var mı yok mu
    expect(responData).toHaveProperty("_id");
    expect(responData).toHaveProperty("owner");
  });

  test("get contact", async ({ request }) => {
    const response = await request.get(
      `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responData = await response.json();
    console.log(JSON.stringify(responData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    //veri eşitliği
    expect(responData.firstName).toEqual(postContactData.firstName);
    // expect(responData._id).toEqual(contactId);
    expect(responData.lastName).toEqual(postContactData.lastName);
    expect(responData.birthdate).toEqual(postContactData.birthdate);
    expect(responData.email).toEqual(postContactData.email);
    expect(responData.phone).toEqual(postContactData.phone);
    expect(responData.street1).toEqual(postContactData.street1);
    expect(responData.street2).toEqual(postContactData.street2);
    expect(responData.city).toEqual(postContactData.city);
    expect(responData.stateProvince).toEqual(postContactData.stateProvince);
    expect(responData.postalCode).toEqual(postContactData.postalCode);
    expect(responData.country).toEqual(postContactData.country);

    //property var mı yok mu
    expect(responData).toHaveProperty("_id");
    expect(responData).toHaveProperty("owner");
  });

  test("get contact List ", async ({ request }) => {
    const response = await request.get(
      `https://thinking-tester-contact-list.herokuapp.com/contacts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responData = await response.json();
    // console.log(JSON.stringify(responData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    //veri tipinin doğrulaması
    expect(typeof responData).toBe("object");

    //expect(responData).toBeInstanceOf(Array);
    expect(Array.isArray(responData)).toBeTruthy(); //array olup olmadığı

    //property var mı yok mu
    expect(responData[0]).toHaveProperty("_id");
    expect(responData[0]).toHaveProperty("owner");

    //listte veri olup olmadığı
    expect(responData.length).toBeGreaterThan(0);
  });

  test("put update contact  ", async ({ request }) => {
    const response = await request.put(
      `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,

      {
        data: putContactData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responData = await response.json();

    // contactId = responData._id;
    console.log(JSON.stringify(responData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    //veri eşitliği
    expect(responData.firstName).toEqual(putContactData.firstName);
    expect(responData.lastName).toEqual(putContactData.lastName);
    expect(responData.birthdate).toEqual(putContactData.birthdate);
    expect(responData.email).toEqual(putContactData.email);
    expect(responData.phone).toEqual(putContactData.phone);
    expect(responData.street1).toEqual(putContactData.street1);
    expect(responData.street2).toEqual(putContactData.street2);
    expect(responData.city).toEqual(putContactData.city);
    expect(responData.stateProvince).toEqual(putContactData.stateProvince);
    expect(responData.postalCode).toEqual(putContactData.postalCode);
    expect(responData.country).toEqual(putContactData.country);

    //property var mı yok mu
    expect(responData).toHaveProperty("_id");
    expect(responData).toHaveProperty("owner");
  });

  test("patch (partial) update  contact ", async ({ request }) => {
    const response = await request.patch(
      `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,

      {
        data: patchContactData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responData = await response.json();

    // contactId = responData._id;
    console.log(JSON.stringify(responData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    //veri eşitliği
    expect(responData.firstName).toEqual(patchContactData.firstName);
    expect(responData.lastName).toEqual(patchContactData.lastName);
    expect(responData.birthdate).toEqual(putContactData.birthdate);
    expect(responData.email).toEqual(putContactData.email);
    expect(responData.phone).toEqual(putContactData.phone);
    expect(responData.street1).toEqual(putContactData.street1);
    expect(responData.street2).toEqual(putContactData.street2);
    expect(responData.city).toEqual(putContactData.city);
    expect(responData.stateProvince).toEqual(putContactData.stateProvince);
    expect(responData.postalCode).toEqual(putContactData.postalCode);
    expect(responData.country).toEqual(putContactData.country);

    //property var mı yok mu
    expect(responData).toHaveProperty("_id");
    expect(responData).toHaveProperty("owner");
  });

  test("delete contact ", async ({ request }) => {
    const response = await request.delete(
      `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responData = await response.text(); //responsu text olarak alırız , data json olarak gelmiyor text olarak geliyor
    //const responData = (await response.body()).toString(); //bu şekilde de responsu body i text olarak alırız

    const expectedData = "Contact deleted";

    //console.log(responData);

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    //respons body doğrulaması
    expect(responData).toEqual(expectedData);
  });

  /*
put request update işlemi yapar
aynı post request e benzer, body kullanırız


put ile patch arasındaki fark şu 
put ile tüm veriyi güncelleriz , yani tüm body eklenir post gibi , sadece içerisindekiler değiştirilir
patch ile sadece belirli bir alanı güncelleriz 

örnek : 
{
    "firstName": "mustafa",
    "lastName": "Doe",
}
sadece bu kısmı değiştirmek istersem  patch kullanırım

*/
});

/*

{
    "firstName": "mustafa",
    "lastName": "Doe",
    "birthdate": "1970-01-01",
    "email": "jdoe@fake.com",
    "phone": "8005555555",
    "street1": "1 Main St.",
    "street2": "Apartment A",
    "city": "Anytown",
    "stateProvince": "KS",
    "postalCode": "12345",
    "country": "USA"
}

*/

/*
JavaScript'te, object türünde birçok farklı değer bulunabilir. İşte bazı örnekler:

Plain Objects: Bu, en yaygın kullanılan nesne türüdür. Anahtar-değer çiftlerini içerirler.

let obj = { name: "John", age: 30 };
Arrays: Diziler, teknik olarak nesnelerdir ve bir dizi indeksi ile erişilebilen bir dizi değeri içerirler.
let arr = [1, 2, 3];
Functions: Fonksiyonlar da birer nesnedir ve çağrılabilir nesnelerdir.
function sayHello() {
  console.log("Hello, world!");
}
Date Objects: Tarih ve saat bilgilerini içerirler.
let date = new Date();
Regular Expressions: Düzenli ifadeler, bir dizi içindeki belirli bir deseni aramak için kullanılır.
let regex = /ab+c/;
Error Objects: Hata durumlarını temsil eder.
let error = new Error("Something went wrong");
Built-in Objects: JavaScript'in yerleşik nesneleri, örneğin Math, String, Number, Boolean ve daha fazlası.

Bu türlerin hepsi, typeof operatörü ile kontrol edildiğinde "object" sonucunu verir (fonksiyonlar hariç, onlar için typeof "function" sonucunu verir). 
Ancak, bu türlerin her biri farklı özelliklere ve yöntemlere sahiptir ve genellikle farklı şekillerde kullanılırlar.
*/
