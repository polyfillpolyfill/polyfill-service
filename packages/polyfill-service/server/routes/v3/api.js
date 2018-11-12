"use strict";

module.exports = app => {
	app.get("/v3/api", async (request, response) => {
		response.render("api");
	});
};
