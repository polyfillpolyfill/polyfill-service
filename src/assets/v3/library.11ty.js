"use strict";

const _ = require("lodash");
const snakeCase = _.snakeCase;
const fs = require("fs/promises");
const path = require("path");
class Test {
	data() {
		return {
			pagination: {
				data: "versions",
				size: 1,
				alias: "version"
			},
			permalink: data => {
				return `v3/json/library-${data.version}.json`;
			},
			versions: [
				"3.27.4",
				"3.34.0",
				"3.39.0",
				"3.40.0",
				"3.41.0",
				"3.42.0",
				"3.46.0",
				"3.48.0",
				"3.50.2",
				"3.51.0",
				"3.52.0",
				"3.52.1",
				"3.52.2",
				"3.52.3",
				"3.53.1",
				"3.89.4",
				"3.96.0",
				"3.98.0",
				"3.101.0",
				"3.103.0",
				"3.104.0",
				"3.108.0",
				"3.109.0",
				"3.110.1",
				"3.111.0",
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
	const aliases = require(`../../../app/polyfill-libraries/polyfill-library-${libraryVersion}/polyfills/__dist/aliases.json`);

	const polyfills = [];
	const polyfillAliases = [];
	if (polyfills.length === 0) {
		for (const alias of Object.keys(aliases).sort()) {
			if (!alias.startsWith("caniuse") && !alias.startsWith("default-") && !alias.startsWith("modernizr") && !alias.includes("~locale")) {
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

		
		let p = await fs.readdir(path.join(__dirname, `../../../app/polyfill-libraries/polyfill-library-${libraryVersion}/polyfills/__dist/`), {
			withFileTypes: true
		});
		p = p.filter(a => a.isDirectory());
		p = p.map(p => p.name)
		for (const polyfill of p)  {
		// console.log({polyfill})
			// Polyfills which start with _ are internal functions used by other polyfills, they should not be displayed on the website.
			if (!polyfill.startsWith("_") && !polyfill.includes("~locale")) {
				const polyfillInfo = Object.assign(
					{
						name: polyfill,
						labelID: `${snakeCase(polyfill)}_label`,
						license: "MIT",
						aliases: [],
					},
					require(`../../../app/polyfill-libraries/polyfill-library-${libraryVersion}/polyfills/__dist/${polyfill}/meta.json`)
				);
				polyfillInfo.licenseLowerCase = polyfillInfo.license.toLowerCase();
				polyfillInfo.aliases = polyfillInfo.aliases.filter(alias => {
					return !alias.includes("~locale");
				});
				polyfills.push(polyfillInfo);
			}
		}

		// non-icu case-sensitive alphabetical sort
		polyfills.sort((a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)));
	}


	return {
		polyfills,
		polyfillAliases,
		version: libraryVersion
	};
}
