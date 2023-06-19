/* eslint-env mocha */

"use strict";

import assert from "node:assert";
import axios from "../helpers.js";

describe("GET /v3/", function () {
  it("works as expected", async function () {
    const response = await axios.get(`/v3/`);
    assert.equal(response.status, 200);
    assert.equal(
      response.headers["cache-control"],
      "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
    );
    assert.match(response.headers['content-type'], /text\/html/)
  });
});
describe("GET /v3/api", function () {
  it("works as expected", async function () {
    const response = await axios.get(`/v3/api/`);
    assert.equal(response.status, 200);
    assert.equal(
      response.headers["cache-control"],
      "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
    );
    assert.match(response.headers['content-type'], /text\/html/)
  });
});
describe("GET /v3/url-builder", function () {
  it("works as expected", async function () {
    const response = await axios.get(`/v3/url-builder/`);
    assert.equal(response.status, 200);
    assert.equal(
      response.headers["cache-control"],
      "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
    );
    assert.match(response.headers['content-type'], /text\/html/)
  });
});
describe("GET /v3/privacy-policy", function () {
  it("works as expected", async function () {
    const response = await axios.get(`/v3/privacy-policy/`);
    assert.equal(response.status, 200);
    assert.equal(
      response.headers["cache-control"],
      "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
    );
    assert.match(response.headers['content-type'], /text\/html/)
  });
});
describe("GET /v3/report-a-bug", function () {
  it("works as expected", async function () {
    const response = await axios.get(`/v3/report-a-bug/`);
    assert.equal(response.status, 200);
    assert.equal(
      response.headers["cache-control"],
      "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
    );
    assert.match(response.headers['content-type'], /text\/html/)
  });
});
describe("GET /v3/supported-browsers", function () {
  it("works as expected", async function () {
    const response = await axios.get(`/v3/supported-browsers/`);
    assert.equal(response.status, 200);
    assert.equal(
      response.headers["cache-control"],
      "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
    );
    assert.match(response.headers['content-type'], /text\/html/)
  });
});
describe("GET /v3/terms", function () {
  it("works as expected", async function () {
    const response = await axios.get(`/v3/terms/`);
    assert.equal(response.status, 200);
    assert.equal(
      response.headers["cache-control"],
      "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
    );
    assert.match(response.headers['content-type'], /text\/html/)
  });
});
