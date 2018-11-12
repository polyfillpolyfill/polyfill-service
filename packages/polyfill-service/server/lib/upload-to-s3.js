"use strict";

module.exports = async function uploadToS3({ filename, file, etag, contentEncoding, s3, bucket, contentType }) {
	await s3
		.putObject({
			Bucket: bucket,
			Key: filename,
			Body: file,
			Metadata: {
				"custom-etag": etag
			},
			ContentType: contentType,
			ContentEncoding: contentEncoding
		})
		.promise();

	return `/${bucket}/${filename}`;
};
