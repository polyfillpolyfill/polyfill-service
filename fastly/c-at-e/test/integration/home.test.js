/* eslint-env mocha */

"use strict";

import assert from "proclaim";
import axios from "./helpers.js";

describe("GET /", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/&use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 301);
		assert.equal(response.headers["location"], "/v3/");
	});
});
