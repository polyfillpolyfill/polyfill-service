"use strict";

module.exports = app => {
	// Redirect to the docs page
	app.get("/", (request, response) => {
		response.set({
			"cache-control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
		});
		response.redirect(301, `${request.basePath}v3/`);
	});
};
