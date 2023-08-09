/* eslint-env mocha */

"use strict";

import assert from "node:assert";
import axios from "../helpers.js";

describe("https://github.com/JakeChampion/polyfill-service/issues/1922", function() {
	describe(`GET /v3/normalise_querystring_parameters_for_polyfill_bundle?callback=&compression=br&excludes=&features=IntersectionObserver%2Cdefault%2Cfetch&flags=&rum=0&ua=chrome%2F72.0.0&unknown=ignore&version=3.25.1`, function() {
		it("responds with same javascript when ua parameter is url encoded", async function() {
			const nonUrlEncodedUa = (
				await axios.get(
						"/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=&compression=br&excludes=&features=IntersectionObserver%2Cdefault%2Cfetch&flags=&rum=0&ua=chrome/72.0.0&unknown=ignore&version=3.25.1"
				)
			).data;
			const urlEncodedUa = (
				await axios.get(
						"/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=&compression=br&excludes=&features=IntersectionObserver%2Cdefault%2Cfetch&flags=&rum=0&ua=chrome%2F72.0.0&unknown=ignore&version=3.25.1"
				)
			).data;
			assert.deepStrictEqual(nonUrlEncodedUa, urlEncodedUa);
		});
	});
});
