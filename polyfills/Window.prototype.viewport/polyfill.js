// Window.prototype.viewport
(function () {
	function scrollX() {
		var document = this.document, documentElement = document.documentElement, body = document.body || document.createElement('body');

		return (documentElement.scrollLeft || body.scrollLeft || 0) - (documentElement.clientLeft || body.clientLeft || 0);
	}

	function scrollY() {
		var document = this.document, documentElement = document.documentElement, body = document.body || document.createElement('body');

		return (documentElement.scrollTop || body.scrollTop || 0) - (documentElement.clientTop || body.clientTop || 0);
	}

	Object.defineProperties(Window.prototype, {
		'innerWidth': {
			get: function () {
				return this.document.documentElement.clientWidth;
			}
		},
		'innerHeight': {
			get: function () {
				return this.document.documentElement.clientHeight;
			}
		},
		'pageXOffset': {
			get: scrollX
		},
		'pageYOffset': {
			get: scrollY
		},
		'scrollX': {
			get: scrollX
		},
		'scrollY': {
			get: scrollY
		}
	});
})();
