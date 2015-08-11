(function (global) {
	function scrollX() {
		var document = global.document, documentElement = document.documentElement, body = document.body || document.createElement('body');

		return (documentElement.scrollLeft || body.scrollLeft || 0) - (documentElement.clientLeft || body.clientLeft || 0);
	}

	function scrollY() {
		var document = global.document, documentElement = document.documentElement, body = document.body || document.createElement('body');

		return (documentElement.scrollTop || body.scrollTop || 0) - (documentElement.clientTop || body.clientTop || 0);
	}

	Object.defineProperties(global, {
		// <Global>.innerWidth
		'innerWidth': {
			get: function () {
				return global.document.documentElement.clientWidth;
			}
		},

		// <Global>.innerHeight
		'innerHeight': {
			get: function () {
				return global.document.documentElement.clientHeight;
			}
		},

		// <Global>.pageXOffset
		'pageXOffset': {
			get: scrollX
		},

		// <Global>.pageYOffset
		'pageYOffset': {
			get: scrollY
		},

		// <Global>.scrollX
		'scrollX': {
			get: scrollX
		},

		// <Global>.scrollY
		'scrollY': {
			get: scrollY
		}
	});
})(this);
