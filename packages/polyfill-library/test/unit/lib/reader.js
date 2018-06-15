/* eslint-env mocha */
"use strict";

const assert = require("proclaim");
const readFileC = require("../../../lib/reader").readFile;
const readdirC = require("../../../lib/reader").readdir;
const fs = require("graceful-fs");
const denodeify = require("denodeify");
const readFile = denodeify(fs.readFile);
const readdir = denodeify(fs.readdir);
const path = require("path");

const fp = path.join(__dirname, "../../../lib/reader.js");
const dp = path.join(__dirname, "../../../lib");

describe("lib/reader", () => {
	it("read file without cache", () => {
		return Promise.all([readFile(fp), readFileC(fp)]).then(rs => {
      assert.deepEqual(rs[0],rs[1]);
		});
  });

  it("read file from cache", () => {
    assert(readFileC(fp) === readFileC(fp), "should get data from cache");
  });
  
  it("read dir without cache", () => {
		return Promise.all([readdir(dp), readdirC(dp)]).then(rs => {
      assert.deepEqual(rs[0],rs[1]);
		});
  });

  it("read dir from cache", () => {
    assert(readdirC(dp) === readdirC(dp), "should get data from cache");
	});
});
