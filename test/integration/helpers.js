"use strict";

const process = require("process");
const axios = require("axios");

module.exports = axios.create({
    baseURL: process.env.HOST || "https://polyfill.io",
    maxRedirects: 0,
	decompress: false,
    validateStatus: function (status) {
        return status >= 200 && status < 599;
    },
});
