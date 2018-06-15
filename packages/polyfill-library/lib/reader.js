'use strict';
const fs = require("graceful-fs");
const denodeify = require("denodeify");
const readFile = denodeify(fs.readFile);
const readdir = denodeify(fs.readdir);

const cache = require("lru-cache")({
	max: 500, // 500 files is enough
});

// generate key for cache
const gk = JSON.stringify;

// check cache store
function check(key) {
	const cached = cache.get(key);
	if (cached) {
		return cached;
	}
	return null;
}

// reader instance
function cachedReader(...args) {
	const key = gk(["f", args]);
	const checked = check(key);
	if (checked !== null) {
		return checked;
	}
	const data = readFile.apply(null, args);
	cache.set(key, data);
	return data;
}

// dirReader instance
function cachedDirReader(...args) {
	const key = gk(["d", args]);
	const checked = check(key);
	if (checked !== null) {
		return checked;
	}
	const data = readdir.apply(null, args);
	cache.set(key, data);
	return data;
}

module.exports = {
	readFile: cachedReader,
	readdir: cachedDirReader,
};
