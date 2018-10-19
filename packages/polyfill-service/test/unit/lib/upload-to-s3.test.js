/* eslint-env mocha */

"use strict";

const proclaim = require("proclaim");
const sinon = require("sinon");

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ""
});

describe("upload-to-s3", function() {
	this.timeout(30000);
	let uploadToS3;
	let s3;

	beforeEach(() => {
		uploadToS3 = require("../../../lib/upload-to-s3");

		s3 = {
			putObject: sinon.stub()
		};
		s3.putObject.promise = sinon.stub().resolves();
		s3.putObject.returns(s3.putObject);
	});

	it("exports a function", () => {
		proclaim.isFunction(uploadToS3);
	});

	it("Uploads the object to S3 and returns the location of the object in S3", async () => {
		const s3Object = {
			filename: "test.js",
			file: "contents of file",
			etag: "abc",
			contentEncoding: undefined,
			s3: s3,
			bucket: "test-bucket",
			contentType: "application/javascript;charset=UTF-8"
		};
		const result = await uploadToS3(s3Object);
		proclaim.calledOnce(s3.putObject);
		proclaim.calledWithExactly(s3.putObject, {
			Body: "contents of file",
			Bucket: "test-bucket",
			ContentEncoding: undefined,
			ContentType: "application/javascript;charset=UTF-8",
			Key: "test.js",
			Metadata: {
				"custom-etag": "abc"
			}
		});
		proclaim.calledOnce(s3.putObject.promise);
		proclaim.deepStrictEqual(result, `/${s3Object.bucket}/${s3Object.filename}`);
	});
});
