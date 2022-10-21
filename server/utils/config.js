const process = require('node:process')


module.exports = {
	get isProduction() {
		const nodeEnvironment = process.env.NODE_ENV;

		return nodeEnvironment && (nodeEnvironment.trim() === "production");
	},

	get CORSAllowedFirstLevelDomains() {
		return process.env.ALLOWED_DOMAINS ? process.env.ALLOWED_DOMAINS.split(',') : [];
	},

	get serveStaticSite() {
		if (process.env.SERVE_STATIC_SITE) return this.parseBool(process.env.SERVE_STATIC_SITE);

		return false;
	},

	get uploadDir() {
		return process.env.UPLOAD_DIR || undefined;
	},

	parseBool(value) {
		return value === 'true' || value === '1' || value === 1 || value === true || false;
	},
}
