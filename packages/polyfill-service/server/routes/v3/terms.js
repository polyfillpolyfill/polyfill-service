"use strict";

module.exports = app => {
	app.get("/v3/terms", async (request, response) => {
		response.render("terms", {
			title: "Terms"
		});
	});
};
