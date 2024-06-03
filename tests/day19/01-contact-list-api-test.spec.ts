import { test, expect } from "@playwright/test";
import postContactData from "../../data/postContact.json";
import putContactData from "../../data/putContact.json";
import patchContactData from "../../data/patchContact.json";
import { getToken } from "../../utils/auth-service";
import { makeRequest, validateContact } from "../../utils/api-utils";

test.describe("contact list - api test suit", () => {
  test.describe.configure({ mode: "serial" });

  let token;
  let contactId;
  let baseUrl = "https://thinking-tester-contact-list.herokuapp.com/contacts/";

  //burda aldığımız tokenle tüm testlerde kullanabiliriz
  test.beforeAll(async ({}) => {
    token = await getToken(); //token i alır
  });

  test("add contact", async ({ request }) => {
    //tek method ile tüm requestleri yapabiliriz
    const response = await makeRequest(
      request,
      "post",
      baseUrl,
      postContactData,
      token
    );

    // const response = await request.post(          -----> makeRequest()  adında buranın metodunu utils/api-utils.ts de yaptık
    //   "https://thinking-tester-contact-list.herokuapp.com/contacts",
    //   {
    //     data: postContactData,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    const responsData = await response.json();

    contactId = responsData._id;
    console.log(JSON.stringify(responsData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(201); //200 ok , 201 created

    //veri eşitliğinin doğrulaması   ---> bu şekilde for kullanarak kodumuzu daha sade hale getirebiliriz  --->  bunun da metodunu yaptık utils/api-utils.ts de
    // for (const property in postContactData) {
    //   expect(responsData[property]).toEqual(postContactData[property]);
    // }

    // // expect(responsData.firstName).toEqual(postContactData.firstName);
    // // expect(responsData.lastName).toEqual(postContactData.lastName);
    // // expect(responsData.birthdate).toEqual(postContactData.birthdate);
    // // expect(responsData.email).toEqual(postContactData.email);
    // // expect(responsData.phone).toEqual(postContactData.phone);
    // // expect(responsData.street1).toEqual(postContactData.street1);
    // // expect(responsData.street2).toEqual(postContactData.street2);
    // // expect(responsData.city).toEqual(postContactData.city);
    // // expect(responsData.stateProvince).toEqual(postContactData.stateProvince);
    // // expect(responsData.postalCode).toEqual(postContactData.postalCode);
    // // expect(responsData.country).toEqual(postContactData.country);

    // //property var mı yok mu
    // expect(responsData).toHaveProperty("_id");
    // expect(responsData).toHaveProperty("owner");

    //veri eşitliğinin doğrulaması
    validateContact(responsData, postContactData); //bu method sayesinde yukarıdaki for döngüsünü kullanmamıza gerek kalmadı kodumuzu daha da sadeleştirdik
  });

  test("get contact", async ({ request }) => {
    //tek method ile tüm requestleri yapabiliriz
    const response = await makeRequest(
      request,
      "get",
      `${baseUrl}${contactId}`,
      "",
      token
    );

    /*
bazı HTTP istemcileri, data parametresi olarak null değerini kabul etmez 
ve bunun yerine bir nesne veya string bekler. Bu durumda, null yerine boş bir string ("") kullanmak  veya boş nesne ,{}  kullanmak.
HTTP istemcisine data parametresi olarak geçerli bir değer sağlar ve bu nedenle hata vermez.

    */

    // const response = await request.get(
    //   `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    const responsData = await response.json();
    console.log(JSON.stringify(responsData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    // //veri eşitliği
    // expect(responsData.firstName).toEqual(postContactData.firstName);
    // // expect(responsData._id).toEqual(contactId);
    // expect(responsData.lastName).toEqual(postContactData.lastName);
    // expect(responsData.birthdate).toEqual(postContactData.birthdate);
    // expect(responsData.email).toEqual(postContactData.email);
    // expect(responsData.phone).toEqual(postContactData.phone);
    // expect(responsData.street1).toEqual(postContactData.street1);
    // expect(responsData.street2).toEqual(postContactData.street2);
    // expect(responsData.city).toEqual(postContactData.city);
    // expect(responsData.stateProvince).toEqual(postContactData.stateProvince);
    // expect(responsData.postalCode).toEqual(postContactData.postalCode);
    // expect(responsData.country).toEqual(postContactData.country);

    // //property var mı yok mu
    // expect(responsData).toHaveProperty("_id");
    // expect(responsData).toHaveProperty("owner");

    //veri eşitliğinin doğrulaması
    validateContact(responsData, postContactData);
  });

  test("get contact List ", async ({ request }) => {
    //tek method ile tüm requestleri yapabiliriz
    const response = await makeRequest(request, "get", `${baseUrl}`, "", token);

    // const response = await request.get(
    //   `https://thinking-tester-contact-list.herokuapp.com/contacts`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    const responsData = await response.json();
    // console.log(JSON.stringify(responsData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    //veri tipinin doğrulaması
    //expect(typeof responsData).toBe("object");  //object olup olmadığı objenin içinde herşey var string , number , array  vs

    //expect(responsData).toBeInstanceOf(Array);
    expect(Array.isArray(responsData)).toBeTruthy(); //array olup olmadığı  --> bu daha iyi genel değil sadece array olup olmadığını kontrol eder

    //property var mı yok mu
    expect(responsData[0]).toHaveProperty("_id");
    expect(responsData[0]).toHaveProperty("owner");

    //listte veri olup olmadığı
    expect(responsData.length).toBeGreaterThan(0);
  });

  test("put update contact  ", async ({ request }) => {
    //tek method ile tüm requestleri yapabiliriz
    const response = await makeRequest(
      request,
      "put",
      `${baseUrl}${contactId}`,
      putContactData,
      token
    );

    // const response = await request.put(
    //   `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,

    //   {
    //     data: putContactData,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    const responsData = await response.json();

    // contactId = responsData._id;
    console.log(JSON.stringify(responsData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    // //veri eşitliği
    // expect(responsData.firstName).toEqual(putContactData.firstName);
    // expect(responsData.lastName).toEqual(putContactData.lastName);
    // expect(responsData.birthdate).toEqual(putContactData.birthdate);
    // expect(responsData.email).toEqual(putContactData.email);
    // expect(responsData.phone).toEqual(putContactData.phone);
    // expect(responsData.street1).toEqual(putContactData.street1);
    // expect(responsData.street2).toEqual(putContactData.street2);
    // expect(responsData.city).toEqual(putContactData.city);
    // expect(responsData.stateProvince).toEqual(putContactData.stateProvince);
    // expect(responsData.postalCode).toEqual(putContactData.postalCode);
    // expect(responsData.country).toEqual(putContactData.country);

    // //property var mı yok mu
    // expect(responsData).toHaveProperty("_id");
    // expect(responsData).toHaveProperty("owner");

    //veri eşitliğinin doğrulaması
    validateContact(responsData, putContactData);
  });

  test("patch (partial) update  contact ", async ({ request }) => {
    //tek method ile tüm requestleri yapabiliriz
    const response = await makeRequest(
      request,
      "patch",
      `${baseUrl}${contactId}`,
      patchContactData,
      token
    );

    // const response = await request.patch(
    //   `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,

    //   {
    //     data: patchContactData,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    const responsData = await response.json();

    // contactId = responsData._id;
    console.log(JSON.stringify(responsData, null, 2));

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    //veri eşitliği
    // expect(responsData.firstName).toEqual(patchContactData.firstName);
    // expect(responsData.lastName).toEqual(patchContactData.lastName);
    // expect(responsData.birthdate).toEqual(putContactData.birthdate);
    // expect(responsData.email).toEqual(putContactData.email);
    // expect(responsData.phone).toEqual(putContactData.phone);
    // expect(responsData.street1).toEqual(putContactData.street1);
    // expect(responsData.street2).toEqual(putContactData.street2);
    // expect(responsData.city).toEqual(putContactData.city);
    // expect(responsData.stateProvince).toEqual(putContactData.stateProvince);
    // expect(responsData.postalCode).toEqual(putContactData.postalCode);
    // expect(responsData.country).toEqual(putContactData.country);

    // //property var mı yok mu
    // expect(responsData).toHaveProperty("_id");
    // expect(responsData).toHaveProperty("owner");

    //veri eşitliğinin doğrulaması
    validateContact(responsData, { ...putContactData, ...patchContactData }); //spread operator kullandık

    /*
    JavaScript'te, bir nesneyi bir string ile birleştirmeye çalıştığınızda, 
    nesne "[object Object]" olarak dönüştürülür. 
    Bu nedenle, nesnenin içeriğini görmek için JSON.stringify fonksiyonunu kullanabilirsiniz.
    Bu fonksiyon, bir JavaScript nesnesini bir JSON stringine dönüştürür.

Aşağıdaki kod parçası, putContactData ve patchContactData nesnelerini birleştirir ve sonucu bir JSON stringi olarak konsola yazdırır:
    */

    console.log(
      "sepread operator deneme :" +
        JSON.stringify({ ...putContactData, ...patchContactData }, null, 2) //sağdakini alır solundaki üzerine ekler
    ); //concolda yazacak olan şu şekilde

    /*
sepread operator deneme :{            ====>    "firstName": "mustafa",     ---->bu kısımlar putContactData dan gelir
                                                "lastName": "bykgz",
  "firstName": "mustafa",
  "lastName": "bykgz",
  "birthdate": "1995-01-01",
  "email": "zeynep@fake.com",
  "phone": "8005555555",
  "street1": "1 Main St.",
  "street2": "Apartment A",
  "city": "Izmir",
  "stateProvince": "KS",
  "postalCode": "12345",
  "country": "TR"
}

*/

    //bu şekilde iki objeyi birleştirip tek bir obje olarak göndeririz
    //buna spread operator denir { ...putContactData, ...patchContactData }  bu şekilde iki objeyi birleştiririz
    /*
spread operator nedir ? 
spread operator, bir nesnenin veya bir dizinin elemanlarını başka bir nesne veya diziye kopyalamak için kullanılır.
Örneğin, bir dizinin elemanlarını başka bir diziye kopyalamak için spread operatörünü kullanabiliriz.
const arr = [1, 2, 3];
const arr2 = [...arr]; // arr2 is a copy of arr
console.log(arr2); // [1, 2, 3]

Spread operatörü ayrıca nesnelerde de kullanılabilir.
const obj = { name: "John", age: 30 };
const obj2 = { ...obj }; // obj2 is a copy of obj
console.log(obj2); // { name: "John", age: 30 }
    */
  });

  test("delete contact ", async ({ request }) => {
    //tek method ile tüm requestleri yapabiliriz
    const response = await makeRequest(
      request,
      "delete",
      `${baseUrl}${contactId}`,
      "",
      token
    );

    // const response = await request.delete(
    //   `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,

    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    const responsData = await response.text(); //responsu text olarak alırız , data json olarak gelmiyor text olarak geliyor
    //const responsData = (await response.body()).toString(); //bu şekilde de responsu body i text olarak alırız

    const expectedData = "Contact deleted";

    //console.log(responsData);

    //status code doğrlaması
    expect(response.status()).toBe(200); //200 ok , 201 created

    //respons body doğrulaması
    expect(responsData).toEqual(expectedData);
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
