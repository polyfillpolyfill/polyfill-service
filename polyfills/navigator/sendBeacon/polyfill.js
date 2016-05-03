(function(root) {

	function sendBeacon(url, data) {
		var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		xhr.open('POST', url, false);
		xhr.setRequestHeader('Accept', '*/*');
		if (typeof data === 'string') {
			xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
			xhr.responseType = 'text/plain';
		} else if (Object.prototype.toString.call(data) === '[object Blob]') {
			if (data.type) {
				xhr.setRequestHeader('Content-Type', data.type);
			}
		}
		xhr.send(data);
		return true;
	}

	if (!('sendBeacon' in navigator)) {
		navigator.sendBeacon = sendBeacon;
	}

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = sendBeacon;
		}
		exports.sendBeacon = sendBeacon;
	} else if (typeof define === 'function' && define.amd) {
		define([], function() {
			return sendBeacon;
		});
	}
})(this);
