"use strict";

const Raven = require("raven");
const RavenLambdaWrapper = require("serverless-sentry-lib");
const createS3Instance = require("../lib/create-s3-instance");
const uploadToS3 = require("../lib/upload-to-s3");
const sha256 = require("../lib/sha-256");
const compressBundle = require("../lib/compress-bundle");
const createResponse = require("../lib/create-response");
const createRedirectTo = require("../lib/create-redirect-to");
const createPolyfillLibrary = require("../lib/create-polyfill-library");
const getPolyfillParameters = require("../lib/get-polyfill-parameters");
const createPolyfillBundle = require("../lib/create-polyfill-bundle");

const env = process.env;
const bucket = env.AWS_BUNDLE_BUCKET;
const getFilename = event => (event.headers && event.headers["Filename"]) || "";

const responseBodyOverSizeLimit = body => {
	const fiveMegabytes = 5 * 1024 * 1024;
	return body.length > fiveMegabytes;
};

const s3 = createS3Instance({
	accessKeyId: env.AWS_ACCESS_ID,
	secretAccessKey: env.AWS_SECRET_ACCESS
});

const isRunningLocally = Boolean(env.IS_OFFLINE);

module.exports.handler = RavenLambdaWrapper.handler(Raven, async function handler(event) {
	const params = getPolyfillParameters(event);
	const polyfillio = await createPolyfillLibrary(params.version);
	const filename = await getFilename(event);
	const bundle = await createPolyfillBundle(params, polyfillio);
	const etag = await sha256(bundle);
	const file = await compressBundle(params.compression, bundle);

	if (isRunningLocally) {
		return createResponse(file, etag, params.compression);
	} else {
		const s3Path = await uploadToS3({
			bucket,
			etag,
			file,
			filename,
			s3,
			contentEncoding: params.compression,
			contentType: "application/javascript;charset=UTF-8"
		});
		// AWS Lambda has a hard limit of 6MB for the body of a response
		// https://docs.aws.amazon.com/lambda/latest/dg/limits.html
		// If response is over 5MB we return a redirect to the bundle in S3 because S3 does not have the same hard limit for response body.
		// Our Fastly configuration will follow the redirect and return the actual bundle to the user-agent instead of returning the redirect to the user-agent.
		if (responseBodyOverSizeLimit(file)) {
			return createRedirectTo(s3Path);
		} else {
			return createResponse(file, etag, params.compression);
		}
	}
});
