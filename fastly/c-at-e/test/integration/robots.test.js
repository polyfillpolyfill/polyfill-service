/* eslint-env mocha */

"use strict";

import assert from "proclaim";
import axios from "./helpers.js";

describe("GET /robots.txt", function() {
	it("does not disallow any paths", async function() {
		const response = await axios.get(`/robots.txt?use-compute-at-edge-backend=yes`)

		assert.equal(response.status, 200)
		assert.equal(response.headers["content-type"].toLowerCase(), "text/plain; charset=utf-8")
		assert.equal(response.data, "User-agent: *\nDisallow:");
	});
});
