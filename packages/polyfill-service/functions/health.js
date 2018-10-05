"use strict";

const Raven = require("raven");
const RavenLambdaWrapper = require("serverless-sentry-lib");
const createS3Instance = require("../lib/create-s3-instance");

const env = process.env;
const bucket = env.AWS_BUNDLE_BUCKET;

const s3 = createS3Instance({
	accessKeyId: env.AWS_ACCESS_ID,
	secretAccessKey: env.AWS_SECRET_ACCESS
});

const health = {
	schemaVersion: 1,
	name: "origami-polyfill-service-serverless",
	description: "Open API endpoint for retrieving Javascript polyfill libraries based on the user's user agent.",
	checks: [
		{
			ok: true,
			name: "Able to write to S3",
			severity: 2,
			businessImpact: "AWS costs would be higher than usual due to more requests hitting AWS API Gateway and AWS Lambda than normal.",
			technicalSummary: `Can not write to S3 bucket named "${bucket}", investigate whether the "AWS_ACCESS_KEY_ID" and "AWS_SECRET_ACCESS_KEY" keys have expired.`,
			panicGuide: "Don't panic, it is likely that the AWS API keys that are being used have expired and new ones need to be generated.",
			checkOutput: "None",
			lastUpdated: new Date()
		}
	]
};

module.exports.handler = RavenLambdaWrapper.handler(Raven, async function handler(event) {
	if (event.path === "/v3/__health") {
		await s3
			.putObject({
				Bucket: bucket,
				Key: "probe.txt",
				Body: "Can write to S3"
			})
			.promise()
			.then(() => {
				health.checks[0].ok = true;
				health.checks[0].checkOutput = "";
				health.checks[0].lastUpdated = new Date();
			})
			.catch(() => {
				health.checks[0].ok = false;
				health.checks[0].checkOutput = `Can not write to S3 bucket named "${bucket}", investigate whether the "AWS_ACCESS_KEY_ID" and "AWS_SECRET_ACCESS_KEY" keys have expired.`;
				health.checks[0].lastUpdated = new Date();
			});
		return {
			statusCode: 200,
			body: JSON.stringify(health),
			headers: {
				"Cache-Control": "no-store, private",
				"Content-Type": "application/json;charset=UTF-8"
			}
		};
	} else {
		return {
			statusCode: 200,
			body: "OK",
			headers: {
				"Cache-Control": "no-store, private",
				"Content-Type": "text/plain; charset=utf-8"
			}
		};
	}
});
