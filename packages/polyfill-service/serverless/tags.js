"use strict";

module.exports = serverless => {
	const tags = {
		systemCode: process.env.SYSTEM_CODE || serverless.config.serverless.variables.service.serviceObject.name + "-severless",
		teamDL: process.env.TEAM_DL || "origami.support@ft.com",
		environment: process.env.ENVIRONMENT || (serverless.config.serverless.variables.options.stage || "local").charAt(0)
	};
	return tags;
};
