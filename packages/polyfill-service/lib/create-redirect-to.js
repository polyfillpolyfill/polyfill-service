"use strict";

module.exports = function createRedirectTo(url) {
	return {
		statusCode: 301,
		headers: {
			Location: url
		}
	};
};
