"use strict";

const fs = require("fs");
const path = require("path");
const tmpDir = require("os").tmpdir();
const untar = require("decompress");
const denodeify = require("denodeify");
const readFile = denodeify(fs.readFile);
const brotliDecompress = denodeify(require("iltorb").decompress);
const PolyfillLibrary = require("polyfill-library");
const latestVersion = require("../../polyfill-library/package.json").version;

module.exports = async function createPolyfillLibrary(version) {
	if (version === latestVersion) {
		return new PolyfillLibrary();
	}

	const polyfillDistTar = await brotliDecompress(await readFile(path.join(__dirname, `../polyfill-library-packages/${version}.tar.br`)));
	const polyfillsPath = path.join(tmpDir, version);
	await untar(polyfillDistTar, tmpDir);

	return new PolyfillLibrary(polyfillsPath);
};
