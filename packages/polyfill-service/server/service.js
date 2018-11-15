"use strict";

const origamiService = require("@financial-times/origami-service");
const requireAll = require("require-all");
const path = require("path");

module.exports = service;

function service(options) {
	options.defaultLayout = "main";
	options.basePath = path.join(__dirname, "../");

	const app = origamiService(options);
	app.use(origamiService.middleware.getBasePath());
	app.use((request, response, next) => {
		response.locals.requestUrl = request.url;
		next();
	});
	mountRoutes(app);
	app.use(origamiService.middleware.notFound());
	app.use(origamiService.middleware.errorHandler());

	return app;
}

function mountRoutes(app) {
	requireAll({
		dirname: `${__dirname}/routes`,
		resolve: initRoute => initRoute(app)
	});
}
