/* eslint-env mocha */

"use strict";

import assert from 'proclaim';
import axios from "./helpers.js";

describe("GET /__about", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/__about?use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "application/json; charset=utf-8");
	});
});
