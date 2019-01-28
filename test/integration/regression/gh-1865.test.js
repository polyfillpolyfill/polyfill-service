/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const host = require("../helpers").host;
const vm = require("vm");

describe("https://github.com/Financial-Times/polyfill-service/issues/1865", function() {
	const pathsWebsitesHaveUsedWhichWereNotDocumented = ["/v2/polyfill.debug.js", "/v2/polyfill.min.js.js", "/v2/polyfill.js.js", "/v2/polyfill.minify.js", "/v2/polyfill.production.min.js"];
	for (const path of pathsWebsitesHaveUsedWhichWereNotDocumented) {
		it("responds with a bundle containing the correct polyfills", function() {
			this.timeout(30000);
			return request(host)
				.get(path)
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
				});
		});
	}
});
