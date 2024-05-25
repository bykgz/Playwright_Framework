import { expect, test } from "@playwright/test";

test("Input fields", async ({ page }) => {
  await page.goto("https://practice-automation.com/form-fields/");

  const nameInput = page.getByRole("textbox", {
    name: "Name (required)",
  });

  await nameInput.fill("mustafa");

  //inputu temizlemek için
  await nameInput.clear();

  //bu şekilde de inputa yazabiliriz harfleri tek tek yazar kullanıcı gibi
  await nameInput.pressSequentially("mustafa buyukgoze", { delay: 200 }); //yazdığı her harfde 200ms bekler

  //generic assertion  --> inputValue() metodu ile inputun  içerisindeki değerini alabiliriz , textContent() metodu ile de elementin içerisindeki texti alabiliriz
  const nameInputValue = await nameInput.inputValue();
  console.log(nameInputValue); //mustafa

  expect(nameInputValue).toEqual("mustafa buyukgoze");
  expect(nameInputValue).toContain("mustafa");

  //locators assertion
  console.log(nameInput);
  await expect(nameInput).toHaveValue("mustafa buyukgoze");
});
