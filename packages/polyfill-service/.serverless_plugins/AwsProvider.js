"use strict";

const AWS = require("aws-sdk");

/**
 * One stop shop for getting AWS interface objects
 */
const AWSProvider = class AWSProvider {
	constructor() {
		this.s3 = function () {
			return new AWS.S3({
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
			});
		};
	}

	validate() {
		const errors = [];

		if (typeof this.region !== "string") {
			errors.push(`Property: region must be a string.  Found ${typeof this.region}`);
		}
		if (typeof this.stage !== "string") {
			errors.push(`Property: stage must be a string.  Found ${typeof this.stage}`);
		}
		if (errors.length > 0) {
			const errMessage = "AwsConfigFromServerless: Error validating serverless config\n" + errors.join("\n");
			throw errMessage;
		}
	}
};

module.exports = AWSProvider;
