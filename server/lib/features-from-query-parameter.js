"use strict";

module.exports = function featuresfromQueryParam(features, flags) {
	features = features.split(",");
	flags = flags ? flags.split(",") : [];

	features = features.filter(x => x.length).map(x => x.replace(/[\*\/]/g, "")); // Eliminate XSS vuln

	return features.sort().reduce((obj, feature) => {
		const [name, ...featureSpecificFlags] = feature.split("|");
		obj[name] = {
			flags: new Set(featureSpecificFlags.concat(flags))
		};
		return obj;
	}, {});
};
