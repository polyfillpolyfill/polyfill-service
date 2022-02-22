"use strict";

import process from "process";
import axios from "axios";

export default axios.create({
    baseURL: process.env.HOST || "https://polyfill-service.edgecompute.app",
    maxRedirects: 0,
    validateStatus: function (status) {
        return status >= 200 && status < 599;
    },
});
