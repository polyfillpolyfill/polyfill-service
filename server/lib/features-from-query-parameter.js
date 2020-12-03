"use strict";

module.exports = function featuresfromQueryParameter(featuresParameter, flagsParameter) {
	const features = featuresParameter.split(",").filter((f) => f.length);
	const globalFlags = flagsParameter ? flagsParameter.split(",") : [];
	const featuresWithFlags = {};

	for (const feature of features.sort()) {
		// Eliminate XSS vuln
		const safeFeature = feature.replace(/[*/]/g, "");
		const [name, ...featureSpecificFlags] = safeFeature.split("|");
		featuresWithFlags[name] = {
			flags: new Set(featureSpecificFlags.concat(globalFlags)),
		};
	}

	return featuresWithFlags;
};
