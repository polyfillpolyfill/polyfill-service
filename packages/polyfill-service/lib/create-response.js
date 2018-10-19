"use strict";

module.exports = function createResponse(body, Etag, encoding) {
	return {
		statusCode: 200,
		headers: {
			"Content-Encoding": encoding,
			"Content-Type": "application/javascript;charset=UTF-8",
			Etag
		},
		body: encoding ? body.toString("base64") : body,
		isBase64Encoded: Boolean(encoding)
	};
};
