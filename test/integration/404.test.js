/* eslint-env mocha */

"use strict";

import assert from "node:assert";
import axios from "./helpers.js";

describe("GET /404", function () {
  it("responds with a 404 status", async () => {
    const response = await axios.get(`/404`);
    assert.equal(response.status, 404);
    // assert.match(response.headers["content-type"], /text\/plain; ?charset=(UTF|utf)-8/);
  });

  it("responds with a 404 status", async () => {
    const response = await axios.get(`/pages/fixedData/`);
    assert.equal(response.status, 404);
  });

  it("responds with a 404 status", async () => {
    const response = await axios.get(`/https://polyfill.io/`);
    assert.equal(response.status, 404);
  });

  it("responds with a 404 status", async () => {
    const response = await axios.get(`/https://cdn.polyfill.io/`);
    assert.equal(response.status, 404);
  });
});
