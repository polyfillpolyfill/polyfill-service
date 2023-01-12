
// DOMRect.fromRect
// eslint-disable-next-line no-unused-vars
(function (global) {
	function number(v) {
		return v === undefined ? 0 : Number(v);
	}

	global.DOMRect.fromRect = function fromRect(rect) {
		if (!rect) {
			rect = {};
		}

		var newRect = new global.DOMRect();
		newRect.x = number(rect.x);
		newRect.y = number(rect.y);
		newRect.width = number(rect.width);
		newRect.height = number(rect.height);

		return newRect;
	}
}(self));
