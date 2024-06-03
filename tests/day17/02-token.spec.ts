import { test, expect } from "@playwright/test";
import contactData from "../../data/postContact.json";
import { getToken } from "../../utils/auth-service";

test.describe("contact list - token", () => {
  test.describe.configure({ mode: "serial" });

  test("add contact", async ({ request }) => {
    const token = await getToken(); //token i alır

    const respons = await request.post(
      "https://thinking-tester-contact-list.herokuapp.com/contacts",
      {
        data: contactData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responData = await respons.json();
    console.log(JSON.stringify(responData, null, 2));
  });
});
