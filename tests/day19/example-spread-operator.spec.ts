import { test, expect } from "@playwright/test";
test("spread operator", async ({ page }) => {
  const defaultSettings = {
    theme: "light",
    autoSava: true,
    notifications: true,
  };

  const userSettings = {
    theme: "dark",
    notifications: true,
  };

  const finalSettings = { ...defaultSettings, ...userSettings }; // defaultSettings ve userSettings objelerini birleştirir

  // const finalSettings = {
  //   theme: "dark",
  //   autoSava: true,
  //   notifications: true,
  // };                  =====>  bu şekilde birleştirir  sağdakine göre

  console.log(finalSettings); // { theme: 'dark', autoSava: true, notifications: true }
  /*
spread operator ? 
diyelimki 2 tane listeniz var bunları birleştirmeye yarar

sağdakinin üzerindeki elemanları solundaki listenin üzerine ekler , sağdaki herzaman en son değer olur 


 validateContact(responsData, { ...putContactData, ...patchContactData });  // putContactData ve patchContactData objelerini birleştirir
*/
});
