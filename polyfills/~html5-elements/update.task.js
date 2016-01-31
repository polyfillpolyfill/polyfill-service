var installPolyfill = require('../../lib/installPolyfill');

module.exports = function() {
	installPolyfill('polyfills/~html5-elements', 'html5shiv/dist/html5shiv.min.js');
};
