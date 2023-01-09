/* eslint-env mocha */

"use strict";

const assert = require("proclaim");
const axios = require("../helpers.js");
const vm = require("vm");

describe("https://github.com/Financial-Times/polyfill-service/issues/1865", function() {
	const pathsWebsitesHaveUsedWhichWereNotDocumented = ["/v2/polyfill.debug.js", "/v2/polyfill.min.js.js", "/v2/polyfill.js.js", "/v2/polyfill.minify.js", "/v2/polyfill.production.min.js"];
	for (const path of pathsWebsitesHaveUsedWhichWereNotDocumented) {
		context('compute-at-edge service', function() {
			it(`responds to ${path} with a bundle containing the correct polyfills`, async function() {
				const response = await axios.get(path + '?use-compute-at-edge-backend=yes');

				assert.equal(response.status, 200);
				assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
				assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
				assert.isString(response.data);
				assert.doesNotThrow(() => new vm.Script(response.data));
			});
		});
		context('vcl service', function() {
			it(`responds to ${path} with a bundle containing the correct polyfills`, async function() {
				const response = await axios.get(path + '?use-compute-at-edge-backend=no');

				assert.equal(response.status, 200);
				assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
				assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
				assert.isString(response.data);
				assert.doesNotThrow(() => new vm.Script(response.data));
			});
		});
	}
});
