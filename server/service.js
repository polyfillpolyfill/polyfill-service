"use strict";

const origamiService = require("@financial-times/origami-service");
const requireAll = require("require-all");
const path = require("path");
const serveStatic = require("serve-static");
const compression = require("compression");
const extractHeaders = require("express-extractheaders");

const notFoundHandler = (request, response) => {
	response.status(404);
	response.set({
		"Cache-Control": "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800",
		"Content-Type": "text/html; charset=UTF-8",
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
	mountRoutes(app);
	app.use(compression({ level: 9 }));
	app.use(extractHeaders());
	app.use(
		serveStatic(path.join(__dirname, "../production"), {
			setHeaders: function(res) {
				res.setHeader("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800");
				res.setHeader("Surrogate-Key", "polyfill-service, polyfill-service-website");
			}
		})
	);
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
