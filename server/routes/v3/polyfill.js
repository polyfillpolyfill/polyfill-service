"use strict";

const mergeStream = require("merge2");
const { Readable } = require("stream");
const createCompressor = require("../../lib/create-compressor");
const getPolyfillParameters = require("../../lib/get-polyfill-parameters");
const latestVersion = require("polyfill-library/package.json").version;
const polyfillio = require("polyfill-library");
const pipeline = require("util").promisify(require("stream").pipeline);
const polyfillio_3_27_4 = require("polyfill-library-3.27.4");
const polyfillio_3_25_1 = require("polyfill-library-3.25.1");
const polyfillio_3_34_0 = require("polyfill-library-3.34.0");
const polyfillio_3_39_0 = require("polyfill-library-3.39.0");
const polyfillio_3_40_0 = require("polyfill-library-3.40.0");
const polyfillio_3_41_0 = require("polyfill-library-3.41.0");
const polyfillio_3_42_0 = require("polyfill-library-3.42.0");
const polyfillio_3_46_0 = require("polyfill-library-3.46.0");
const polyfillio_3_48_0 = require("polyfill-library-3.48.0");
const polyfillio_3_50_2 = require("polyfill-library-3.50.2");
const polyfillio_3_51_0 = require("polyfill-library-3.51.0");
const polyfillio_3_52_0 = require("polyfill-library-3.52.0");
const polyfillio_3_52_1 = require("polyfill-library-3.52.1");
const polyfillio_3_52_2 = require("polyfill-library-3.52.2");
const polyfillio_3_52_3 = require("polyfill-library-3.52.3");
const polyfillio_3_53_1 = require("polyfill-library-3.53.1");
const polyfillio_3_89_4 = require("polyfill-library-3.89.4");
const polyfillio_3_96_0 = require("polyfill-library-3.96.0");
const polyfillio_3_98_0 = require("polyfill-library-3.98.0");
const polyfillio_3_101_0 = require("polyfill-library-3.101.0");
const polyfillio_3_103_0 = require("polyfill-library-3.103.0");
const polyfillio_3_104_0 = require("polyfill-library-3.104.0");
const polyfillio_3_108_0 = require("polyfill-library-3.108.0");
const polyfillio_3_109_0 = require("polyfill-library-3.109.0");
const polyfillio_3_110_1 = require("polyfill-library-3.110.1");
const polyfillio_3_111_0 = require("polyfill-library-3.111.0");

const lastModified = new Date().toUTCString();
async function respondWithBundle(response, parameters, bundle, next) {
	const compressor = await createCompressor(parameters.compression);
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
		"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
		"Content-Type": "text/javascript; charset=UTF-8",
		"surrogate-key": "polyfill-service",
		"Last-Modified": lastModified
	};
	if (parameters.compression) {
		headers["Content-Encoding"] = parameters.compression;
	}
	response.status(200);
	response.set(headers);

	try {
		await pipeline(bundle, compressor, response);
	} catch (error) {
		if (error && error.code !== "ERR_STREAM_PREMATURE_CLOSE") {
			next(error);
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

// provide option for consumers to run their service on another context path
const contextPath = process.env.CONTEXT_PATH || "";

module.exports = app => {
	app.get([`${contextPath}/v3/polyfill.js`, `${contextPath}/v3/polyfill.min.js`], async (request, response, next) => {
		const parameters = getPolyfillParameters(request);

		// Map the version parameter to a version of the polyfill library.
		const versionToLibraryMap = new Map([
			[latestVersion, polyfillio],
			['3.25.1', polyfillio_3_25_1],
			['3.27.4', polyfillio_3_27_4],
			['3.34.0', polyfillio_3_34_0],
			['3.39.0', polyfillio_3_39_0],
			['3.40.0', polyfillio_3_40_0],
			['3.41.0', polyfillio_3_41_0],
			['3.42.0', polyfillio_3_42_0],
			['3.46.0', polyfillio_3_46_0],
			['3.48.0', polyfillio_3_48_0],
			['3.50.2', polyfillio_3_50_2],
			['3.51.0', polyfillio_3_51_0],
			['3.52.0', polyfillio_3_52_0],
			['3.52.1', polyfillio_3_52_1],
			['3.52.2', polyfillio_3_52_2],
			['3.52.3', polyfillio_3_52_3],
			['3.53.1', polyfillio_3_53_1],
			['3.89.4', polyfillio_3_89_4],
			['3.96.0', polyfillio_3_96_0],
			['3.98.0', polyfillio_3_98_0],
			['3.101.0', polyfillio_3_101_0],
			['3.103.0', polyfillio_3_103_0],
			['3.104.0', polyfillio_3_104_0],
			['3.108.0', polyfillio_3_108_0],
			['3.109.0', polyfillio_3_109_0],
			['3.110.1', polyfillio_3_110_1],
			['3.111.0', polyfillio_3_111_0],
		]);

		// Get the polyfill library for the requested version.
		const polyfillLibrary = versionToLibraryMap.get(parameters.version);

		// 404 if no library for the requested version was found.
		if (!polyfillLibrary) {
			response.status(400);
			response.set({
				"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
				"surrogate-key": "polyfill-service"
			});
			response.send(`requested version does not exist`);
			return;
		}

		// 400 if requested polyfills are missing
		if (polyfillLibrary && parameters.strict) {
			const features = new Set([...Object.values(await polyfillio.listAliases()).flat(), ...Object.values(await polyfillio.listAllPolyfills()).flat()]);
			const requestedFeaturesAllExist = Object.keys(parameters.features).every(feature => features.has(feature));
			if (!requestedFeaturesAllExist) {
				const requestedFeaturesWhichDoNotExist = Object.keys(parameters.features).filter(feature => !features.has(feature));
				await respondWithMissingFeatures(response, requestedFeaturesWhichDoNotExist);
				return;
			}
		}

		// Return a polyfill bundle
		switch (parameters.version) {
			case "3.25.1": {
				const bundle = mergeStream(await polyfillLibrary.getPolyfillString(parameters));

				if (parameters.callback) {
					bundle.add(Readable.from("\ntypeof " + parameters.callback + "==='function' && " + parameters.callback + "();"));
				}

				await respondWithBundle(response, parameters, bundle, next);
				break;
			}
			default: {
				const bundle = await polyfillLibrary.getPolyfillString(parameters);
				await respondWithBundle(response, parameters, bundle, next);
				return;
			}
		}
	});
};
