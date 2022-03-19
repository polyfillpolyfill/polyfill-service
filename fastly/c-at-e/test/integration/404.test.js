/* eslint-env mocha */

"use strict";

import assert from "proclaim";
import axios from "./helpers.js";

describe("GET /404", function () {
  it("responds with a 404 status", async () => {
    const response = await axios.get(`/404?use-compute-at-edge-backend=yes`);
    assert.equal(response.status, 404);
    assert.equal(response.headers["content-type"], "text/html; charset=utf-8");
  });

  it("responds with a 404 status", async () => {
    const response = await axios.get(`/pages/fixedData/?use-compute-at-edge-backend=yes`);
    assert.equal(response.status, 404);
  });

  it("responds with a 404 status", async () => {
    const response = await axios.get(`/https://polyfill.io/?use-compute-at-edge-backend=yes`);
    assert.equal(response.status, 404);
  });

  it("responds with a 404 status", async () => {
    const response = await axios.get(`/https://cdn.polyfill.io/?use-compute-at-edge-backend=yes`);
    assert.equal(response.status, 404);
  });
});
