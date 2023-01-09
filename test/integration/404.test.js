/* eslint-env mocha */

"use strict";

const assert = require("proclaim");
const axios = require("./helpers.js");

describe("GET /404", function () {
  context('compute-at-edge service', function () {
    it("responds with a 404 status", async () => {
      const response = await axios.get("/404?use-compute-at-edge-backend=yes");
      assert.equal(response.status, 404);
      assert.match(response.headers["content-type"], /text\/html; charset=(UTF|utf)-8/);
    });

    it("responds with a 404 status", async () => {
      const response = await axios.get("/pages/fixedData/?use-compute-at-edge-backend=yes");
      assert.equal(response.status, 404);
    });

    it("responds with a 404 status", async () => {
      const response = await axios.get("/https://polyfill.io/?use-compute-at-edge-backend=yes");
      assert.equal(response.status, 404);
    });

    it("responds with a 404 status", async () => {
      const response = await axios.get("/https://cdn.polyfill.io/?use-compute-at-edge-backend=yes");
      assert.equal(response.status, 404);
    });
  });

  context('vcl service', function () {
    it("responds with a 404 status", async () => {
      const response = await axios.get("/404?use-compute-at-edge-backend=no");
      assert.equal(response.status, 404);
      assert.match(response.headers["content-type"], /text\/html; charset=(UTF|utf)-8/);
    });

    it("responds with a 404 status", async () => {
      const response = await axios.get("/pages/fixedData/?use-compute-at-edge-backend=no");
      assert.equal(response.status, 404);
    });

    it("responds with a 404 status", async () => {
      const response = await axios.get("/https://polyfill.io/?use-compute-at-edge-backend=no");
      assert.equal(response.status, 404);
    });

    it("responds with a 404 status", async () => {
      const response = await axios.get("/https://cdn.polyfill.io/?use-compute-at-edge-backend=no");
      assert.equal(response.status, 404);
    });
  });
});
