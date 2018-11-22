"use strict";

const compressBundle = require("../../lib/compress-bundle");
const getPolyfillParameters = require("../../lib/get-polyfill-parameters");
const latestVersion = require("polyfill-library/package.json").version;
const PolyfillLibrary = require("polyfill-library");
const polyfillio_3_25_2 = require("polyfill-library-3.25.2");

async function respondWithBundle(response, params, bundle) {
	const file = await compressBundle(params.compression, bundle);
	const headers = {
		"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
		"Content-Encoding": params.compression,
		"Content-Type": "application/javascript; charset=utf-8",
		"surrogate-key": "polyfill-service"
	};
	response.status(200);
	response.set(headers);
	response.send(file);
}

module.exports = app => {
	app.get(["/v3/polyfill.js", "/v3/polyfill.min.js"], async (request, response) => {
		const params = getPolyfillParameters(request);
		switch (params.version) {
			case latestVersion: {
				const polyfillio = new PolyfillLibrary();
				const bundle = await polyfillio.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.25.2": {
				let bundle = await polyfillio_3_25_2.getPolyfillString(params);

				if (params.callback) {
					bundle += "\ntypeof " + params.callback + "==='function' && " + params.callback + "();";
				}

				await respondWithBundle(response, params, bundle);
				break;
			}
			default: {
				response.status(400);
				response.set({
					"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
					"surrogate-key": "polyfill-service"
				});
				response.send(`version: ${params.version} does not exist`);
				break;
			}
		}
	});
};
