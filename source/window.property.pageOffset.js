Object.defineProperties(Window.prototype, {
	pageXOffset: function () {
		var html = document.documentElement, body = document.body || document.createElement("body");

		return (html.scrollLeft || body.scrollLeft || 0) - (html.clientLeft || body.clientLeft || 0);
	},
	pageYOffset: function () {
		var html = document.documentElement, body = document.body || document.createElement("body");

		return (html.scrollTop || body.scrollTop || 0) - (html.clientTop || body.clientTop || 0);
	}
});