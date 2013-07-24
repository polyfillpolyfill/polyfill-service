// Element.polyfill.classList
Element.polyfill.push(function () {
	function DOMTokenList() {
		var list = this;

		// <DOMTokenList>.add
		list.add = function (className) {
			var classIndex = indexOf.call(list, className);

			if (classIndex < 0) {
				push.call(list, className);
			}

			element.className = list.toString();
		};

		// <DOMTokenList>.contains
		list.contains = function (className) {
			var classIndex = indexOf.call(list, className);

			return classIndex > -1;
		};

		// <DOMTokenList>.remove
		list.remove = function (className) {
			var classIndex = indexOf.call(list, className);

			if (classIndex > -1) {
				splice.call(list, classIndex, 1);
			}

			element.className = list;
		};

		// <DOMTokenList>.toggle
		list.toggle = function (className) {
			var classIndex = indexOf.call(list, className);

			if (classIndex < 0) {
				push.call(list, className);
			} else {
				splice.call(list, classIndex, 1);
			}

			element.className = list;
		};

		// <DOMTokenList>.toString
		list.toString = function () {
			return join.call(list, ' ');
		};
	}

	// <DOMTokenList>.length
	DOMTokenList.prototype.length = Array.prototype.length;

	var
	join = Array.prototype.join,
	push = Array.prototype.push,
	splice = Array.prototype.splice,
	indexOf = Array.prototype.indexOf,
	element = this,
	list = new DOMTokenList();

	// <element>.classList
	element.classList = list;

	if (element.className) {
		push.apply(list, element.className.trim().split(/\s+/));
	}

	element.attachEvent('onpropertychange', function () {
		if (element.className !== list.toString()) {
			splice.call(list, 0, list.length);

			if (element.className) {
				push.apply(list, element.className.trim().split(/\s+/));
			}
		}
	});
});