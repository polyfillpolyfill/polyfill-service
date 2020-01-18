"use strict";

const latestVersion = require("polyfill-library/package.json").version;
const featuresfromQueryParam = require("./features-from-query-parameter");

module.exports = function getPolyfillParameters(req = {}) {
	const query = req.query || {};
	const path = req.path || "";
	const { excludes = "", features = "default", rum, unknown = "polyfill", version, callback } = query;
	const uaString = query.ua || (req.headers && req.headers["user-agent"]) || (typeof req.get === "function" && req.get("User-Agent")) || "";
	const compression = query.compression !== "identity" ? query.compression : undefined;
	const strict = Object.prototype.hasOwnProperty.call(query, "strict");

	return {
		excludes: excludes ? excludes.split(",") : [],
		features: featuresfromQueryParam(features, query.flags),
		minify: path.endsWith(".min.js"),
		rum: Number.parseInt(rum, 10) === 1,
		stream: false,
		callback: /^[\w\.]+$/.test(callback || "") ? callback : false,
		unknown,
		uaString,
		version: version || latestVersion,
		compression,
		strict
	};
};
