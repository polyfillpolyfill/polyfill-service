(function () {
	var ArrayIterator = require('es6-iterator/array');
	Array.prototype.entries = function entries () {
	  return new ArrayIterator(this, 'key+value');
	};
})();
