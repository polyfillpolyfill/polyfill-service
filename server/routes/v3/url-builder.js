"use strict";

const _ = require("lodash");
const snakeCase = _.snakeCase;
const polyfillLibrary = require("polyfill-library");
const polyfills = [];
const polyfillAliases = [];

module.exports = app => {
	app.get("/v3/url-builder", async (request, response) => {
		if (polyfills.length === 0) {
			const aliases = await polyfillLibrary.sourceslib.listAliases();
			for (const alias of Object.keys(aliases).sort()) {
				if (!alias.startsWith("caniuse") && !alias.startsWith("default-") && !alias.startsWith("modernizr")) {
					if (alias === "default") {
						polyfillAliases.push({
							alias,
							polyfills: aliases[alias],
							isDefaultSet: true
						});
					} else {
						polyfillAliases.push({
							alias,
							polyfills: aliases[alias]
						});
					}
				}
			}
			for (const polyfill of await polyfillLibrary.listAllPolyfills()) {
				// Polyfills which start with _ are internal functions used by other polyfills, they should not be displayed on the website.
				if (!polyfill.startsWith("_") && !polyfill.startsWith("Intl.~locale")) {
					const polyfillInfo = Object.assign(
						{
							name: polyfill,
							labelID: `${snakeCase(polyfill)}_label`,
							license: "MIT"
						},
						await polyfillLibrary.describePolyfill(polyfill)
					);
					polyfillInfo.licenseLowerCase = polyfillInfo.license.toLowerCase();
					polyfills.push(polyfillInfo);
				}
			}
		}
		response.set({
			"cache-control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
		});
		response.render("url-builder", {
			polyfills,
			polyfillAliases
		});
	});
};
