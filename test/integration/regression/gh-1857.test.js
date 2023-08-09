/* eslint-env mocha */

"use strict";

import assert from "node:assert";
import axios from "../helpers.js";

describe("https://github.com/JakeChampion/polyfill-service/issues/1857", function() {
	it("responds with a bundle containing the correct polyfills", async function() {
		const response = await axios.get(`/v3/polyfill.js?unknown=polyfill&features=default%2Cfetch%2CArray.prototype.%40%40iterator%2CArray.prototype.find%2CArray.prototype.findIndex%2CFunction.name%2CNumber.isFinite%2CPromise%2CString.prototype.repeat%2CArray.prototype.includes%2CIntl.~locale.en-US%2CPromise.prototype.finally&excludes=Symbol.toStringTag`, {
			headers:{
				'user-agent': "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko"
			}
		});
		assert.ok(typeof response.data, "string");
		assert.ok(
			response.data.includes(
				"Features requested: Array.prototype.@@iterator,Array.prototype.find,Array.prototype.findIndex,Array.prototype.includes,Function.name,Intl.~locale.en-US,Number.isFinite,Promise,Promise.prototype.finally,String.prototype.repeat,default,fetch"
			)
		);
		assert.ok(!response.data.includes("* No polyfills found for current settings */"));
	});
});
