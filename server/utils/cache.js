const polyfillio = require("polyfill-library");

module.exports = {
	featureParamsToKey(featureParameters) {
		const uaString = polyfillio.normalizeUserAgent(featureParameters.uaString);
		return Buffer.from(JSON.stringify({...featureParameters, uaString})).toString('base64')
	},
}
