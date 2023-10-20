/* eslint-env mocha */

"use strict";

import assert from "node:assert";
import axios from "../helpers.js";

describe("GET /v1", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v1`);
		assert.equal(response.status, 308)
		assert.equal(response.headers.location, '/v3/')
	});
});
