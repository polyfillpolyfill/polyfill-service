/* eslint-env mocha */
"use strict";

const fs = require("fs-extra");
const path = require("path");
const filePath = path.join(__dirname, "../../fastly/terraform/variables.json");

let fastlyVariables = {};

if (fs.existsSync(filePath)) {
	fastlyVariables = fs.readJsonSync(filePath, { throws: false }) || {};
}

if (fastlyVariables.is_test_environment) {
	const request = require("supertest");
	const host = require("./helpers").host;
	const regions = fastlyVariables.backends.map(backend => backend.region);

	describe("multi-region routing", function() {
		this.timeout(30000);

		for (const expectedRegion of regions) {
			it(`uses the ${expectedRegion} origin when all other regions unhealthy`, () => {
				const otherRegions = regions.filter(region => region !== expectedRegion);
				const req = request(host)
					.get("/v3/__gtg")
					.set("Fastly-Debug", "yes");
				for (const region of otherRegions) {
					req.set(`Test-${region}-Force-Unhealthy`, "yes");
				}
				return req.expect(200).expect("Debug-Backend", RegExp(expectedRegion));
			});
		}
	});
}
