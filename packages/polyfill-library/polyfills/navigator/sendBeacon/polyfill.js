if (!('navigator' in this)) this.navigator = {};
this.navigator.sendBeacon = function sendBeacon(url, data) {
	var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('POST', url, false);
	xhr.setRequestHeader('Accept', '*/*');
	if (typeof data === 'string') {
		xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
	} else if (Object.prototype.toString.call(data) === '[object Blob]') {
		if (data.type) {
			xhr.setRequestHeader('Content-Type', data.type);
		}
	}
	xhr.send(data);
	return true;
};
