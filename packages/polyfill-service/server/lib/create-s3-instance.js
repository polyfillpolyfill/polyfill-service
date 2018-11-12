"use strict";

const AWS = require("aws-sdk");

module.exports = function createS3Instance({ accessKeyId, secretAccessKey }) {
	if (accessKeyId && secretAccessKey) {
		return new AWS.S3({ accessKeyId, secretAccessKey });
	} else {
		return new AWS.S3();
	}
};
