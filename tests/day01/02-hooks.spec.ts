import { test } from "@playwright/test";

test.beforeAll(async ({ page }) => {});

//test.afterAll(async ({ page }) => {});

test.beforeEach(async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
});

//test.afterEach(async ({ page }) => {});

test.describe("Contact Sayfası Test Suit", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Contact").click();
  });

  test("test1", async ({ page }) => {});

  test("test2", async ({ page }) => {});
});

test.describe("Login Sayfası Test Suit", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Sign in").click();
  });

  test("test1", async ({ page }) => {});

  test("test2", async ({ page }) => {});
});

//toplu yoruma alma kısayolu control + ö

//ortak olan son adımlar varsa afterEach ve afterAll kullanılabilir
