/* eslint-env mocha */

"use strict";

import proclaim from "proclaim";
import axios from "../helpers.js";

describe("https://github.com/Financial-Times/polyfill-service/issues/1922", function() {
	describe(`GET /v3/normalise_querystring_parameters_for_polyfill_bundle?callback=&compression=br&excludes=&features=IntersectionObserver%2Cdefault%2Cfetch&flags=&rum=0&ua=chrome%2F72.0.0&unknown=ignore&version=3.25.1`, function() {
		it("responds with same javascript when ua parameter is url encoded", async function() {
			const nonUrlEncodedUa = (
				await axios.get(
						"/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=&compression=br&excludes=&features=IntersectionObserver%2Cdefault%2Cfetch&flags=&rum=0&ua=chrome/72.0.0&unknown=ignore&version=3.25.1&use-compute-at-edge-backend=yes"
				)
			).data;
			const urlEncodedUa = (
				await axios.get(
						"/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=&compression=br&excludes=&features=IntersectionObserver%2Cdefault%2Cfetch&flags=&rum=0&ua=chrome%2F72.0.0&unknown=ignore&version=3.25.1&use-compute-at-edge-backend=yes"
				)
			).data;
			proclaim.deepStrictEqual(nonUrlEncodedUa, urlEncodedUa);
		});
	});
});
