"use strict";

const _ = require("lodash");
const snakeCase = _.snakeCase;

class Test {
	data() {
		return {
			pagination: {
				data: "versions",
				size: 1,
				alias: "version"
			},
			permalink: data => {
				return `json/library-${data.version}.json`;
			},
			versions: [
				"3.27.4",
				"3.28.1",
				"3.34.0",
				"3.35.0",
				"3.36.0",
				"3.37.0",
				"3.38.0",
				"3.39.0",
				"3.40.0",
				"3.41.0",
				"3.42.0",
				"3.43.0",
				"3.44.0",
				"3.45.0",
				"3.46.0",
				"3.48.0",
				"3.49.0",
				"3.50.2",
				"3.51.0",
				"3.52.0",
				"3.52.1",
				"3.52.2"
			]
		};
	}

	async render(data) {
		// will always be "Ted"
		return JSON.stringify(await getPolyfillNamesFrom(data.version));
	}
}

module.exports = Test;

async function getPolyfillNamesFrom(libraryVersion) {
	const library = require(`polyfill-library-${libraryVersion}`);

	const polyfills = [];
	const polyfillAliases = [];
	if (polyfills.length === 0) {
		const aliases = await library.listAliases();
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

		for (const polyfill of await library.listAllPolyfills()) {
			// Polyfills which start with _ are internal functions used by other polyfills, they should not be displayed on the website.
			if (!polyfill.startsWith("_") && !polyfill.startsWith("Intl.~locale")) {
				const polyfillInfo = Object.assign(
					{
						name: polyfill,
						labelID: `${snakeCase(polyfill)}_label`,
						license: "MIT"
					},
					await library.describePolyfill(polyfill)
				);
				polyfillInfo.licenseLowerCase = polyfillInfo.license.toLowerCase();
				polyfills.push(polyfillInfo);
			}
		}

		// non-icu case-sensitive alphabetical sort
		polyfills.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
	}

	return {
		polyfills,
		polyfillAliases,
		version: libraryVersion
	};
}
