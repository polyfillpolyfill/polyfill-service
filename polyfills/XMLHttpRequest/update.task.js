var installPolyfill = require('../../lib/installPolyfill');

module.exports = function() {
	installPolyfill('polyfills/XMLHttpRequest', 'js-polyfills/xhr.js');
};
