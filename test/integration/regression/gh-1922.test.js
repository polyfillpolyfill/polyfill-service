/* eslint-env mocha */

"use strict";

const axios = require("axios");
const proclaim = require("proclaim");
const host = require("../helpers").host;

describe("https://github.com/Financial-Times/polyfill-service/issues/1922", function() {
	this.timeout(30000);
	describe(`GET ${host}/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=&compression=br&excludes=&features=IntersectionObserver%2Cdefault%2Cfetch&flags=&rum=0&ua=chrome%2F72.0.0&unknown=ignore&version=3.25.1`, function() {
		it("responds with same javascript when ua parameter is url encoded", async function() {
			const nonUrlEncodedUa = (
				await axios.get(
					host +
						"/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=&compression=br&excludes=&features=IntersectionObserver%2Cdefault%2Cfetch&flags=&rum=0&ua=chrome/72.0.0&unknown=ignore&version=3.25.1"
				)
			).data;
			const urlEncodedUa = (
				await axios.get(
					host +
						"/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=&compression=br&excludes=&features=IntersectionObserver%2Cdefault%2Cfetch&flags=&rum=0&ua=chrome%2F72.0.0&unknown=ignore&version=3.25.1"
				)
			).data;
			proclaim.deepStrictEqual(nonUrlEncodedUa, urlEncodedUa);
		});
	});
});
