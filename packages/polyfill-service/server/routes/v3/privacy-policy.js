"use strict";

module.exports = app => {
	app.get("/v3/privacy-policy", async (request, response) => {
		response.render("privacy-policy");
	});
};
