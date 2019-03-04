"use strict";

const origamiService = require("@financial-times/origami-service");
const requireAll = require("require-all");
const path = require("path");
const serveStatic = require("serve-static");

const notFoundHandler = (request, response) => {
	response.status(404);
	response.set({
		"Cache-Control": "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800",
		"Content-Type": "text/html; charset=utf-8",
		"Surrogate-Key": "polyfill-service"
	});
	response.send("Not Found");
};

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
	app.use(serveStatic(path.join(__dirname, "../dist")));
	mountRoutes(app);
	app.use(notFoundHandler);
	app.use(origamiService.middleware.errorHandler());

	return app;
}

function mountRoutes(app) {
	requireAll({
		dirname: `${__dirname}/routes`,
		resolve: initRoute => initRoute(app)
	});
}
