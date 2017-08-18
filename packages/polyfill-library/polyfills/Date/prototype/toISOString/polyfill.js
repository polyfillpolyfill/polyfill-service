Date.prototype.toISOString = function toISOString() {
	var date = this;

	function pad(str, len) {
		var pad = "0000";
		str = '' + str;
		return pad.substr(0, len - str.length) + str;
	}

	var y = date.getUTCFullYear(),
	m = pad(date.getUTCMonth() + 1, 2),
	d = pad(date.getUTCDate(), 2),
	h = pad(date.getUTCHours(), 2),
	i = pad(date.getUTCMinutes(), 2),
	s = pad(date.getUTCSeconds(), 2),
	ms = pad(date.getUTCMilliseconds(), 3);

	return y +'-'+ m +'-'+ d + 'T' + h +':'+ i +':'+ s +'.'+ ms +'Z';
};
