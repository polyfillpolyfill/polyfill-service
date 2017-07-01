'use strict';

module.exports = getBasePath;

function getBasePath() {
	return (request, response, next) => {
		let basePath = request.headers['x-polyfill-service-base-path'] || '/';
		if (!basePath.startsWith('/')) {
			basePath = `/${basePath}`;
		}
		if (!basePath.endsWith('/')) {
			basePath = `${basePath}/`;
		}
		request.basePath = response.locals.basePath = basePath;
		next();
	};
}
