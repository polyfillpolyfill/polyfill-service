"use strict";

module.exports = app => {
	app.get("/v3/report-a-bug", async (request, response) => {
		response.render("report-a-bug");
	});
};
