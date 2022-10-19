"use strict";

module.exports = app => {
	app.get("/", (request, response) => {
		response.redirect(301, `${request.basePath}v3/polyfill.min.js`);
	});
};
