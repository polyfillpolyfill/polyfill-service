"use strict";

import process from "node:process";
import axios from "axios";

export default axios.create({
    baseURL: process.env.HOST || "http://127.0.0.1:7676",
    maxRedirects: 0,
	decompress: true,
    validateStatus: function (status) {
        return status >= 200 && status < 599;
    },
});
