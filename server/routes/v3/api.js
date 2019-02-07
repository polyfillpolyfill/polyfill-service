"use strict";

module.exports = app => {
	app.get("/v3/api", async (request, response) => {
		response.set({
			"cache-control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
		});
		response.render("api", {
			modifier: "o-layout--docs",
			api: true
		});
	});
};
