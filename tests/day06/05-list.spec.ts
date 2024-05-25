import { expect, test } from "@playwright/test";

test("list", async ({ page }) => {
  await page.goto("https://practice-automation.com/form-fields/");

  const animalList = page.getByRole("list"); //ul gibi list elementleri için kullanılır

  //const animalListbox = page.getByRole("listbox"); //genellikle bir select etiketi (açılır menü) veya ul veya ol etiketleri (sıralı veya sırasız listeler) ile birlikte kullanılır.

  const animalEagle = page.getByRole("listitem").getByText("Eagle"); //listteki bir elamanı almış olduk

  //allTextContents() metodu ile listteki tüm elemanları alabiliriz
  const animalListText = await animalList.allTextContents();
  const animaEagleText = await animalEagle.textContent();

  console.log(animalListText); //  [ '\n  Falcon\n  Eagle\n  Horsefly\n  Cheetah\n' ]
  console.log(animaEagleText); // Eagle

  /*
  *************************************************************************************
  //listteki tüm elemanları alma
  const listItems = page.locator("ul li");
  const text = await listItems.allTextContents(); // [ 'Falcon', 'Eagle', 'Horsefly', 'Cheetah' ]

  const textCount = await listItems.count(); //4

  console.log(text);
  console.log(textCount);
  *****************************************************************************************
  */

  //****************************************************************** */
  //listteki tüm elemanları alma , list değil listitem kullanmak gerek
  const deneme = page.getByRole("listitem");
  const deneme2 = await deneme.allTextContents();
  console.log(deneme2);
  //****************************************************************** */

  //bu şekilde de yapılabilir
  for (const box of await animalList.all()) {
    console.log(await box.textContent());
    console.log(await box.getByRole("listitem").count());
    await expect(box.getByRole("listitem")).toHaveCount(4);
  }

  //Generic assertion
  expect(animalListText).toEqual([
    "\n  Falcon\n  Eagle\n  Horsefly\n  Cheetah\n",
  ]);
  expect(animaEagleText).toEqual("Eagle");

  //locator assertion
  await expect(animalList).toHaveText([
    "\n  Falcon\n  Eagle\n  Horsefly\n  Cheetah\n",
  ]);

  await expect(animalList).toHaveCount(1);
  await expect(animalEagle).toHaveText("Eagle");
});
