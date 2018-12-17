"use strict";

const cacheControl = require("@financial-times/origami-service").middleware.cacheControl;

module.exports = app => {
	const cacheForOneDay = cacheControl({
		maxAge: "1 day",
		staleWhileRevalidate: "7 days",
		staleIfError: "7 days"
	});

	// Redirect to the docs page
	app.get("/", cacheForOneDay, (request, response) => {
		response.set({
			"cache-control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
		});
		response.redirect(302, `${request.basePath}v2/docs/`);
	});
};
