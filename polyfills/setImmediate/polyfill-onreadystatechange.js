(function (global, slice, documentElement, script, messages) {

	global.setImmediate = function setImmediate(func) {
		/* use strict */

		var
		scope = this,
		args = slice.call(arguments, 1),
		node = script.cloneNode(),
		id = messages.push(node) - 1;

		node.onreadystatechange = function () {
			clearImmediate(id);

			func.apply(scope, args);
		};

		documentElement.appendChild(node);

		return id;
	};

	global.clearImmediate = function clearImmediate(id) {
		if (messages[id]) {
			documentElement.removeChild(messages[id]);

			delete messages[id];
		}
	};
})(this, Array.prototype.slice, document.documentElement, document.createElement('script'), []);
