(function () {
	var ArrayIterator = require('es6-iterator/array')
	Array.protoype[Symbol.iterator] = function keys () {
	  return new ArrayIterator(this, 'key');
	};
})();

