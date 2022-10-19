const process = require('node:process')

const nodeEnv = process.env.NODE_ENV;

module.exports = {
	get isProduction() {
		return nodeEnv && (nodeEnv.trim() === "production");
	}
}
