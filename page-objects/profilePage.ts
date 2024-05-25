import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class ProfilePage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async verifyPageHeader() {
    await expect(
      this.page.getByRole("heading", { name: "Profile" })
    ).toHaveText("Profile");
  }

  async verifyFirstNameInputValue(testId: string, firstName: string) {
    await expect(this.page.getByTestId(testId)).toHaveValue(firstName);
  }
}
