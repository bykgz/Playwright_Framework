import { expect, test } from "@playwright/test";

test("checkboxes", async ({ page }) => {
  await page.goto("https://practice-automation.com/form-fields/");

  const checkboxWater = page.getByRole("checkbox", { name: "Water" });
  const checkboxMilk = page.getByRole("checkbox", { name: "Milk" });

  const allCheckboxes = page.getByRole("checkbox");

  await checkboxWater.check(); //water seçeneği seçilir
  await checkboxMilk.click(); //milk seçeneği seçilir

  //check() ile click() arasındaki fark
  await checkboxWater.check(); //water burda seçili olarak kalır
  await checkboxMilk.click(); //burda tekrar tıkladığı için seçimi kaldırır

  await checkboxWater.uncheck(); //eğer seçiliyse seçimi kaldırır
  await checkboxWater.check();

  //generic assertion
  const checkboxWaterStatus = await checkboxWater.isChecked(); //true
  const checkboxMilkStatus = await checkboxMilk.isChecked(); //false

  expect(checkboxWaterStatus).toBeTruthy();
  expect(checkboxMilkStatus).toBeFalsy();

  //locator assertion
  await expect(checkboxWater).toBeChecked();
  await expect(checkboxMilk).not.toBeChecked();

  //tüm checkboxları işaretleme - yada işaretsiz bırakma
  for (const box of await allCheckboxes.all()) {
    //all() metodu, bir Locator üzerinde kullanıldığında, Locator tarafından belirtilen tüm elementleri bir dizi olarak döndürür
    //ilk döngüde 1. checkbox işaretlenir, 2. döngüde 2. checkbox işareti kaldırılır vs
    await box.check(); //seçimi kaldırmak için uncheck() da  kullanılır

    expect(await box.isChecked()).toBeTruthy();
    //burası true olmalı
  }

  /* javascript de döngüler


JavaScript'te for döngüsü birkaç farklı şekilde kullanılabilir. İşte en yaygın kullanımlarından bazıları:

1- Klasik for döngüsü: Bu döngü, bir sayaç değişkeni kullanır ve genellikle bir dizi üzerinde belirli bir sayıda döngü yapmak için kullanılır.
for (let i = 0; i < 10; i++) {
  console.log(i);
}


2- or...in döngüsü: Bu döngü, bir nesnenin özellikleri üzerinde döngü yapar.

const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) {
  console.log(`${key}: ${obj[key]}`);
}

3- for...of döngüsü: Bu döngü, bir dizi veya dizi benzeri bir nesnenin elemanları üzerinde döngü yapar. 
Bu, bir "for each" döngüsü olarak da adlandırılır.

const arr = [1, 2, 3, 4, 5];

for (const value of arr) {
  console.log(value);
}
--------------------------------------------------------


  */

  /*
JavaScript'teki forEach, map, filter, ve reduce dizi metodları hakkında biraz bilgi:

1- forEach: Bu metot, dizinin her bir elemanı üzerinde belirli bir işlem gerçekleştirir.
Her bir eleman için bir callback fonksiyonu çağırır.

const arr = [1, 2, 3, 4, 5];
arr.forEach((value, index) => {
  console.log(`Element ${index} is ${value}`);
});


2- map: Bu metot, dizinin her bir elemanı üzerinde belirli bir işlem gerçekleştirir ve bu işlemin sonucundan yeni bir dizi oluşturur.

const arr = [1, 2, 3, 4, 5];
const doubled = arr.map(value => value * 2); // [2, 4, 6, 8, 10]

3-filter: Bu metot, dizinin her bir elemanı için belirli bir koşulu kontrol eder ve bu koşulu sağlayan elemanlardan yeni bir dizi oluşturur.

const arr = [1, 2, 3, 4, 5];
const even = arr.filter(value => value % 2 === 0); // [2, 4]


4- reduce: Bu metot, dizinin elemanları üzerinde bir işlem gerçekleştirir ve bu işlemin sonucunu tek bir değere indirger.

const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((total, value) => total + value, 0); // 15
*/

  /*

const arr = [1, 2, 3, 4, 5]; arr.forEach((value, index) => { console.log(Element ${index} is ${value}); }); 

bunun ile

const arr = [1, 2, 3, 4, 5];

for (const value of arr) { console.log(value); }

arasındaki fark


Her iki kod parçası da dizinin her bir elemanı üzerinde döngü yapar ve her elemanı konsola yazdırır. Ancak, forEach ve for...of döngüleri arasında bazı önemli farklar vardır:

1- forEach metodu, dizinin her bir elemanı için bir callback fonksiyonu çağırır. Bu callback fonksiyonu, elemanın değeri ve dizideki konumu (index) dahil olmak üzere eleman hakkında bilgi içerir. Bu, forEach'un for...of döngüsünden daha esnek olmasını sağlar, 
çünkü elemanın indexine ve diğer özelliklerine erişebilirsiniz.


const arr = [1, 2, 3, 4, 5];
arr.forEach((value, index) => {
  console.log(`Element ${index} is ${value}`);
});

2- for...of döngüsü, dizinin her bir elemanı üzerinde döngü yapar ve her döngüde elemanın değerini bir değişkene atar.
    Bu, for...of döngüsünün daha basit ve okunabilir olmasını sağlar, ancak elemanın indexine veya diğer özelliklerine doğrudan erişemezsiniz.

const arr = [1, 2, 3, 4, 5];
for (const value of arr) {
  console.log(value);
}

  Eğer elemanın indexine veya diğer özelliklerine ihtiyacınız varsa, forEach kullanabilirsiniz.
  Eğer sadece elemanın değerine ihtiyacınız varsa ve kodunuzun daha basit ve okunabilir olmasını istiyorsanız, for...of kullanabilirsiniz.
*/
});
