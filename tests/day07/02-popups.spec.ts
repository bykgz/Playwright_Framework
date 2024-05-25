import { test, expect } from "@playwright/test";

test("alert - popup", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  await page.goto("https://practice-automation.com/popups/");

  //sayfada çıkan alert popup'ın mesajını doğrulama
  //Bu satır, bir diyalog kutusu belirdiğinde tetiklenecek bir olay dinleyicisi (event listener) ayarlar.
  //Bu olay dinleyicisi, sayfada bir dialog olayı oluştuğunda çalışır.
  //(dialog) => {...}: Bu kısım, bir ok fonksiyonudur (arrow function). Bu fonksiyon, "dialog" olayı tetiklendiğinde çalıştırılır.
  //Fonksiyonun parametresi (dialog), beliren diyalog kutusunu temsil eden bir nesnedir.
  //on metodu, bir olay dinleyicisi ekler.
  //dialog, bir dialog olayı oluştuğunda çalışacak olan işlevdir.
  //dialog.accept() metodu, dialog kutusunu kabul etmek için kullanılır.
  //dialog.accept("mustafa") metodu, dialog kutusuna bir metin girmek için kullanılır.
  //dialog.dismiss() metodu, dialog kutusunu reddetmek için kullanılır.
  //dialog.defaultValue() metodu, dialog kutusunun varsayılan değerini almak için kullanılır.
  //dialog.message() metodu, dialog kutusunun mesajını almak için kullanılır.

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Hi there, pal!");
    dialog.accept();
  });

  const alertPopup = page.getByRole("button", { name: "Alert Popup" });
  await alertPopup.click();
});

test("confirm - popup", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  await page.goto("https://practice-automation.com/popups/");

  //sayfada çıkan alert popup'ın mesajını doğrulama
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("OK or Cancel, which will it be?");
    dialog.dismiss();
  });

  const alertPopup = page.getByRole("button", { name: "Confirm Popup" });
  await alertPopup.click();
});

test("prompt - popup", async ({ page }) => {
  //await page.goto("https://www.letskodeit.com/practice");
  await page.goto("https://practice-automation.com/popups/");

  //sayfada çıkan alert popup'ın mesajını doğrulama
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Hi there, what's your name?");
    dialog.accept("mustafa büyükgöze");
  });

  const alertPopup = page.getByRole("button", { name: "Prompt Popup" });
  await alertPopup.click();
});
