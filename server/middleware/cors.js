const url = require("node:url");
const { CORSAllowedFirstLevelDomains } = require('../utils/config')


module.exports = (request, response, next) => {
	const referer = request.headers.referer;
	if (!referer) return next();

	try {
		const { protocol, host, hostname } = url.parse(referer)

		if (CORSAllowedFirstLevelDomains.some((allowedHost) => hostname === allowedHost || hostname.endsWith(`.${allowedHost}`))) {
			response.set("Access-Control-Allow-Origin", `${protocol}//${host}`);

			return next();
		}
	} catch (error) {
		console.error(error)
		return response.sendStatus(500)
	}

	return response.sendStatus(403)
}
