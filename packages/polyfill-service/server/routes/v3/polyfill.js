"use strict";

const sha256 = require("../../lib/sha-256");
const compressBundle = require("../../lib/compress-bundle");
const createPolyfillLibrary = require("../../lib/create-polyfill-library");
const getPolyfillParameters = require("../../lib/get-polyfill-parameters");
const createPolyfillBundle = require("../../lib/create-polyfill-bundle");

module.exports = app => {
	app.get(["/v3/polyfill.js", "/v3/polyfill.min.js"], async (request, response) => {
		const params = getPolyfillParameters(request);
		const polyfillio = await createPolyfillLibrary(params.version);
		const bundle = await createPolyfillBundle(params, polyfillio);
		const etag = await sha256(bundle);
		const file = await compressBundle(params.compression, bundle);
		response.status(200);
		response.set({
			"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
			"Content-Encoding": params.compression,
			"Content-Type": "application/javascript; charset=UTF-8",
			Etag: etag,
			"surrogate-key": "polyfill-service"
		});
		response.send(file);
	});
};
