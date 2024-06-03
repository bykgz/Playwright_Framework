//import { request } from '@playwright/test';

import { expect } from "@playwright/test";

//Bir nesnenin özelliğine veya metotuna dinamik olarak erişmek için köşeli parantez ([]) notasyonunu kullanabilirsiniz,
export async function makeRequest(request, method, url, data, token) {
  return await request[method](url, {
    //return ekledik çünkü bize response döndürecek
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function validateContact(responsData, expectedData) {
  for (const property in expectedData) {
    expect(responsData[property]).toEqual(expectedData[property]);
  }
  expect(responsData).toHaveProperty("_id");
  expect(responsData).toHaveProperty("owner");
}

/*
export async function makeRequest(request, method, url, data, token) {
  switch (method) {
    case "GET":
      return request.get(url, {
        data: null,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    case "DELETE":
      return request.delete(url, {
        data: null,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    case "POST":
      return request.post(url, {
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    case "PUT":
      return request.put(url, {
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    case "PATCH":
      return request.patch(url, {
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    default: {
      throw new Error("Invalid method");
    }
  }
}
*/
