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
		response.redirect(302, `${request.basePath}v2/docs/`);
	});
};
