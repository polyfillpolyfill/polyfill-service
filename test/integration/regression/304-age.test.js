/* eslint-env mocha */

"use strict";

import assert from "node:assert";
import axios from "../helpers.js";
const randomFeature = Math.random();

// describe("Request with a If-Modified-Since value which is before last-modified", function() {
// 	it(`responds with a 200 and an Age reset to 0`, async function() {
// 		await axios.get(`/v3/polyfill.min.js?features=${randomFeature}`);
// 		const response = await axios.get(`/v3/polyfill.min.js?features=${randomFeature}`, {
// 			headers: {
// 				"if-modified-since": "Mon, 28 Jan 2019 00:00:00 GMT"
// 			}
// 		});
// 		assert.equal(response.status, 200);
// 		assert.equal(response.headers.age, 0);
// 	});
// });

// describe("Request with a If-Modified-Since value which is the same as the last-modified", function() {
// 	it(`responds with a 304 and an Age reset to 0`, async function() {
// 		const firstResponse = await axios.get(`/v3/polyfill.min.js?features=${randomFeature}`);
// 		assert.equal(firstResponse.status, 200);
// 		const lastModified = firstResponse.headers["last-modified"];
// 		const response = await axios.get(`/v3/polyfill.min.js?features=${randomFeature}`, {
// 			headers: {
// 				"if-modified-since": lastModified
// 			}
// 		});
// 		assert.equal(response.status, 304);
// 		assert.equal(response.headers.age, 0);
// 	});
// });
