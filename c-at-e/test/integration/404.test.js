/* eslint-env mocha */

"use strict";

import assert from "proclaim";
import axios from "./helpers.js";

describe("GET /404", function () {
  it("responds with a 404 status", async () => {
    const response = await axios.get(`/404`);
    assert.equal(response.status, 404);
    assert.equal(response.headers["content-type"], "text/html; charset=utf-8");
    assert.equal(
      response.headers["cache-control"],
      "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800"
    );
  });

  it("responds with a 404 status", async () => {
    const response = await axios.get(`/pages/fixedData/`);
    assert.equal(response.status, 404);
    assert.equal(response.headers["content-type"], "text/html; charset=utf-8");
    assert.equal(
      response.headers["cache-control"],
      "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800"
    );
  });

  it("responds with a 404 status", async () => {
    const response = await axios.get(`/https://polyfill.io/`);
    assert.equal(response.status, 404);
    assert.equal(response.headers["content-type"], "text/html; charset=utf-8");
    assert.equal(
      response.headers["cache-control"],
      "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800"
    );
  });

  it("responds with a 404 status", async () => {
    const response = await axios.get(`/https://cdn.polyfill.io/`);
    assert.equal(response.status, 404);
    assert.equal(response.headers["content-type"], "text/html; charset=utf-8");
    assert.equal(
      response.headers["cache-control"],
      "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800"
    );
  });
});
