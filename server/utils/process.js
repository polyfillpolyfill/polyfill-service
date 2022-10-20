const process = require('node:process')

const nodeEnvironment = process.env.NODE_ENV;

module.exports = {
	get isProduction() {
		return nodeEnvironment && (nodeEnvironment.trim() === "production");
	}
}
