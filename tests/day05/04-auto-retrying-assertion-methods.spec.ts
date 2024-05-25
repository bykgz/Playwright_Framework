import { expect, test } from "@playwright/test";

test("auto - retrying - assertion - methods", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");

  //toBeChecked() - not.toBeChecked()  --> checkbox seçili olup olmadığını kontrol eder
  const bmwCheckBox = page.locator("#bmwcheck");
  //beklediğim checkbox seçili olmaması
  await expect(bmwCheckBox).not.toBeChecked();

  //checkbox seçili hale getirdik
  await bmwCheckBox.check();

  //şimdide checkbox seçili olmasını doğruluyoruz
  await expect(bmwCheckBox).toBeChecked();

  //toBeEnabled() - toBeDisabled()  --> kullanıcın elementi etkileme yetkisi olup olmadığını kontrol eder
  const enableDisableInput = page.locator("#enabled-example-input");
  //beklediğimiz inputun enabled olması
  await expect(enableDisableInput).toBeEnabled();

  await page.getByRole("button", { name: "Disable" }).click();
  //beklediğimiz inputun disabled olması
  await expect(enableDisableInput).toBeDisabled();

  //toBeEditable() - not.toBeEditable()  --> input, textarea, contenteditable elementlerin düzenlenebilir olup olmadığını kontrol eder
  await expect(enableDisableInput).not.toBeEditable();
  await page.getByRole("button", { name: "Enable" }).click();
  await expect(enableDisableInput).toBeEditable();

  //toBeEmpty() - not.toBeEmpty()  --> elementin içeriğinin boş olup olmadığını kontrol eder
  await expect(enableDisableInput).toBeEmpty();
  await enableDisableInput.fill("Hello World");
  await expect(enableDisableInput).not.toBeEmpty();

  //toBeVisible() - toBeHidden  --> elementin görünür olup olmadığını kontrol eder
  const visibleHiddenInput = page.getByPlaceholder("Hide/Show Example");
  await expect(visibleHiddenInput).toBeVisible();
  await page.getByRole("button", { name: "Hide" }).click();
  await expect(visibleHiddenInput).toBeHidden();

  //toContainText() - not.toContainText()  --> elementin içeriğinde belirli bir metni içerip içermediğini kontrol eder
  const switchTitle = page.locator("#alert-example-div");
  await expect(switchTitle).toContainText("Switch To Alert");
  await expect(switchTitle).not.toContainText("Test");

  //toHaveAttribute() - not.toHaveAttribute()  --> elementin belirli bir attribute'a sahip olup olmadığını kontrol eder
  await expect(bmwCheckBox).toHaveAttribute("name");
  await expect(bmwCheckBox).toHaveAttribute("name", "cars");
  //apple valuesi olan name attribute yok
  await expect(bmwCheckBox).not.toHaveAttribute("name", "apple");
  //class attribute yok
  await expect(bmwCheckBox).not.toHaveAttribute("class");

  //toHaveClass() - not.toHaveClass()  --> elementin belirli bir class'a sahip olup olmadığını kontrol eder
  const openWindowButton = page.getByRole("button", { name: "Open Window" });
  await expect(openWindowButton).toHaveClass("btn-style class1");
  await expect(openWindowButton).not.toHaveClass("test");

  //toHaveCount() - not.toHaveCount()  --> elementin belirli sayıda alt elemente sahip olup olmadığını kontrol eder
  const radioButtonList = page.getByRole("radio");
  await expect(radioButtonList).toHaveCount(3);
  await expect(radioButtonList).not.toHaveCount(5);

  //toHaveId() - not.toHaveId()  --> elementin belirli bir id'ye sahip olup olmadığını kontrol eder
  await expect(openWindowButton).toHaveId("openwindow");
  await expect(openWindowButton).not.toHaveId("test");

  //toHaveText() - not.toHaveText()  --> elementin belirli bir metne sahip olup olmadığını kontrol eder
  //metin birebir aynı olmalı
  const pageTitle = page.getByRole("heading", { name: "Practice Page" });
  await expect(pageTitle).toHaveText("Practice Page");
  await expect(pageTitle).not.toHaveText("Test");

  //toHaveValue() - not.toHaveValue()  --> elementin belirli bir değere sahip olup olmadığını kontrol eder , input, textarea, select elementler için kullanılır
  await expect(enableDisableInput).toHaveValue("Test");
  await expect(enableDisableInput).not.toHaveValue("Hello World");

  //toHaveTitle() - not.toHaveTitle()  --> sayfanın belirli bir title'a sahip olup olmadığını kontrol eder
  await expect(page).toHaveTitle("Practice Page");
  await expect(page).not.toHaveTitle("Test");

  //toHaveURL() - not.toHaveURL()  --> sayfanın belirli bir url'de olup olmadığını kontrol eder
  await expect(page).toHaveURL("https://www.letskodeit.com/practice");
  await expect(page).not.toHaveURL("https://www.letskodeit.com/test");

  //toHaveCSS() - not.toHaveCSS()  --> elementin belirli bir css özelliğine sahip olup olmadığını kontrol eder
  //toClick() - not.toClick()  --> elementin tıklanabilir olup olmadığını kontrol eder
  //toHaveFocus() - not.toHaveFocus()  --> elementin focuslanmış olup olmadığını kontrol eder
  //toHaveURLPath() - not.toHaveURLPath()  --> sayfanın belirli bir url path'inde olup olmadığını kontrol eder
  //toHaveURLSearchParams() - not.toHaveURLSearchParams()  --> sayfanın belirli bir url parametresine sahip olup olmadığını kontrol eder
});
