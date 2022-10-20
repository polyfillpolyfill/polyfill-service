const url = require("node:url");
const { CORSAllowedFirstLevelDomains } = require('../utils/process')


module.exports = (request, response, next) => {
	const referer = request.headers.referer;
	if (!referer) return next();

	try {
		const { protocol, hostname, host } = url.parse(referer)
		const refererFirstLevelHost = hostname.match(/(\w+\.)?\w+$/)[0]

		if (CORSAllowedFirstLevelDomains.has(refererFirstLevelHost)) {
			response.set("Access-Control-Allow-Origin", `${protocol}//${host}`);

			return next();
		}
	} catch (error) {
		console.error(error)
		return response.sendStatus(500)
	}

	return response.sendStatus(403)
}
