/* eslint-env mocha */

"use strict";

const axios = require("axios");
const proclaim = require("proclaim");
const host = require("../helpers").host;

describe("https://github.com/Financial-Times/polyfill-service/issues/1910", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		describe("GET /v2/polyfill.js?features=Promise&unknown=polyfill&flags=always,gated", function() {
			it("responds with same javascript when flags parameter is url encoded", async function() {
				const nonUrlEncodedFlag = (await axios.get(host + "/v2/polyfill.js?features=Promise&unknown=polyfill&flags=always,gated&use-compute-at-edge-backend=yes")).data;
				const urlEncodedFlag = (await axios.get(host + "/v2/polyfill.js?features=Promise&unknown=polyfill&flags=always%2Cgated&use-compute-at-edge-backend=yes")).data;
				proclaim.strictEqual(nonUrlEncodedFlag, urlEncodedFlag);
			});
		});

		describe("GET /v3/polyfill.js?features=Promise&unknown=polyfill&flags=always,gated", function() {
			it("responds with same javascript when flags parameter is url encoded", async function() {
				const nonUrlEncodedFlag = (await axios.get(host + "/v3/polyfill.js?features=Promise&unknown=polyfill&flags=always,gated&use-compute-at-edge-backend=yes")).data;
				const urlEncodedFlag = (await axios.get(host + "/v3/polyfill.js?features=Promise&unknown=polyfill&flags=always%2Cgated&use-compute-at-edge-backend=yes")).data;
				proclaim.strictEqual(nonUrlEncodedFlag, urlEncodedFlag);
			});
		});
	});

	context('vcl service', function() {
		describe("GET /v2/polyfill.js?features=Promise&unknown=polyfill&flags=always,gated", function() {
			it("responds with same javascript when flags parameter is url encoded", async function() {
				const nonUrlEncodedFlag = (await axios.get(host + "/v2/polyfill.js?features=Promise&unknown=polyfill&flags=always,gated&use-compute-at-edge-backend=no")).data;
				const urlEncodedFlag = (await axios.get(host + "/v2/polyfill.js?features=Promise&unknown=polyfill&flags=always%2Cgated&use-compute-at-edge-backend=no")).data;
				proclaim.strictEqual(nonUrlEncodedFlag, urlEncodedFlag);
			});
		});

		describe("GET /v3/polyfill.js?features=Promise&unknown=polyfill&flags=always,gated", function() {
			it("responds with same javascript when flags parameter is url encoded", async function() {
				const nonUrlEncodedFlag = (await axios.get(host + "/v3/polyfill.js?features=Promise&unknown=polyfill&flags=always,gated&use-compute-at-edge-backend=no")).data;
				const urlEncodedFlag = (await axios.get(host + "/v3/polyfill.js?features=Promise&unknown=polyfill&flags=always%2Cgated&use-compute-at-edge-backend=no")).data;
				proclaim.strictEqual(nonUrlEncodedFlag, urlEncodedFlag);
			});
		});
	});
});
