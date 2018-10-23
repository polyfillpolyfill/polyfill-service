"use strict";

const semver = require("semver");
const PolyfillLibrary = require("polyfill-library");
const polyfillLibrary = new PolyfillLibrary();

(async function() {
	const polyfills = await polyfillLibrary.listAllPolyfills();

	for (const polyfill of polyfills) {
		const metadata = await polyfillLibrary.describePolyfill(polyfill);
		// TODO:
		// Ensure all polyfills have a browsers field. Why would we have a polyfill which target no browsers?!
		// Ensure doc and spec links return a 200.
		// Ensure that a detectSource property exists.
		if (metadata && metadata.browsers) {
			for (const [browser, range] of Object.entries(metadata.browsers)) {
				if (!semver.validRange(range)) {
					throw new Error(`The polyfill ${polyfill} contains an invalid SemVer range for ${browser}.`);
				}
			}
		}
	}
})();
