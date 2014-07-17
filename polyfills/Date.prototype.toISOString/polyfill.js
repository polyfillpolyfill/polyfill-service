// Date.prototype.toISOString
Date.prototype.toISOString = function toISOString() {
	var date = this;

	return ((date.getUTCMonth() + 1) / 100 + date.toUTCString() + date / 1e3).replace(/..(..).+?(\d+)\D+(\d+).(\S+).*(...)/,'$3-$1-$2T$4.$5Z');
};
