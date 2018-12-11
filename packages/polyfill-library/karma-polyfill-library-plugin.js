"use strict";

const path = require('path');

const createPattern = function (path) {
  return {pattern: path, included: true, served: true, watched: false};
};

const fileForMiddlewareToOverride = '/lib/index.js';

const initPolyfillLibraryFile = function (files) {
    files.unshift(createPattern(path.join(__dirname, fileForMiddlewareToOverride)));
};

function isAPolyfillRequest(request) {
	return request.url.startsWith(`/base${fileForMiddlewareToOverride}`);
}

function initPolyfillLibraryMiddleware(config) {
    return async function polyfillBundleMiddleWare(request, response, next) {
		if (!isAPolyfillRequest(request)) {
			next();
		} else {
            await respondWithPolyfillBundle(config, request, response);
		}
	};
}

function createPolyfillLibraryConfigFor(features) {
	return features.split(',').reduce((config, feature) => {
		return Object.assign(config, {
			[feature]: {
				flags: new Set()
			}
		});
	}, {});
}

async function respondWithPolyfillBundle(config, request, response) {
	const PolyfillLibrary = require("./lib/index.js");
	const polyfillLibrary = new PolyfillLibrary();

	const params = {
		features: createPolyfillLibraryConfigFor(config.features),
		minify: false,
		stream: false,
		uaString: request.headers["user-agent"]
	};

	const bundle = await polyfillLibrary.getPolyfillString(params);
	response.setHeader("Content-Type", "application/javascript; charset=utf-8");

	response.writeHead(200);
	response.end(bundle);
}

initPolyfillLibraryFile.$inject = ['config.files'];
initPolyfillLibraryMiddleware.$inject = ['config'];

module.exports = {
  'framework:polyfill-library': ['factory', initPolyfillLibraryFile],
  'middleware:polyfill-library': ['factory', initPolyfillLibraryMiddleware]
};
