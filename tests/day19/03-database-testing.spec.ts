import { test, expect } from "@playwright/test";
import { Client } from "pg";

test("database testing", async ({}) => {
  // Database bağlantısı tanımlanır
  const client = new Client({
    host: "medunna.com",
    port: 5432,
    database: "medunna_db_v2",
    user: "select_user",
    password: "Medunna_pass_@6",
    // connectionString: 'postgresql://select_user:Medunna_pass_@6@medunna.com:5432/medunna_db_v2'
  });

  //database bağlantısı açılır
  await client.connect();

  //query(sorgu) gönderilir ve sonuç alınır
  const result = await client.query("select * from room where room_number = 1");

  const roomData = result.rows[0]; //bu bizi ilk satıra götürür
  console.log(roomData);

  //doğrulama işlemi yapılır
  expect(roomData.room_number).toBe(1);
  expect(roomData.room_type).toEqual("TWIN");
  expect(roomData.status).toBe(true);
  expect(roomData.price).toEqual("100.00");
  expect(parseFloat(roomData.price)).toBeCloseTo(100.0); //gelen data string olduğu için parseFloat ile number'a çevirip doğruladık
  //expect(roomData.price).toBeCloseTo(100.0);
  expect(roomData.description).toEqual("New Room For DB Test");
  expect(roomData.created_date).toEqual(new Date("2023-03-05T17:32:33.004Z")); //bize date objesi döndüğü için , new Date ile date objesi oluşturduk ve doğruladık
  expect(roomData.created_by).toEqual("adminteam02");
  expect(roomData.last_modified_by).toEqual("adminteam02");
  expect(roomData.last_modified_date).toEqual(
    new Date("2023-03-05T17:32:33.004Z")
  );

  //toBeCloseTo() --> bu method ile number değerlerinin yaklaşık eşit olup olmadığını kontrol edebiliriz ,
  // Bu, özellikle kayan nokta (floating point) sayıları karşılaştırırken yararlıdır

  /*
toBeCloseTo metodu iki parametre alır:

Beklenen değer: Bu, test edilen değerin yakın olmasını beklediğimiz değerdir.
Hassasiyet (isteğe bağlı): Bu, kaç ondalık basamağın kontrol edileceğini belirtir. Varsayılan değer 2'dir.


expect(0.1 + 0.2).toBeCloseTo(0.3, 5); 
*/

  //database bağlantısı kapatılır
  await client.end();
});

// Medunna_pass_@6

/*
toBe() metodu, Jest test çerçevesinde kullanılan bir eşitlik kontrolüdür.
Bu metot, Object.is eşitliğini kullanır ve bu, referans tipleri (örneğin nesneler, diziler, tarihler) için beklenen sonucu vermez.
toBe() metodu, iki değerin aynı referansa sahip olup olmadığını kontrol eder. 
Yani, iki nesne aynı değerlere sahip olsa bile, eğer farklı referanslara sahipse, toBe() metodu bunları eşit olarak kabul etmez.

Örneğin, roomData.created_date'in "2023-03-05T17:32:33.004Z" tarihini temsil eden bir Date nesnesine eşit olup olmadığını kontrol etmek istediğinizde,
toBe() metodu hata verir. 
Çünkü roomData.created_date ve new Date("2023-03-05T17:32:33.004Z") ifadeleri, aynı tarih ve saat bilgisine sahip olsalar bile, 
farklı Date nesneleri oluştururlar ve bu nesneler farklı referanslara sahip olur. Bu yüzden toBe() metodu, bu iki değerin eşit olmadığını söyler.

Bu durumu çözmek için, toBe() yerine toEqual() metodunu kullanabilirsiniz. 
toEqual() metodu, nesnelerin ve dizilerin içeriğini kontrol eder ve Date nesneleri için beklenen sonucu verir.
Yani, toEqual() metodu, iki Date nesnesinin aynı tarih ve saat bilgisine sahip olup olmadığını kontrol eder ve bu durumda beklenen sonucu verir.



toBe ve toEqual Jest test çerçevesinde kullanılan iki farklı eşitlik kontrol metotudur ve aralarındaki fark, nasıl bir eşitlik kontrolü yaptıklarıdır.

toBe: Bu metot, Object.is eşitliğini kullanır. 
Yani, iki değerin aynı referansa sahip olup olmadığını kontrol eder.
Bu, primitif değerler (sayılar, stringler, booleanlar vb.) için beklenen sonucu verir. 
Ancak, referans tipleri (nesneler, diziler, tarihler vb.) için beklenen sonucu vermez.
Çünkü iki nesne aynı değerlere sahip olsa bile, eğer farklı referanslara sahipse, toBe metodu bunları eşit olarak kabul etmez.

expect(1).toBe(1); // Passes
expect({a: 1}).toBe({a: 1}); // Fails, even though the objects look the same, they are different references


toEqual: Bu metot, nesnelerin ve dizilerin içeriğini kontrol eder.
Yani, iki nesnenin aynı özelliklere ve değerlere sahip olup olmadığını kontrol eder. 
Bu, referans tipleri için beklenen sonucu verir.
expect({a: 1}).toEqual({a: 1}); // Passes, because the objects have the same structure and values

Bu yüzden, nesneleri veya dizileri karşılaştırırken toEqual kullanılır, primitif değerleri karşılaştırırken ise toBe kullanılır.
*/
