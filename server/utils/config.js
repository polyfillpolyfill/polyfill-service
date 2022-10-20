const process = require('node:process')


module.exports = {
	get isProduction() {
		const nodeEnvironment = process.env.NODE_ENV;

		return nodeEnvironment && (nodeEnvironment.trim() === "production");
	},

	get CORSAllowedFirstLevelDomains() {
		return process.env.ALLOWED_DOMAINS
			? new Set(process.env.ALLOWED_DOMAINS.split(','))
			: new Set();
	},

	get serveStaticSite() {
		if (process.env.SERVE_STATIC_SITE) return Boolean(process.env.SERVE_STATIC_SITE);

		return false;
	},

	get uploadDir() {
		return process.env.UPLOAD_DIR || undefined;
	}
}
