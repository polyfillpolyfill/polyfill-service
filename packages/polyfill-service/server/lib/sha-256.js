"use strict";

const crypto = require("crypto");

module.exports = function sha256(contents) {
	return crypto
		.createHash("sha256")
		.update(contents)
		.digest("hex");
};
