"use strict";

const AWSProvider = require("./AwsProvider");

const AwsProviderFromServerless = class AwsProviderFromServerless extends AWSProvider {
	constructor(serverless) {
		super();
		this.serverless = serverless;
	}
	get profile() {
		return this.serverless.service.provider.profile;
	}
	get stage() {
		return this.serverless.service.provider.stage;
	}
	get region() {
		return this.serverless.service.provider.region;
	}
	get deploymentBucket() {
		return this.serverless.service.provider.deploymentBucket;
	}
	get tags() {
		return this.serverless.service.provider.stackTags;
	}
};

module.exports = AwsProviderFromServerless;
