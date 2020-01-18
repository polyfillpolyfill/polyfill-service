"use strict";

const compressBundle = require("../../lib/compress-bundle");
const getPolyfillParameters = require("../../lib/get-polyfill-parameters");
const latestVersion = require("polyfill-library/package.json").version;
const polyfillio = require("polyfill-library");
const polyfillio_3_27_4 = require("polyfill-library-3.27.4");
const polyfillio_3_25_3 = require("polyfill-library-3.25.3");
const polyfillio_3_25_1 = require("polyfill-library-3.25.1");
const polyfillio_3_28_1 = require("polyfill-library-3.28.1");
const polyfillio_3_34_0 = require("polyfill-library-3.34.0");
const polyfillio_3_35_0 = require("polyfill-library-3.35.0");
const polyfillio_3_36_0 = require("polyfill-library-3.36.0");
const polyfillio_3_37_0 = require("polyfill-library-3.37.0");
const polyfillio_3_38_0 = require("polyfill-library-3.38.0");
const polyfillio_3_39_0 = require("polyfill-library-3.39.0");
const polyfillio_3_40_0 = require("polyfill-library-3.40.0");
const polyfillio_3_41_0 = require("polyfill-library-3.41.0");

async function respondWithBundle(response, params, bundle) {
	const file = await compressBundle(params.compression, bundle);
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
		"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
		"Content-Type": "text/javascript; charset=utf-8",
		"surrogate-key": "polyfill-service"
	};
	if (params.compression) {
		headers["Content-Encoding"] = params.compression;
	}
	response.status(200);
	response.set(headers);
	response.send(file);
}

async function respondWithMissingFeatures(response, missingFeatures) {
	response.status(400);
	response.set({
		"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
		"surrogate-key": "polyfill-service"
	});
	response.send(`Requested features do not all exist in polyfill-service, please remove them from the URL: ${missingFeatures.join(",")} do not exist.`);
}

module.exports = app => {
	app.get(["/v3/polyfill.js", "/v3/polyfill.min.js"], async (request, response) => {
		const params = getPolyfillParameters(request);
		switch (params.version) {
			case latestVersion: {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.41.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_41_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.40.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_40_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.39.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_39_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.38.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_38_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.37.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_37_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.36.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_36_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.35.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_35_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.34.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_34_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.28.1": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_28_1.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.27.4": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_27_4.getPolyfillString(params);
				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.25.3":
			case "3.25.2": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				let bundle = await polyfillio_3_25_3.getPolyfillString(params);

				if (params.callback) {
					bundle += "\ntypeof " + params.callback + "==='function' && " + params.callback + "();";
				}

				await respondWithBundle(response, params, bundle);
				break;
			}
			case "3.25.1": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				let bundle = await polyfillio_3_25_1.getPolyfillString(params);

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
