"use strict";

const AwsProviderFromServerless = require("./AwsProviderFromServerless");

/**
 * Serverless Plugin for creating s3 deployment bucket
 */
module.exports = class CreateDeploymentBucketPlugin {
	constructor(serverless, options) {
		this.serverless = serverless;
		this.options = options;

		this.commands = {
			"deploy-bucket": {
				lifecycleEvents: ["deploymentBucket"],
				usage: "Ensure the deployment bucket is created",
				options: {
					stage: {
						usage: "Create the deployment bucket for a given stage (dev, staging, prod)",
						required: true,
						shortcut: "s"
					}
				}
			}
		};
	}

	get hooks() {
		return {
			"before:deploy:deploy": () => this.ensureExistsDeploymentBucket(),
			"deploy-bucket:deploymentBucket": () => this.ensureExistsDeploymentBucket()
		};
	}

	async ensureExistsDeploymentBucket() {
		const awsprovider = new AwsProviderFromServerless(this.serverless);
		awsprovider.validate();
		const s3 = awsprovider.s3();

		this.serverless.cli.log(`Ensure DeploymentBucket: ${awsprovider.deploymentBucket} exists in region: ${awsprovider.region}`);

		try {
			// try to create the bucket
			const createResponse = await s3
				.createBucket({
					Bucket: awsprovider.deploymentBucket,
					CreateBucketConfiguration: {
						LocationConstraint: awsprovider.region
					 }
				})
				.promise();

			if (createResponse.Location) {
				this.serverless.cli.log(`DeploymentBucket: ${awsprovider.deploymentBucket} exists in region: ${awsprovider.region}`);
			}
		} catch (err) {
			if (err.code === "BucketAlreadyOwnedByYou" && err.region === awsprovider.region) {
				this.serverless.cli.log(`DeploymentBucket already exists in region: ${err.region}`);
			} else if (err.code === "BucketAlreadyOwnedByYou" && err.region !== awsprovider.region) {
				this.serverless.cli.log(`DeploymentBucket exists in unexpected region: ${err.region} expected: ${awsprovider.region}`);
			} else if (err.code === "BucketAlreadyExists" && err.region === awsprovider.region) {
				this.serverless.cli.log(`DeploymentBucket already exists in region: ${err.region}`);
			} else if (err.code === "BucketAlreadyExists" && err.region !== awsprovider.region) {
				this.serverless.cli.log(`DeploymentBucket exists in unexpected region: ${err.region} expected: ${awsprovider.region}`);
			} else {
				this.serverless.cli.log(`Could not create deployment bucket: ${awsprovider.deploymentBucket} in region: ${awsprovider.region} with location constraint: ${awsprovider.region}`);
				throw err;
			}
		} finally {
			try {
				var params = {
					Bucket: awsprovider.deploymentBucket,
					Tagging: {
					 TagSet: Object.entries(awsprovider.tags).map(([Key, Value]) => {
						 return {Key, Value};
					 })
					}
				 };
				 await s3.putBucketTagging(params).promise();
			 } catch (err) {
				 console.error(err, err.stack);
				 throw err;
			 }
		}
	}
};
