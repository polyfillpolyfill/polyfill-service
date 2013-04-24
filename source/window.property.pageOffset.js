// <window>.pageXOffset, <window>.pageYOffset
Object.defineProperties(Window.prototype, {
	pageXOffset: {
		get: function () {
			var html = document.documentElement, body = document.body || document.createElement("body");

			return (html.scrollLeft || body.scrollLeft || 0) - (html.clientLeft || body.clientLeft || 0);
		}
	},
	pageYOffset: {
		get: function () {
			var html = document.documentElement, body = document.body || document.createElement("body");

			return (html.scrollTop || body.scrollTop || 0) - (html.clientTop || body.clientTop || 0);
		}
	},
	innerWidth: {
		get: function () {
			return document.documentElement.clientWidth;
		}
	},
	innerHeight: {
		get: function () {
			return document.documentElement.clientHeight;
		}
	}
});