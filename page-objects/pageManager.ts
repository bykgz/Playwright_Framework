import { Page } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { SignInPage } from "./signInPage";
import { RegistrationPage } from "./registrationPage";
import { MyAccountPage } from "./myAccountPage";
import { ProfilePage } from "./profilePage";

export class PageManager {
  private readonly page: Page;

  private readonly navigationPage: NavigationPage;
  private readonly signInPage: SignInPage;
  private readonly registrationPage: RegistrationPage;
  private readonly myAccountPage: MyAccountPage;
  private readonly profilePage: ProfilePage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.signInPage = new SignInPage(this.page);
    this.registrationPage = new RegistrationPage(this.page);
    this.myAccountPage = new MyAccountPage(this.page);
    this.profilePage = new ProfilePage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onSignInPage() {
    return this.signInPage;
  }

  onRegistrationPage() {
    return this.registrationPage;
  }

  onMyAccountPage() {
    return this.myAccountPage;
  }

  onProfilePage() {
    return this.profilePage;
  }
}
