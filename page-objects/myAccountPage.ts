import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class MyAccountPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async clickTheMenuButton(butonName: string) {
    await this.page.getByRole("button", { name: butonName }).click();
  }

  async verifyPageHeader() {
    await expect(this.page.getByRole("heading")).toHaveText("My account");
  }
}
