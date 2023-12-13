
// navigator.sendBeacon
if (!('navigator' in self)) self.navigator = {};
self.navigator.sendBeacon = function sendBeacon(url, data) {
	try {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url, false);
		xhr.onerror = function() {};
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
	} catch (error) {
		return false;
	}
};
