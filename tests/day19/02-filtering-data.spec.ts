import { test, expect } from "@playwright/test";
import { getTokenPST } from "../../utils/auth-service";

test("my test", async ({ request }) => {
  const token = await getTokenPST();

  const response = await request.get(
    "https://api.practicesoftwaretesting.com/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseData = await response.json();

  console.log(JSON.stringify(responseData, null, 2));

  //resonsu filtrelemek için  ---> email i şu olan kullanıcının id sini almış oluruz
  const userId = responseData.data.find(
    (item) => item.email === "customer@practicesoftwaretesting.com"
  ).id;

  console.log("USER ID: " + userId);
});

/*
*****  filter()  , find() farkı *******

filter ve find JavaScript array metodlarıdır ve belirli bir koşulu karşılayan öğeleri bulmak için kullanılırlar. Ancak, bu iki metod arasında önemli bir fark vardır:
filter metodu, belirli bir koşulu karşılayan tüm öğeleri bir dizi olarak döndürür. Yani, koşulu karşılayan birden fazla öğe varsa, filter metodu bu öğelerin tümünü döndürür.

const filteredData = responseData.filter((item) => item.email === "example@email.com");

Bu örnekte, filter metodu, email özelliği "example@email.com" olan tüm öğeleri filteredData dizisine ekler.

find metodu ise, belirli bir koşulu karşılayan ilk öğeyi döndürür. Yani, koşulu karşılayan birden fazla öğe varsa, find metodu yalnızca ilkini döndürür.

const userId = responseData.data.find((item) => item.email === "customer@practicesoftwaretesting.com").id;

Bu örnekte, find metodu, email özelliği "customer@practicesoftwaretesting.com" olan ilk öğeyi bulur ve bu öğenin id özelliğini userId değişkenine atar.

Özetle, filter metodu belirli bir koşulu karşılayan tüm öğeleri döndürürken, find metodu yalnızca ilk öğeyi döndürür.


*/

/*
Aşağıda, test.step metodunun doğru kullanımına bir örnek verilmiştir:


test('my test', async ({ page }) => {
  await test.step('step 1', async () => {
    // Do something...
  });

  await test.step('step 2', async () => {
    // Do something else...
  });
});

Bu örnekte, 'my test' adlı bir test oluşturduk ve bu testi 'step 1' ve 'step 2' adlı iki adıma ayırdık. 
Her adım, belirli bir işlevi yerine getirir ve testin genel başarısına katkıda bulunur.

Aktif dosyanızdaki kod parçacığı, test.step ve test metodlarının yanlış bir şekilde kullanıldığını gösteriyor.
test.step metodu, bir test bloğu içinde kullanılmalı ve belirli bir işlemi tanımlamalıdır. 
Ayrıca, bir test bloğu genellikle başka bir test bloğu içinde oluşturulmaz. Her test bloğu, bağımsız bir test durumunu temsil etmelidir.
*/
