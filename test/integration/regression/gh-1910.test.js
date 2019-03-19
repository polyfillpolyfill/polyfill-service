/* eslint-env mocha */

"use strict";

const axios = require("axios");
const proclaim = require("proclaim");
const host = require("../helpers").host;

describe("https://github.com/Financial-Times/polyfill-service/issues/1910", function() {
	this.timeout(30000);
	describe("GET /v2/polyfill.js?features=all&unknown=polyfill&flags=always,gated", function() {
		it("responds with same javascript when flags parameter is url encoded", async function() {
			const nonUrlEncodedFlag = (await axios.get(host + "/v2/polyfill.js?features=all&unknown=polyfill&flags=always,gated")).data;
			const urlEncodedFlag = (await axios.get(host + "/v2/polyfill.js?features=all&unknown=polyfill&flags=always%2Cgated")).data;
			proclaim.strictEqual(nonUrlEncodedFlag, urlEncodedFlag);
		});
	});

	describe("GET /v3/polyfill.js?features=all&unknown=polyfill&flags=always,gated", function() {
		it("responds with same javascript when flags parameter is url encoded", async function() {
			const nonUrlEncodedFlag = (await axios.get(host + "/v3/polyfill.js?features=all&unknown=polyfill&flags=always,gated")).data;
			const urlEncodedFlag = (await axios.get(host + "/v3/polyfill.js?features=all&unknown=polyfill&flags=always%2Cgated")).data;
			proclaim.strictEqual(nonUrlEncodedFlag, urlEncodedFlag);
		});
	});
});
