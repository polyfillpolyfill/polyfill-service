
// URL.prototype.toJSON
// eslint-disable-next-line no-unused-vars
(function (global) {
	global.URL.prototype.toJSON = function toJSON() {
		return this.href;
	}
}(self));
