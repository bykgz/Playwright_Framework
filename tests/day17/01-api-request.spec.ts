import { test, expect } from "@playwright/test";
import postData from "../../data/petPostData.json";

test.describe("pet store api suit", () => {
  test.describe.configure({ mode: "serial" }); //testlerimiz sıralı bir şekilde çalışsın diye , bunu koymazsak bazen hızlı olan çalışacağı için yani mesela ilk
  // get çalışırsa id yi alamayız
  //ilk post çalışması gerekiyor
  let petID;

  test("post request - pet store", async ({ request }) => {
    const respons = await request.post("https://petstore.swagger.io/v2/pet", {
      data: postData,
    });

    const responData = await respons.json();

    petID = responData.id;

    //console.log(JSON.stringify(responData, null, 2));
    expect(respons.status()).toBe(200);
    expect(responData.category.id).toBe(0);
    expect(responData.category.name).toEqual("KÖPEK");
    expect(responData.name).toEqual("pamuk");
    expect(typeof responData.photoUrls[0]).toBe("string");
    expect(responData.tags[0].id).toBe(0);
    expect(responData.tags[0].name).toEqual("sibirya kurdu");
    expect(responData.status).toEqual("satılık değil");
  });

  test("get request - pet store", async ({ request }) => {
    const response = await request.get(
      `https://petstore.swagger.io/v2/pet/${petID}`
    );

    const responData = await response.json();

    //  console.log(JSON.stringify(responData, null, 2));
    expect(response.status()).toBe(200);
    expect(responData.category.id).toBe(0);
    expect(responData.category.name).toEqual("KÖPEK");
    expect(responData.name).toEqual("pamuk");
    expect(typeof responData.photoUrls[0]).toBe("string");
    expect(responData.tags[0].id).toBe(0);
    expect(responData.tags[0].name).toEqual("sibirya kurdu");
    expect(responData.status).toEqual("satılık değil");
  });

  test("delete request - pet store", async ({ request }) => {
    const response = await request.delete(
      `https://petstore.swagger.io/v2/pet/${petID}`
    );

    const responData = await response.json();

    // console.log(JSON.stringify(responData, null, 2));
    expect(response.status()).toBe(200);
    expect(responData.code).toBe(200);
    expect(responData.type).toEqual("unknown");
    expect(responData.message).toEqual(`${petID}`);
  });

  test("delete request - pet store - negatif", async ({ request }) => {
    const response = await request.get(
      `https://petstore.swagger.io/v2/pet/${petID}`
    );

    //const responData = await response.json();

    // console.log(JSON.stringify(responData, null, 2));
    expect(response.status()).toBe(404);
  });
});
