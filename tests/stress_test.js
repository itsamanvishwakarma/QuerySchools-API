import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "2m", target: 100 }, // below normal load
    { duration: "5m", target: 100 },
    { duration: "2m", target: 200 }, // normal load
    { duration: "5m", target: 200 },
    { duration: "2m", target: 300 }, // around the breaking point
    { duration: "5m", target: 300 },
    { duration: "2m", target: 400 }, // beyond the breaking point
    { duration: "5m", target: 400 },
    { duration: "10m", target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = ""; // base url of the application

  let responses = http.batch([
    // POST auto-generated email
    [
      "POST",
      `${BASE_URL}/api/token/create`,
      JSON.stringify({
        // generate random email with name and surname
        email: "test" + Math.random() * 100000 + "@test.com",
      }),
      { headers: { "Content-Type": "application/json" } },
      { tags: { name: "create_token" } },
    ],

    [
      "GET",
      `${BASE_URL}/api/schools/get/tx3quvt5qf/pin/233001`,
      null,
      { tags: { name: "Pin Route" } },
    ],
    [
      "GET",
      `${BASE_URL}/api/schools/get/tx3quvt5qf/aff/1930327`,
      null,
      { tags: { name: "AFF Route" } },
    ],
    [
      "GET",
      `${BASE_URL}/api/schools/get/tx3quvt5qf/name/international`,
      null,
      { tags: { name: "Name Route" } },
    ],
    [
      "GET",
      `${BASE_URL}/schools/get/tx3quvt5qf/city/vara`,
      null,
      { tags: { name: "City Route" } },
    ],
  ]);
  sleep(1);
}
