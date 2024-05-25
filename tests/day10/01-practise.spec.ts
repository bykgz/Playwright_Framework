import { test, expect } from "@playwright/test";

/*
Test Case - 1:
    - https://opensource-demo.orangehrmlive.com/ URL'ine git
    - Login ol
    - My Info sayfasına git
    - Ad ve Soyad bilgilerini değiştir
    - Logout yap
Test Case - 2:
    - https://opensource-demo.orangehrmlive.com/ URL'ine git
    - Login ol
    - My Info sayfasına git
    - Emergency Contacts bölümüne git
    - 3 kişiyi ekle
    - Eklenen kişileri sil
    - Logout yap
*/

test.describe("orangeHRM.com Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );

    await expect(page).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    await expect(page).toHaveTitle("OrangeHRM");

    //sayfa başlığı doğrulama
    await expect(page.getByRole("heading")).toHaveText("Login");

    //username input
    const username = "Admin";
    const usernameInput = page.getByPlaceholder("Username");
    await expect(usernameInput).toBeEditable();
    await usernameInput.fill(username);
    await expect(usernameInput).toHaveValue(username);

    //password input
    const password = "admin123";
    const passwordInput = page.getByPlaceholder("Password");
    await expect(passwordInput).toBeEditable();
    await passwordInput.fill(password);
    await expect(passwordInput).toHaveValue(password);

    //login button
    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    //sayfa başlığı doğrulama
    await expect(page.getByRole("heading")).toHaveText("Dashboard");
  });

  // test.afterEach(async ({ page }) => {
  //  // logout
  //   await page.locator("[class='oxd-userdropdown']").click();
  //   await page.getByText("Logout").click();
  //   await expect(page.getByRole("heading")).toHaveText("Login");
  // });

  test("Personal Details Test", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "PIM" })).toHaveText("PIM");

    //await page.waitForTimeout(5000); //hard wait
    await page.waitForSelector(".oxd-loading-spinner", { state: "hidden" });

    //first Name Input
    const firstName = "Mustafa";
    const firstNameInput = page.locator("form [name='firstName']");
    await expect(firstNameInput).toBeEditable();
    await firstNameInput.clear();
    await firstNameInput.fill(firstName);
    await expect(firstNameInput).toHaveValue(firstName);

    //Last Name Input
    const lastName = "bykgz";
    const lastNameInput = page.locator("form [name='lastName']");
    await expect(lastNameInput).toBeEditable();
    await lastNameInput.clear();
    await lastNameInput.fill(lastName);
    await expect(lastNameInput).toHaveValue(lastName);

    //save button
    await page
      .locator("form")
      .filter({ hasText: "Employee Full" })
      .getByRole("button")
      .click();

    //sucess text
    await expect(page.getByText("Successfully Updated")).toBeVisible();

    //input fields assertion
    await expect(firstNameInput).toHaveValue(firstName);
    await expect(lastNameInput).toHaveValue(lastName);

    //my info link
    await page.getByRole("link", { name: "My Info" }).click();

    //await page.close();
  });

  test("Emergency Contacts Test", async ({ page }) => {
    //emergency contacts
    await page.getByRole("link", { name: "Emergency Contacts" }).click();

    const kisiler = [
      { name: "Ali", relationship: "Kardeş", phone: "05556669988" },
      { name: "Ayşe", relationship: "Kuzen", phone: "05556669989" },
      { name: "Hasan", relationship: "Amca", phone: "05556669980" },
    ];

    for (const kisi of kisiler) {
      //add button
      await page
        .locator(".orangehrm-action-header")
        .filter({ hasText: "Assigned Emergency Contacts" })
        .getByRole("button")
        .click();

      //input fields

      //await page.locator(".oxd-form input").nth(0).fill(kisi.name);

      await page
        .locator(".oxd-input-group")
        .filter({ hasText: "Name" })
        .locator(".oxd-input-group__label-wrapper + div > input")
        .fill(kisi.name);

      await page
        .locator(".oxd-input-group")
        .filter({ hasText: "Relationship" })
        .locator(".oxd-input-group__label-wrapper + div > input")
        .fill(kisi.relationship);

      await page
        .locator(".oxd-input-group")
        .filter({ hasText: "Home Telephone" })
        .locator(".oxd-input-group__label-wrapper + div > input")
        .fill(kisi.phone);

      //save button
      await page.getByRole("button", { name: "Save" }).click();

      //success message
      await page.waitForSelector("[aria-live='assertive']", {
        state: "visible",
      });
      await expect(page.getByText("Successfully Saved")).toBeVisible();

      //Loading Spinner
      await page.waitForSelector(".oxd-loading-spinner", { state: "hidden" });
    }

    await page.getByRole("row", { name: "Relationship" }).locator("i").check();

    //delete selected
    await page.getByRole("button", { name: "Delete Selected" }).click();
    await page.getByRole("button", { name: "Yes, Delete" }).click();

    //success deleted
    await page.waitForSelector("[aria-live='assertive']", { state: "visible" });
    await expect(page.getByText("Successfully Deleted")).toBeVisible();

    //my info link
    await page.getByRole("link", { name: "My Info" }).click();
  });

  test("Adding Job Title Test", async ({ page }) => {
    /*
    Test Case - 3:
	- https://opensource-demo.orangehrmlive.com/ URL'ine git
	- Login ol
	- Admin sayfasına git
	- Job menüsünden Job Titles sayfasına git
	- Bir meslek ismi ekle
	- Aynı meslek isminin eklenemediğini doğrula
	- Eklenen meslek ismini sil
	- Logout yap
    */

    //Admin link
    await page.getByRole("link", { name: "Admin" }).click();

    //sayf<a başlığı doğrulama
    await expect(page.getByText("Admin" + "User Management")).toHaveText(
      "Admin" + "User Management"
    );

    //job
    await page.getByRole("listitem").filter({ hasText: "Job" }).click();

    //job titles
    await page.getByRole("menuitem", { name: "Job Titles" }).click();

    await expect(page.locator(".oxd-topbar-header-breadcrumb")).toHaveText(
      "Admin" + "Job"
    );

    //add button
    const addButton = page.getByRole("button", { name: "Add" });
    await addButton.click();

    //await expect(addButton).toBeEnabled();
    //await expect(addButton).toBeVisible();

    //add job title başlığı doğrulama
    await expect(page.locator(".orangehrm-main-title")).toHaveText(
      "Add Job Title"
    );

    //job title text box
    await page
      .locator(".oxd-form-row")
      .filter({ hasText: "Job Title" })
      .locator("input")
      .fill("Software Developer");

    //save button
    await page.getByRole("button", { name: "Save" }).click();

    //success saved
    await page.waitForSelector("[aria-live='assertive']", { state: "visible" });
    await expect(page.getByText("Successfully Saved")).toBeVisible();

    //await page.waitForTimeout(5000); //hard wait
    await page.waitForSelector(".oxd-loading-spinner", { state: "hidden" });

    await addButton.click();

    //job title ekleme (negatif senaryo)
    await page
      .locator(".oxd-form-row")
      .filter({ hasText: "Job Title" })
      .locator("input")
      .fill("Software Developer");

    //already exists text
    await page.waitForSelector("[data-v-957b4417] > span", {
      state: "visible",
    });
    await expect(page.getByText("Already Exists")).toBeVisible();
    await page.getByRole("button", { name: "Cancel" }).click();

    //delete buttons
    await page
      .getByRole("row")
      .filter({ hasText: "Software Developer" })
      .locator("i.bi-trash")
      .click();

    await page.getByRole("button", { name: "Yes, Delete" }).click();
  });
});
