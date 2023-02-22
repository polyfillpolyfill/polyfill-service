const latestVersion = '3.111.0';

function featuresfromQueryParameter(featuresParameter, flagsParameter) {
	const features = featuresParameter.split(",").filter((f) => f.length);
	const globalFlags = flagsParameter ? flagsParameter.split(",") : [];
	const featuresWithFlags = {};

	for (const feature of features.sort()) {
		// Eliminate XSS vuln
		const safeFeature = feature.replace(/[*/]/g, "");
		const [name, ...featureSpecificFlags] = safeFeature.split("|");
		featuresWithFlags[name.replace(/\?/g, '')] = {
			flags: new Set(featureSpecificFlags.concat(globalFlags)),
		};
	}

	if (featuresWithFlags.all) {
		featuresWithFlags.default = featuresWithFlags.all;
		delete featuresWithFlags.all;
	}

	return featuresWithFlags;
}

export function getPolyfillParameters(requestURL) {
	const query = requestURL.searchParams;
	const path = requestURL.pathname;
	const excludes = query.get('excludes') || '';
	const features = query.get('features') || "default";
	const unknown = query.get('unknown') || "polyfill"
	const version = query.get('version');
	const callback = query.get('callback');
	const ua = query.get('ua');
	const flags = query.get('flags');

	const uaString = ua || "";
	const strict = Object.prototype.hasOwnProperty.call(query, "strict");

	return {
		excludes: excludes ? excludes.split(",") : [],
		features: featuresfromQueryParameter(features, flags),
		minify: path.endsWith(".min.js"),
		callback: /^[\w.]+$/.test(callback || "") ? callback : false,
		unknown,
		uaString,
		version: version || latestVersion,
		strict
	};
}
