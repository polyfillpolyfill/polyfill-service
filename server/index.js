"use strict";

const dotenv = require("dotenv");
const service = require("./service");
const throng = require("throng");

dotenv.config();

const options = {
	log: console,
	name: "Origami Polyfill Service",
	workers: process.env.WEB_CONCURRENCY || 1
};

if (process.env.DISABLE_REQUEST_LOGGING) {
	// eslint-disable-next-line unicorn/no-null
	options.requestLogFormat = null;
}

throng({
	count: options.workers,
	worker: startWorker,
	grace: 5000
});

function startWorker(id, disconnect) {
	console.log(`Started worker ${id}`);
	const svc = service(options)
		.listen()
		.catch(() => {
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		});
	const shutdown = () => {
		svc.close();
		console.log(`Worker ${ id } cleanup.`)
		disconnect();
	}

	process.once('SIGTERM', shutdown);
	process.once('SIGINT', shutdown);
}
