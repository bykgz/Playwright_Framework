import { expect, test } from "@playwright/test";

test("non-retrying assertion methods", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");

  //toBeTruthy() - toBeFalsy() --> belediğimiz sonucun true ve false olmasını kontrol eder
  const bmwRadio = page.locator("#bmwradio");

  //bmwRadioStatus --> burda true veya false olacak
  let bmwRadioStatus = await bmwRadio.isChecked(); //şuan burası false
  expect(bmwRadioStatus).toBeFalsy(); //şuan burası false olduğu için test başarılı olacak

  await bmwRadio.check();
  bmwRadioStatus = await bmwRadio.isChecked(); //true
  expect(bmwRadioStatus).toBeTruthy(); //true olduğu için test başarılı olacak

  //toBeGreaterThan() - toBeGreaterThanOrEqual() (büyük eşit)
  //toBeLessThan() - toBeLessThanOrEqual()  (küçük eşit)   --> sayısal karşılaştırma yapar
  const radioButtons = page.getByRole("radio");
  const radioButtonsCount = await radioButtons.count();

  expect(radioButtonsCount).toBeGreaterThan(0); //0'ten büyük olmalı
  expect(radioButtonsCount).toBeLessThan(10); //10'ten az olmalı

  expect(radioButtonsCount).toBeGreaterThanOrEqual(3); //3 e eşit veya daha fazla olmalı
  expect(radioButtonsCount).toBeLessThanOrEqual(3); //3 e eşit veya daha az olmalı

  //toContain() - toMatch() --> string karşılaştırma yapar

  /*
  toContain(): Bu metot, bir dizi veya string'in belirli bir öğeyi veya substring'i içerip içermediğini kontrol eder. 
  Yani, tam bir eşleşme arar.

  toMatch(): Bu metot, bir string'in belirli bir düzenli ifade (regex) ile eşleşip eşleşmediğini kontrol eder.
  Yani, bir desen eşleşmesi arar.

  test('check if string matches the email pattern', () => {
  const email = 'test@example.com';
  expect(email).toMatch(/\S+@\S+\.\S+/); // This will pass because 'test@example.com' is a valid email
});

test('check if string matches the phone number pattern', () => {
  const phoneNumber = '123-456-7890';
  expect(phoneNumber).toMatch(/\d{3}-\d{3}-\d{4}/); // This will pass because '123-456-7890' is a valid phone number
});



  */
  const header = await page.getByRole("heading", { name: "Practice Page" });

  const headerText = await header.innerText(); //--> bu şekilde header'ın text'ini alabiliriz
  const headerText2 = await header.textContent(); //--> bu şekilde de header'ın text'ini alabiliriz

  expect(headerText).toContain("Practice"); //headerText içinde Practice kelimesi olmalı

  //toEqual() - toStrictEqual() - toBe() --> değer karşılaştırma yapar

  /*
  toBe(): Bu metot, iki değerin aynı olup olmadığını kontrol eder. Yani, tam bir eşleşme arar. Bu, JavaScript'teki === operatörüne benzer.
          kısaca sadece değere bakar


  toEqual(): Bu metot, iki değerin değer ve yapı olarak eşit olup olmadığını kontrol eder. 
          kısaca değer ve yapıya bakar
  Yani, nesnelerin yapılarının ve içerdikleri değerlerin aynı olup olmadığını kontrol eder.

test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2}); // This will pass
});

test('object comparison', () => {
  const person1 = {name: 'John', age: 30, location: undefined};
  const person2 = {name: 'John', age: 30};
  expect(person1).toEqual(person2); // This will pass    ---> toEqual() undefined özellikleri görmezden gelir karşılaştrmaz
});

toEqual() metodu aşağıdaki özellikleri görmezden gelir:
undefined özellikler: Eğer bir nesnenin bir özelliği undefined olarak tanımlanmışsa, toEqual() metodu bu özelliği görmezden gelir.
Nesnelerin referansları: toEqual() metodu, nesnelerin referanslarına bakmaz. Yani, iki nesne aynı referansa sahip olmasa bile, 
toEqual() metodu bu nesneleri eşit olarak değerlendirir eğer bu nesnelerin değer ve yapıları eşitse.

JavaScript'te, nesneler referans türündedir. Bu, bir nesnenin değerinin aslında bellekteki konumu olduğu anlamına gelir. 
Yani, iki nesne aynı değerlere ve yapıya sahip olsa bile,
eğer bu nesneler farklı bellek konumlarında yer alıyorsa, bu nesneler farklı referanslara sahip olacaktır.

toEqual() metodu, nesnelerin referanslarına bakmaz. Yani, iki nesne aynı referansa sahip olmasa bile,
toEqual() metodu bu nesneleri eşit olarak değerlendirir eğer bu nesnelerin değer ve yapıları eşitse.

const person1 = {name: 'John', age: 30};
const person2 = {name: 'John', age: 30};
expect(person1).toEqual(person2); // This will pass

person1 ve person2 nesneleri aynı değerlere ve yapıya sahip olsa da, bu nesneler farklı bellek konumlarında yer alır ve dolayısıyla farklı referanslara sahip olur. 
Ancak, toEqual() metodu nesnelerin referanslarına bakmaz ve bu nedenle bu test başarılı olur.



  toStrictEqual(): Bu metot, iki nesnenin derinlemesine eşit olup olmadığını kontrol eder. 
          kısaca değer ve yapıya bakar fakat aynı türde olmasını da gerektirir
  Yani, nesnelerin yapılarının ve içerdikleri değerlerin aynı olup olmadığını kontrol eder.
  Ancak, toEqual()'dan farklı olarak, toStrictEqual() ayrıca nesnelerin aynı türde olmasını da gerektirir.


  test('object comparison', () => {
  const person1 = {name: 'John', age: 30, location: undefined};
  const person2 = {name: 'John', age: 30};
  expect(person1).toStrictEqual(person2); // This will fail  --> çünkü person1'de location var person2'de yok
                                                                toStrictEqual() bunu kontrol eder ,  undefined özellikleri görmezden gelmez
});
  */
  expect(headerText).toEqual("Practice Page"); //headerText'in değeri Practice Page olmalı
});

/*

JavaScript'te, iki nesne aynı referansa sahip olabilir.
Bu genellikle bir nesnenin başka bir nesneye atanması durumunda gerçekleşir. İşte bir örnek:

let person1 = {name: 'John', age: 30};
let person2 = person1;

Bu durumda, person1 ve person2 aynı referansa sahip olacaktır çünkü person2'ye person1'in referansı atanmıştır. Bu, person1 ve person2'nin aynı nesneyi temsil ettiği anlamına gelir. 
Yani, person1'de yapılan herhangi bir değişiklik person2'yi de etkileyecektir ve tam tersi de geçerlidir.

person1.name = 'Jane';
console.log(person2.name); // Outputs: 'Jane'

Bu örnekte, person1'in name özelliğini değiştirdik ve bu değişiklik person2'yi de etkiledi çünkü person1 ve person2 aynı nesneyi temsil eder.

*/
