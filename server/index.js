"use strict";

const dotenv = require("dotenv");
const service = require("./service");
const cache = require("./cache");

dotenv.config();

const options = {
	log: console,
	cache,
	name: "Origami Polyfill Service",
};

if (process.env.DISABLE_REQUEST_LOGGING) {
	// eslint-disable-next-line unicorn/no-null
	options.requestLogFormat = null;
}

function start(inject) {
	options.inject = inject

	startWorker()
}

function startWorker() {
	service(options)
		.listen()
		.catch(() => {
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		});
}

module.exports = start
