(function (global) {
	var doc = global.document;
	var docEl = doc.documentElement;
	var body = doc.body || doc.createElement('body');

	function scrollX() {
		return (docEl.scrollLeft || body.scrollLeft || 0) - (docEl.clientLeft || body.clientLeft || 0);
	}

	function scrollY() {
		return (docEl.scrollTop || body.scrollTop || 0) - (docEl.clientTop || body.clientTop || 0);
	}

	function setStatically() {
		window.scrollX = window.pageXOffset = scrollX();
		window.scrollY = window.pageYOffset = scrollY();
		window.innerWidth = docEl.clientWidth;
		window.innerHeight = docEl.clientHeight;
	}

	try {
		Object.defineProperties(global, {
			'innerWidth': {
				get: function () {
					return docEl.clientWidth;
				}
			},
			'innerHeight': {
				get: function () {
					return docEl.clientHeight;
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
	} catch(e) {
		window.attachEvent('onresize', setStatically);
		window.attachEvent('onscroll', setStatically);
		setStatically();
	}
}(this));
