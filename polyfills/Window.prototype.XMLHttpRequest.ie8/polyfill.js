(function () {
	var NativeXMLHttpRequest = window.XMLHttpRequest;

	function XMLHttpRequest() {
		var request = this, nativeRequest = request._request = new NativeXMLHttpRequest();

		nativeRequest.onreadystatechange = function () {
			request.readyState = nativeRequest.readyState;

			var readyState = request.readyState === 4;

			request.response = request.responseText = readyState ? nativeRequest.responseText : null;
			request.status = readyState ? nativeRequest.status : null;
			request.statusText = readyState ? nativeRequest.statusText : null;

			request.dispatchEvent(new Event('readystatechange'));

			if (readyState) {
				request.dispatchEvent(new Event('load'));
			}
		};

		if ('onerror' in nativeRequest) {
			nativeRequest.onerror = function () {
				request.dispatchEvent(new Event('error'));
			};
		}
	}

	XMLHttpRequest.prototype.addEventListener = Window.prototype.addEventListener;
	XMLHttpRequest.prototype.removeEventListener = Window.prototype.removeEventListener;
	XMLHttpRequest.prototype.dispatchEvent = Window.prototype.dispatchEvent;

	XMLHttpRequest.prototype.abort = function abort() {
		return this._request(abort);
	};
	XMLHttpRequest.prototype.getAllResponseHeaders = function getAllResponseHeaders() {
		return this._request.getAllResponseHeaders();
	};
	XMLHttpRequest.prototype.getResponseHeader = function getResponseHeader(header) {
		return this._request.getResponseHeader(header);
	};
	XMLHttpRequest.prototype.open = function open(method, url, async, username, password) {
		this._request.open(method, url, async, username, password);
	};
	XMLHttpRequest.prototype.overrideMimeType = function overrideMimeType(mimetype) {
		this._request.overrideMimeType(mimetype);
	};
	XMLHttpRequest.prototype.send = function send(data) {
		this._request.send(data || null);
	};
	XMLHttpRequest.prototype.setRequestHeader = function setRequestHeader(header, value) {
		this._request.setRequestHeader(header, value);
	};

	window.XMLHttpRequest = Window.prototype.XMLHttpRequest = XMLHttpRequest;
})();
