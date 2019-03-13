"use strict";
require("make-promises-safe"); // installs an 'unhandledRejection' handler

const memwatch = require("@airbnb/node-memwatch");
const start = new Date();
function msFromStart() {
	return new Date() - start;
}

// report to console postgc heap size
memwatch.on("stats", function(d) {
	console.log("postgc:", { milliseconds_since_application_stated: msFromStart(), heap_used_in_bytes: d.used_heap_size });
});

memwatch.on("leak", function(d) {
	console.log("LEAK:", d);
});

// also report periodic heap size (every 10s)
setInterval(function() {
	console.log("naive:", { milliseconds_since_application_stated: msFromStart(), heap_used_in_bytes: process.memoryUsage().heapUsed });
}, 5000);
const dotenv = require("dotenv");
const service = require("./service");
// const throng = require("throng");

dotenv.config();

const options = {
	log: {
		warn: () => {},
		info: () => {}
	},
	requestLogFormat: false,
	name: "Origami Polyfill Service",
	workers: process.env.WEB_CONCURRENCY || 1
};

// throng({
// 	workers: options.workers,
// 	start: startWorker
// });

// function startWorker(id) {
// 	console.log(`Started worker ${id}`);
service(options)
	.listen()
	.catch(() => {
		process.exit(1);
	});
// }
