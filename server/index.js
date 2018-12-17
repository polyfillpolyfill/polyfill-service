"use strict";

const dotenv = require("dotenv");
const service = require("./service");
const throng = require("throng");

dotenv.load();

const options = {
	log: console,
	name: "Origami Polyfill Service",
	workers: process.env.WEB_CONCURRENCY || 1
};

throng({
	workers: options.workers,
	start: startWorker
});

function startWorker(id) {
	console.log(`Started worker ${id}`);
	service(options)
		.listen()
		.catch(() => {
			process.exit(1);
		});
}
