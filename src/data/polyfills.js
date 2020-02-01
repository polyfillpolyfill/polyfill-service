"use strict";

const _ = require("lodash");
const snakeCase = _.snakeCase;
const polyfillLibrary = require("polyfill-library");

module.exports = async () => {
	const polyfills = [];
	const polyfillAliases = [];
	if (polyfills.length === 0) {
		const aliases = await polyfillLibrary.listAliases();
		for (const alias of Object.keys(aliases).sort()) {
			if (!alias.startsWith("caniuse") && !alias.startsWith("default-") && !alias.startsWith("modernizr")) {
				if (aliases[alias].length > 1) {
					if (alias === "default") {
						polyfillAliases.push({
							name: alias,
							labelID: `${snakeCase(alias)}_label`,
							polyfills: aliases[alias],
							isDefaultSet: true
						});
					} else if (alias !== "all") {
						polyfillAliases.push({
							name: alias,
							labelID: `${snakeCase(alias)}_label`,
							polyfills: aliases[alias]
						});
					}
				} else {
					polyfills.push({
						name: alias,
						labelID: `${snakeCase(alias)}_label`,
						aliasFor: aliases[alias]
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

		// non-icu case-sensitive alphabetical sort
		polyfills.sort((a, b) =>
			a.name > b.name
			? 1
			: a.name < b.name
			? -1
			: 0
		);
	}

	return {
		polyfills,
		polyfillAliases
	};
};
