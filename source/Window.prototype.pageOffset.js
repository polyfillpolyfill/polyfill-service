// Window.prototype.pageOffset
Object.defineProperties(Window.prototype, {
	pageXOffset: {
		get: function () {
			var documentElement = document.documentElement, body = document.body || document.createElement('body');

			return (documentElement.scrollLeft || body.scrollLeft || 0) - (documentElement.clientLeft || body.clientLeft || 0);
		}
	},
	pageYOffset: {
		get: function () {
			var documentElement = document.documentElement, body = document.body || document.createElement('body');

			return (documentElement.scrollTop || body.scrollTop || 0) - (documentElement.clientTop || body.clientTop || 0);
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