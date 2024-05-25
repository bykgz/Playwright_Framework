import { expect, test } from "@playwright/test";
import { faker, fakerTR } from "@faker-js/faker";
import { PageManager } from "../../page-objects/pageManager";

test.describe("User Profile Data Test", () => {
  test.describe.configure({ mode: "serial" }); //bu suitteki testlerin sıralı çalışmasını sağlar
  let randomFirstName,
    randomLastName,
    dateOfBirth,
    randomAddress,
    randomPostcode,
    randomCity,
    randomState,
    randomCountry,
    randomPhone,
    randomEmail,
    randomPassword;

  test.beforeAll(async ({ page }) => {
    //beforeAll tüm testlerden önce bir kez çalışır  ==> bu yüzden befeoreAll içine koydukki bir kez çalışşın
    //birkez oluşturulsun her defasında farklı data oluşturmasın diye
    randomFirstName = fakerTR.person.firstName();
    randomLastName = fakerTR.person.lastName();
    dateOfBirth = "1980-12-12";
    randomAddress = fakerTR.location.streetAddress();
    randomPostcode = fakerTR.location.zipCode();
    randomCity = fakerTR.location.city();
    randomState = fakerTR.location.state();
    randomCountry = "TR";
    //randomPhone = fakerTR.string.numeric({ length: 11 });
    randomPhone = fakerTR.string.numeric(11);
    randomEmail = faker.internet.email();
    randomPassword = fakerTR.internet.password() + "A*1a";
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/auth/register");
  });

  test("FakerJs Data Register Test", async ({ page }) => {
    const pm = new PageManager(page);

    //register sayfasına gidilir
    await pm.navigateTo().openSignInPage();
    await pm.onSignInPage().clickRegisterLink();

    //register formu doldurulur
    await pm.onRegistrationPage().enterFirstName(randomFirstName);
    await pm.onRegistrationPage().enterLastName(randomLastName);
    await pm.onRegistrationPage().enterDateOfBird(dateOfBirth);
    await pm.onRegistrationPage().enterAddress(randomAddress);
    await pm.onRegistrationPage().enterPostcode(randomPostcode);
    await pm.onRegistrationPage().enterCity(randomCity);
    await pm.onRegistrationPage().enterState(randomState);
    await pm.onRegistrationPage().selectCountry(randomCountry);
    await pm.onRegistrationPage().enterPhone(randomPhone);
    await pm.onRegistrationPage().emailAddress(randomEmail);
    await pm.onRegistrationPage().enterPassword(randomPassword);

    //register butonuna tıklanır
    await pm.onRegistrationPage().clickRegisterButton();
    await pm.onSignInPage().verifyPageHeader();
  });

  test("FakerJs Data Login Test", async ({ page }) => {
    //login olunur ve login işleminin başarılı olduğu doğrulanır
    const pm = new PageManager(page);
    await pm.navigateTo().openSignInPage();
    await pm.onSignInPage().performLogin(randomEmail, randomPassword, "Login");
    await pm
      .navigateTo()
      .verifyWithProfileName(randomFirstName, randomLastName);

    await pm.onMyAccountPage().verifyPageHeader();
  });

  test("FakerJs Data Profile Test", async ({ page }) => {
    //login olunur
    const pm = new PageManager(page);
    await pm.navigateTo().openSignInPage();
    await pm.onSignInPage().performLogin(randomEmail, randomPassword, "Login");

    //profile sayfasına gidilir
    await pm.onMyAccountPage().clickTheMenuButton("Profile");
    await pm.onProfilePage().verifyPageHeader();

    //register dataları ile profile sayfasındaki dataların eşleştiği doğrulanır
    await pm
      .onProfilePage()
      .verifyFirstNameInputValue("first-name", randomFirstName);
    await pm
      .onProfilePage()
      .verifyFirstNameInputValue("last-name", randomLastName);
    await pm.onProfilePage().verifyFirstNameInputValue("email", randomEmail);
    await pm.onProfilePage().verifyFirstNameInputValue("phone", randomPhone);
    await pm
      .onProfilePage()
      .verifyFirstNameInputValue("address", randomAddress);
    await pm.onProfilePage().verifyFirstNameInputValue("city", randomCity);
    await pm.onProfilePage().verifyFirstNameInputValue("state", randomState);
    await pm
      .onProfilePage()
      .verifyFirstNameInputValue("postcode", randomPostcode);
    await pm
      .onProfilePage()
      .verifyFirstNameInputValue("country", randomCountry);
  });
});
