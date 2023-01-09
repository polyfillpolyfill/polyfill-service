/* eslint-env mocha */

"use strict";

const assert = require("proclaim");
const axios = require("./helpers.js");

describe("GET /robots.txt", function() {
	context('compute-at-edge service', function() {
		it("does not disallow any paths", async function() {
			const response = await axios.get("/robots.txt?use-compute-at-edge-backend=yes")

			assert.equal(response.status, 200)
			assert.match(response.headers["content-type"], /text\/plain; charset=(UTF|utf)-8/);
			assert.equal(response.data, "User-agent: *\nDisallow:");
		});
	});

	context('vcl service', function() {
		it("does not disallow any paths", async function() {
			const response = await axios.get("/robots.txt?use-compute-at-edge-backend=no")

			assert.equal(response.status, 200)
			assert.match(response.headers["content-type"], /text\/plain; charset=(UTF|utf)-8/);
			assert.equal(response.data, "User-agent: *\nDisallow:");
		});
	});
});
