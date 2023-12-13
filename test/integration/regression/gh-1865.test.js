/* eslint-env mocha */

"use strict";

import assert from "node:assert";
import axios from "../helpers.js";
import vm from "node:vm";

// describe("https://github.com/JakeChampion/polyfill-service/issues/1865", function() {
// 	const pathsWebsitesHaveUsedWhichWereNotDocumented = ["/v2/polyfill.debug.js", "/v2/polyfill.min.js.js", "/v2/polyfill.js.js", "/v2/polyfill.minify.js", "/v2/polyfill.production.min.js"];
// 	for (const path of pathsWebsitesHaveUsedWhichWereNotDocumented) {
// 		it(`responds to ${path} with a bundle containing the correct polyfills`, async function() {
// 			const response = await axios.get(path);

// 			assert.equal(response.status, 200);
// 			assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
// 			assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
// 			assert.ok(typeof response.data === 'string');
// 			assert.doesNotThrow(() => new vm.Script(response.data));
// 		});
// 	}
// });
