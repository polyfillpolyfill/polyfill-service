module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: ['eslint:recommended', 'plugin:unicorn/recommended'],
	rules: {
		'unicorn/no-reduce': 0,
		'unicorn/no-useless-undefined': 0,
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	}
};
