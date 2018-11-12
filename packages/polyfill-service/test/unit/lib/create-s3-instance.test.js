/* eslint-env mocha */

"use strict";

const proclaim = require("proclaim");
const mockery = require("mockery");
const sinon = require("sinon");

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ""
});

describe("create-s3-instance", function() {
	this.timeout(30000);
	let aws;
	let brotli;
	let createS3Instance;

	beforeEach(() => {
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false,
			warnOnReplace: false
		});

		aws = require("../mock/aws-sdk.mock");
		mockery.registerMock("aws-sdk", aws);

		brotli = require("../mock/iltorb.mock");
		mockery.registerMock("iltorb", brotli);

		createS3Instance = require("../../../server/lib/create-s3-instance");
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});

	it("exports a function", () => {
		proclaim.isFunction(createS3Instance);
	});

	it("returns an S3 instance which was given the `accessKeyId` and `secretAccessKey` values", async () => {
		const accessKeyId = "a";
		const secretAccessKey = "b";
		const result = createS3Instance({ accessKeyId, secretAccessKey });
		proclaim.isInstanceOf(result, aws.S3);
		proclaim.calledOnce(aws.S3);
		proclaim.calledWithNew(aws.S3);
		proclaim.calledWith(aws.S3, { accessKeyId, secretAccessKey });
	});
});
