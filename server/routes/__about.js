"use strict";

const aboutInfo = require("../../about.json");

module.exports = app => {
	app.get("/__about", (request, response) => {
		response.status(200);
		response.set("Cache-Control", "max-age=0, must-revalidate, no-cache, no-store, private");
		response.json(aboutInfo);
	});
};
