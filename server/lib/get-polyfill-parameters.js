"use strict";

const latestVersion = require("polyfill-library/package.json").version;
const featuresfromQueryParameter = require("./features-from-query-parameter");

function getCompressionFromAcceptEncoding(request) {
	const acceptEncoding = (request.headers && request.headers["accept-encoding"]) || (typeof request.get === "function" && request.get("accept-encoding")) || "";
	if (/\bbr\b/.test(acceptEncoding)) {
		return "br";
	}
	if (/\bgzip\b/.test(acceptEncoding)) {
		return "gzip";
	}
}
module.exports = function getPolyfillParameters(request = {}) {
	const query = request.query || {};
	const path = request.path || "";
	const { excludes = "", features = "default", rum, unknown = "polyfill", version, callback, ua, flags } = query;
	const uaString = ua || (request.headers && request.headers["user-agent"]) || (typeof request.get === "function" && request.get("User-Agent")) || "";
	const compression = query.compression && query.compression !== "identity" ? query.compression : getCompressionFromAcceptEncoding(request);
	const strict = Object.prototype.hasOwnProperty.call(query, "strict");

	return {
		excludes: excludes ? excludes.split(",") : [],
		features: featuresfromQueryParameter(features, flags),
		minify: path.endsWith(".min.js"),
		rum: Number.parseInt(rum, 10) === 1,
		stream: true,
		callback: /^[\w.]+$/.test(callback || "") ? callback : false,
		unknown,
		uaString,
		version: version || latestVersion,
		compression,
		strict
	};
};
