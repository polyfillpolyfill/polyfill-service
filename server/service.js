"use strict";

const origamiService = require("@financial-times/origami-service");
const requireAll = require("require-all");
const path = require("node:path");
const url = require("node:url");
const compression = require("compression");
const extractHeaders = require("express-extractheaders");
const { isProduction } = require("./utils/process");

const CORSAllowedFirstLevelDomains = new Set(['localhost', 'qiwi.local', 'qiwi.com', 'qiwi.ru']);

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

	app.use((request, response, next) => {
		const referer = request.headers.referer;
		if (!isProduction || !referer) return next();

		try {
			const refererFirstLevelHost = url.parse(referer).hostname.match(/(\w+\.)?\w+$/)[0]

			if (CORSAllowedFirstLevelDomains.has(refererFirstLevelHost)) {
				response.set("Access-Control-Allow-Origin", referer);

				return next();
			}
		} catch (error) {
			console.error(error)
			return response.sendStatus(500)
		}

		return response.sendStatus(403)
	});

	mountRoutes(app);
	app.use(compression({ level: 9 }));
	app.use(extractHeaders());
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
