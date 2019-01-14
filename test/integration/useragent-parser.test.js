/* eslint-env mocha */
"use strict";

const fs = require("fs-extra");
const assert = require("proclaim");
const request = require("supertest");
const yaml = require("yamlparser");
const utf8 = require("utf8");

const host = require("./helpers").host;

const filePath = require.resolve("uap-core/regexes.yaml");

const refImpl = require("uap-ref-impl")(readYAML(filePath));

function readYAML(fileName) {
	const data = fs.readFileSync(fileName, "utf8");
	return yaml.eval(data);
}

function msg(name, actual, expected) {
	return "Expected " + name + " to be " + JSON.stringify(expected) + " got " + JSON.stringify(actual) + " instead.";
}

function fixFixture(f, props) {
	// A bug in the YAML parser makes empty fixture props
	// return a vanila object.
	props.forEach(function(p) {
		if (typeof f[p] === "object") {
			f[p] = null;
		}
	});
	return f;
}

// describe("useragent-parser should pass tests from the ua-parser/uap-core project", function() {
// 	this.timeout(30000);
// 	[
// 		require.resolve("uap-core/test_resources/firefox_user_agent_strings.yaml"),
// 		require.resolve("uap-core/tests/test_ua.yaml"),
// 		require.resolve("uap-core/test_resources/pgts_browser_list.yaml"),
// 		require.resolve("uap-core/test_resources/opera_mini_user_agent_strings.yaml"),
// 		require.resolve("uap-core/test_resources/podcasting_user_agent_strings.yaml")
// 	].forEach(function(fileName) {
// 		const fixtures = readYAML(fileName).test_cases;
// 		fixtures.forEach(function(f) {
// 			it(`parses ${f.user_agent_string} correctly`, function() {
// 				const ua = refImpl.parse(f.user_agent_string).ua;
// 				fixFixture(f, ["major", "minor", "patch"]);
// 				assert.strictEqual(ua.family, f.family, msg("ua.family", ua.family, f.family));
// 				assert.strictEqual(ua.major, f.major, msg("ua.major", ua.major, f.major));
// 				assert.strictEqual(ua.minor, f.minor, msg("ua.minor", ua.minor, f.minor));
// 				assert.strictEqual(ua.patch, f.patch, msg("ua.patch", ua.patch, f.patch));

// 				return request(host)
// 					.get("/v3/parseUa")
// 					.set("User-Agent", f.user_agent_string)
// 					.then(res => {
// 						assert.strictEqual(res.headers.useragent_parser_family, utf8.encode(f.family || ""));
// 						assert.strictEqual(res.headers.useragent_parser_major, utf8.encode(f.major || ""));
// 						assert.strictEqual(res.headers.useragent_parser_minor, utf8.encode(f.minor || ""));
// 						assert.strictEqual(res.headers.useragent_parser_patch, utf8.encode(f.patch || ""));
// 					});
// 			});
// 		});
// 	});
// });
