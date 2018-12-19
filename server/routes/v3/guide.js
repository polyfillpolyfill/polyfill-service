"use strict";

module.exports = app => {
	app.get("/v3/guide", async (request, response) => {
		response.set({
			"cache-control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
		});
		response.render("guide", {
			title: "Guide"
		});
	});
};
