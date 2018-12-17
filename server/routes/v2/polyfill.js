"use strict";

const polyfillio = require("polyfill-library-3.25.3");

const featuresfromQueryParam = require("../../lib/features-from-query-parameter");
const pump = require("pump");
const mergeStream = require("merge2");
const streamFromString = require("from2-string");

module.exports = app => {
	app.get(["/v2/polyfill.js", "/v2/polyfill.min.js"], (req, res) => {
		const minified = req.path.endsWith(".min.js");
		const uaString = (typeof req.query.ua === "string" && req.query.ua) || req.header("user-agent");
		// If inbound request did not specify UA on the query string, the cache key must use the HTTP header
		if (!req.query.ua) {
			res.set("Vary", "User-Agent");
		}

		const params = {
			features: featuresfromQueryParam(req.query.features || "default", req.query.flags),
			excludes: (typeof req.query.excludes === "string" && req.query.excludes.split(",")) || [],
			minify: minified,
			rum: Number.parseInt(req.query.rum, 10) === 1,
			stream: true
		};
		if (req.query.unknown) {
			params.unknown = req.query.unknown === "polyfill" ? "polyfill" : "ignore";
		}
		if (uaString) {
			params.uaString = uaString;
		}

		res.set("Content-Type", "application/javascript" + ";charset=utf-8");
		res.set("Access-Control-Allow-Origin", "*");

		const outputStream = mergeStream();

		outputStream.add(polyfillio.getPolyfillString(params));

		if (req.query.callback && typeof req.query.callback === "string" && req.query.callback.match(/^[\w\.]+$/)) {
			outputStream.add(streamFromString("\ntypeof " + req.query.callback + "==='function' && " + req.query.callback + "();"));
		}

		pump(outputStream, res, err => {
			if (err) {
				console.error(err);
			}
		});
	});
};
