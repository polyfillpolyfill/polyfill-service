"use strict";

function featuresfromQueryParam(features, flags) {
	features = features.split(",");
	flags = flags ? flags.split(",") : [];

	features = features.filter(x => x.length).map(x => x.replace(/[\*\/]/g, "")); // Eliminate XSS vuln

	return features.sort().reduce((obj, feature) => {
		const [name, ...featureSpecificFlags] = feature.split("|");
		obj[name] = {
			flags: new Set(featureSpecificFlags.concat(flags))
		};
		return obj;
	}, {});
}

module.exports = function getPolyfillParameters(event = {}) {
	const query = event.queryStringParameters || {};
	const headers = event.headers || {};
	const path = event.path || "";
	const { excludes = "", features = "default", rum, unknown = "polyfill", version = "latest", callback } = query;
	const uaString = query.ua || headers["User-Agent"] || "";
	const compression = query.compression !== "identity" ? query.compression : undefined;

	return {
		excludes: excludes ? excludes.split(",") : [],
		features: featuresfromQueryParam(features, query.flags),
		minify: path.endsWith(".min.js"),
		rum: Number.parseInt(rum, 10) === 1,
		stream: false,
		callback: /^[\w\.]+$/.test(callback || "") ? callback : false,
		unknown,
		uaString,
		version,
		compression
	};
};
