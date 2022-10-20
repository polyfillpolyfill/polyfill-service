"use strict";
const { serveStaticSite } = require("../utils/process");

module.exports = app => {
	app.get("/", (request, response) => {
		if (!serveStaticSite) {
			return response.sendStatus(404);
		}

		response.set({
			"cache-control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
		});
		response.redirect(301, `${request.basePath}v3/`);
	});
};
