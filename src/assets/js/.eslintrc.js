module.exports = {
    plugins: ["prettier"],
	"parserOptions": {
        "sourceType": "module"
	},
	"env": {
		"browser": true,
	},
	rules: {
        "node/exports-style": 0,
		"node/no-deprecated-api": 0,
		"node/no-missing-require": 0,
		"node/no-unsupported-features": 0,
	}
};
