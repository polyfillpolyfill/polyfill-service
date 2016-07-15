var installPolyfill = require('../../lib/installPolyfill');

module.exports = function() {
	installPolyfill(__dirname, 'intersection-observer');
};