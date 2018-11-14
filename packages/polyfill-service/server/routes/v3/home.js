"use strict";

const moment = require("moment");
const axios = require("axios");
const _ = require("lodash");

const fastly = async (apiKey, service) => {
	if (!service) {
		throw new Error("No Fastly Service ID has been supplied. This should be set either as an environment variable named FASTLY_SERVICE_ID_PROD or in the file .env at the root of the repository.");
	}

	if (!apiKey) {
		throw new Error("No Fastly API key has been supplied. This should be set either as an environment variable named FASTLY_API_KEY or in the file .env at the root of the repository.");
	}

	const getDailyStatsFor = days => {
		const today = moment().startOf("day");
		const thirtyDaysAgo = moment(today).subtract(days, "days");

		return axios({
			method: "get",
			url: `https://api.fastly.com/stats/service/${service}?from=${thirtyDaysAgo.unix()}&to=${today.unix()}&by=day`,
			headers: {
				"fastly-key": apiKey
			},
			responseType: "json"
		}).then(data => {
			const rollup = {
				requests: 0,
				hits: 0,
				misses: 0,
				bandwidth: 0
			};
			const byday = data.data.data.map(function(data) {
				rollup.requests += data.requests;
				rollup.hits += data.hits;
				rollup.misses += data.miss;
				rollup.bandwidth += data.bandwidth;
				return {
					date: moment(data.start_time, "X").format("DD-MMM-YY"),
					requests: data.requests,
					hits: data.hits,
					misses: data.miss,
					cache: _.round(100 - data.misses / data.requests, 2)
				};
			});
			rollup.cache = _.round(100 - rollup.misses / rollup.requests, 2);
			rollup.startDate = moment(data.data.data[0].start_time, "X").format("MMMM Do");
			rollup.endDate = moment(data.data.data[data.data.data.length - 1].start_time, "X").format("MMMM Do");
			return {
				byday: byday,
				rollup: rollup
			};
		});
	};

	return {
		sevenDays: await getDailyStatsFor(7),
		thirtyDays: await getDailyStatsFor(30)
	};
};
let stats;
fastly(process.env.FASTLY_API_KEY, process.env.FASTLY_SERVICE_ID_PROD).then(fastlyStats => {
	stats = fastlyStats;
});
module.exports = app => {
	app.get("/v3", async (request, response) => {
		response.set({
			"cache-control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800"
		});
		if (fastly) {
			response.render("index", { fastly: stats });
		} else {
			response.render("index");
		}
	});
};
