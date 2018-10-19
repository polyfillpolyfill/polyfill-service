"use strict";

const path = require("path");
const dotenvSafe = require("dotenv-safe");

const env = dotenvSafe.config({
	path: path.join(__dirname, "../.env"),
	example: path.join(__dirname, "../env.example")
}).parsed;

module.exports = () => {
	return {
		AWS_ACCESS_ID: process.env.AWS_ACCESS_ID || env.AWS_ACCESS_ID,
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY_ID,
		AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID || env.AWS_ACCOUNT_ID,
		AWS_ROLE: process.env.AWS_ROLE || env.AWS_ROLE,
		AWS_SECRET_ACCESS: process.env.AWS_SECRET_ACCESS || env.AWS_SECRET_ACCESS,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || env.AWS_SECRET_ACCESS_KEY,
		NODE_ENV: process.env.NODE_ENV || env.NODE_ENV || "production",
		SENTRY_PUBLIC_KEY: process.env.SENTRY_PUBLIC_KEY || env.SENTRY_PUBLIC_KEY,
		SENTRY_SECRET_KEY: process.env.SENTRY_SECRET_KEY || env.SENTRY_SECRET_KEY,
		SENTRY_PROJECT_ID: process.env.SENTRY_PROJECT_ID || env.SENTRY_PROJECT_ID,
		SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN || env.SENTRY_AUTH_TOKEN,
		SENTRY_ORGANISATION: process.env.SENTRY_ORGANISATION || env.SENTRY_ORGANISATION,
		SENTRY_PROJECT: process.env.SENTRY_PROJECT || env.SENTRY_PROJECT
	};
};
