"use strict";

const mergeStream = require("merge2");
const { Readable } = require("stream");
const createCompressor = require("../../lib/create-compressor");
const getPolyfillParameters = require("../../lib/get-polyfill-parameters");
const latestVersion = require("polyfill-library/package.json").version;
const polyfillio = require("polyfill-library");
const pipeline = require("util").promisify(require("stream").pipeline);
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
const polyfillio_3_42_0 = require("polyfill-library-3.42.0");
const polyfillio_3_43_0 = require("polyfill-library-3.43.0");
const polyfillio_3_44_0 = require("polyfill-library-3.44.0");
const polyfillio_3_45_0 = require("polyfill-library-3.45.0");
const polyfillio_3_46_0 = require("polyfill-library-3.46.0");
const polyfillio_3_48_0 = require("polyfill-library-3.48.0");
const polyfillio_3_49_0 = require("polyfill-library-3.49.0");
const polyfillio_3_50_2 = require("polyfill-library-3.50.2");
const polyfillio_3_51_0 = require("polyfill-library-3.51.0");
const polyfillio_3_52_0 = require("polyfill-library-3.52.0");
const polyfillio_3_52_1 = require("polyfill-library-3.52.1");

const lastModified = new Date().toUTCString();
async function respondWithBundle(response, params, bundle, next) {
	const compressor = await createCompressor(params.compression);
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
		"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
		"Content-Type": "text/javascript; charset=utf-8",
		"surrogate-key": "polyfill-service",
		"Last-Modified": lastModified
	};
	if (params.compression) {
		headers["Content-Encoding"] = params.compression;
	}
	response.status(200);
	response.set(headers);

	try {
		await pipeline(bundle, compressor, response);
	} catch (e) {
		if (e && e.code !== "ERR_STREAM_PREMATURE_CLOSE") {
			next(e);
		}
	}
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
	app.get(["/v3/polyfill.js", "/v3/polyfill.min.js"], async (request, response, next) => {
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
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.52.1": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_52_1.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.52.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_52_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.51.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_51_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.50.2": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_50_2.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.49.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_49_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.48.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_48_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.46.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_46_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.45.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_45_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.44.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_44_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.43.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_43_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
				break;
			}
			case "3.42.0": {
				if (params.strict) {
					const features = [].concat(await polyfillio.listAliases(), await polyfillio.listAllPolyfills());
					const requestedFeaturesAllExist = params.features.every(feature => features.includes(feature));
					if (!requestedFeaturesAllExist) {
						const requestedFeaturesWhichDoNotExist = params.features.filter(feature => !features.includes(feature));
						await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
						break;
					}
				}
				const bundle = await polyfillio_3_42_0.getPolyfillString(params);
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				await respondWithBundle(response, params, bundle, next);
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
				const bundle = mergeStream(await polyfillio_3_25_3.getPolyfillString(params));

				if (params.callback) {
					bundle.add(Readable.from("\ntypeof " + params.callback + "==='function' && " + params.callback + "();"));
				}

				await respondWithBundle(response, params, bundle, next);
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
				const bundle = mergeStream(await polyfillio_3_25_1.getPolyfillString(params));

				if (params.callback) {
					bundle.add(Readable.from("\ntypeof " + params.callback + "==='function' && " + params.callback + "();"));
				}

				await respondWithBundle(response, params, bundle, next);
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
