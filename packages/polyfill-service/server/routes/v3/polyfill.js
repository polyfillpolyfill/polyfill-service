"use strict";

const sha256 = require("../../lib/sha-256");
const compressBundle = require("../../lib/compress-bundle");
const getPolyfillParameters = require("../../lib/get-polyfill-parameters");
const latestVersion = require("polyfill-library/package.json").version;
const PolyfillLibrary = require("polyfill-library");
const polyfillio_3_25_2 = require("polyfill-library-3.25.2");

module.exports = app => {
	app.get(["/v3/polyfill.js", "/v3/polyfill.min.js"], async (request, response) => {
		const params = getPolyfillParameters(request);
		switch (params.version) {
			case latestVersion: {
				const polyfillio = new PolyfillLibrary();
				const bundle = await polyfillio.getPolyfillString(params);
				const etag = await sha256(bundle);
				const file = await compressBundle(params.compression, bundle);
				response.status(200);
				response.set({
					"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
					"Content-Encoding": params.compression,
					"Content-Type": "application/javascript; charset=utf-8",
					Etag: etag,
					"surrogate-key": "polyfill-service"
				});
				response.send(file);
				break;
			}
			case "3.25.2": {
				let bundle = await polyfillio_3_25_2.getPolyfillString(params);

				if (params.callback) {
					bundle += "\ntypeof " + params.callback + "==='function' && " + params.callback + "();";
				}

				const etag = await sha256(bundle);
				const file = await compressBundle(params.compression, bundle);

				response.status(200);
				response.set({
					"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
					"Content-Encoding": params.compression,
					"Content-Type": "application/javascript; charset=utf-8",
					Etag: etag,
					"surrogate-key": "polyfill-service"
				});
				response.send(file);
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
