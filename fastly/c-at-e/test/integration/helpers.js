"use strict";

import process from "process";
import axios from "axios";

export default axios.create({
    baseURL: process.env.HOST || "http://localhost:7676",
    maxRedirects: 0,
	decompress: false,
    validateStatus: function (status) {
        return status >= 200 && status < 599;
    },
});
