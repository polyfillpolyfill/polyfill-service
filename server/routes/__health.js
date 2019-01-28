"use strict";
const aboutInfo = require("../../about.json");

module.exports = app => {
	app.get("/__health", (request, response) => {
		response.status(200);
		response.set("Cache-Control", "max-age=0, must-revalidate, no-cache, no-store, private");
		response.json({
			schemaVersion: 1,
			name: aboutInfo.name,
			systemCode: aboutInfo.systemCode,
			description: aboutInfo.purpose,
			checks: [
				{
					name: "Server is up",
					ok: true,
					severity: 1,
					businessImpact: "Web page rendering may degrade for customers using certain browsers. Dynamic client side behaviour is likely to fail.",
					technicalSummary: "Tests that the Node JS process is up.",
					panicGuide: "Look at the application logs on Heroku and restart the Dynos.",
					checkOutput: "None",
					lastUpdated: new Date()
				}
			]
		});
	});
};
