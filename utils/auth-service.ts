import { request } from "@playwright/test";
import authData from "../data/contactAuthData.json";

export async function getToken() {
  const context = await request.newContext();

  const respons = await context.post(
    "https://thinking-tester-contact-list.herokuapp.com/users/login",
    {
      data: authData,
    }
  );

  const responData = await respons.json();

  return responData.token;
}

export async function getTokenPST() {
  const context = await request.newContext();

  const respons = await context.post(
    "https://api.practicesoftwaretesting.com/users/login",
    {
      data: {
        email: "admin@practicesoftwaretesting.com",
        password: "welcome01",
      },
    }
  );

  const responData = await respons.json();

  return responData.access_token;
}

/*

async anahtar kelimesi, bir fonksiyonun asenkron olduğunu belirtir.
Asenkron fonksiyonlar, await anahtar kelimesini kullanarak bir Promise'in sonucunu bekleyebilir.

getToken fonksiyonunda async anahtar kelimesi kullanılıyor çünkü bu fonksiyon, request.newContext() 
ve context.post() gibi asenkron işlemleri gerçekleştiriyor. Bu işlemler bir Promise döndürür ve bu 
Promise'lerin sonucunu beklemek için await anahtar kelimesi kullanılır.

await anahtar kelimesi yalnızca async fonksiyonların içinde kullanılabilir. 
Bu nedenle, await kullanmayı planladığınız herhangi bir fonksiyonun başına async anahtar
kelimesini eklemeniz gerekir.

Bu, JavaScript'in asenkron işlemleri daha kolay yönetmesini sağlar. 
Asenkron işlemler, ağ istekleri gibi belirsiz bir süre boyunca çalışan işlemlerdir. 
Bu işlemler, sonuçları beklenirken diğer kodun çalışmasına izin verir, böylece uygulamanın yanıt vermesi gecikmez.
*/
