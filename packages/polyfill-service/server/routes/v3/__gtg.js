"use strict";

module.exports = app => {
	app.get("/v3/__gtg", (request, response) => {
		response.status(200);
		response.set("Cache-Control", "max-age=0, must-revalidate, no-cache, no-store, private");
		response.send("OK");
	});
};
