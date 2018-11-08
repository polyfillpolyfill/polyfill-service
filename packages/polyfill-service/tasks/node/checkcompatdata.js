"use strict";

const fs = require("fs-extra");
const path = require("path");
const semver = require("semver");
const inquirer = require("inquirer");
const PolyfillLibrary = require("../../../polyfill-library");
const polyfillLibrary = new PolyfillLibrary();

async function main() {
	const file = path.join(__dirname, "/../../test/results/compat.json");
	// Ensure file exists before proceeding.
	if (!fs.existsSync(file)) {
		throw new Error("Compat results file does not exists, to create the file you need to run the command: `npm run generate-compat-data`.");
	}
	const compat = await fs.readJSON(file);
	const questions = [];
	for (let feature of Object.keys(compat)) {
		feature = feature.split(" ")[0];
		const featureMetadata = await polyfillLibrary.describePolyfill(feature);
		if (!featureMetadata) {
			throw new Error(`${feature} does not exists within the polyfill-library.`);
		}

		for (const browser of Object.keys(compat[feature])) {
			for (const [version, support] of Object.entries(compat[feature][browser])) {
				if (support === "native") {
					if (featureMetadata.browsers && featureMetadata.browsers[browser] && semver.satisfies(semver.coerce(version), featureMetadata.browsers[browser])) {
						const currentRange = featureMetadata.browsers[browser];
						questions.push({
							type: "input",
							name: feature + "|" + browser,
							message: `${browser}/${version} supports ${feature} natively. Please update the configuration for ${feature} to no longer target ${browser}/${version}. Current range is ${currentRange}.`,
							default: function() {
								return JSON.stringify({ [browser]: `<${version}` });
							},
							validate: function(value) {
								const obj = JSON.parse(value);
								const valid = semver.validRange(Object.values(obj)[0]);
								if (valid) {
									return true;
								}

								return "Please enter a valid semver range";
							}
						});
					}
				}
				if (support === "polyfilled") {
					if (!featureMetadata.browsers || !featureMetadata.browsers[browser] || !semver.satisfies(semver.coerce(version), featureMetadata.browsers[browser])) {
						questions.push({
							type: "input",
							name: feature + "|" + browser,
							message: `${browser}/${version} requires a polyfill for ${feature}. Please update the configuration for ${feature} to target ${browser}/${version}.`,
							default: function() {
								return JSON.stringify({ [browser]: `<${Number.parseFloat(version) + 1}` });
							},
							validate: function(value) {
								const obj = JSON.parse(value);
								const valid = semver.validRange(Object.values(obj)[0]);
								if (valid) {
									return true;
								}

								return "Please enter a valid semver range";
							}
						});
					}
				}

				if (support === "missing") {
					if (!featureMetadata.browsers || !featureMetadata.browsers[browser] || !semver.satisfies(semver.coerce(version), featureMetadata.browsers[browser])) {
						questions.push({
							type: "input",
							name: feature + "|" + browser,
							message: `${browser}/${version} requires a polyfill for ${feature}. Please update the configuration for ${feature} to target ${browser}/${version}.`,
							default: function() {
								return JSON.stringify({ [browser]: `<${Number.parseFloat(version) + 1}` });
							},
							validate: function(value) {
								const obj = JSON.parse(value);
								const valid = semver.validRange(Object.values(obj)[0]);
								if (valid) {
									return true;
								}

								return "Please enter a valid semver range";
							}
						});
					}
				}
			}
		}
	}

	async function updateFeature(feature, update) {
		let configPath = path.join(__dirname, "../../../polyfill-library/polyfills", feature.join("/"), "config.json");
		const fileExists = fs.existsSync(configPath);
		if (!fileExists) {
			configPath = path.join(__dirname, "../../../polyfill-library/polyfills", feature.join("."), "config.json");
		}
		const config = await fs.readJSON(configPath);
		config.browsers = config.browsers || {};
		config.browsers = Object.assign(config.browsers, JSON.parse(update));
		await fs.outputJSON(configPath, config, { spaces: 2 });
	}
	if (questions.length > 0) {
		const answers = await inquirer.prompt(questions);
		for (const [featureWithBrowser, value] of Object.entries(answers)) {
			const [feature] = featureWithBrowser.split("|");
			if (typeof value === "object") {
				for (const [featureWithBrowser2, value2] of Object.entries(value)) {
					const [feature2] = featureWithBrowser2.split("|");
					if (typeof value2 === "object") {
						for (const [featureWithBrowser3, value3] of Object.entries(value2)) {
							const [feature3] = featureWithBrowser3.split("|");
							await updateFeature([feature, feature2, feature3], value3);
						}
					} else {
						await updateFeature([feature, feature2], value2);
					}
				}
			} else {
				await updateFeature([feature], value);
			}
		}
	} else {
		console.log("All browsers have correctly configured polyfills. Nice!");
	}
}

main().catch(e => {
	console.error(e);
	process.exitCode = 1;
});
