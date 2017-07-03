(function (global, NativeXMLHttpRequest) {
	// <Global>.XMLHttpRequest
	global.XMLHttpRequest = function XMLHttpRequest() {
		var request = this, nativeRequest = request._request = NativeXMLHttpRequest ? new NativeXMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP.3.0');

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
	};

	global.XMLHttpRequest.UNSENT = 0;
	global.XMLHttpRequest.OPENED = 1;
	global.XMLHttpRequest.HEADERS_RECEIVED = 2;
	global.XMLHttpRequest.LOADING = 3;
	global.XMLHttpRequest.DONE = 4;

	var XMLHttpRequestPrototype = global.XMLHttpRequest.prototype;

	XMLHttpRequestPrototype.addEventListener = global.addEventListener;
	XMLHttpRequestPrototype.removeEventListener = global.removeEventListener;
	XMLHttpRequestPrototype.dispatchEvent = global.dispatchEvent;

	XMLHttpRequestPrototype.abort = function abort() {
		return this._request();
	};

	XMLHttpRequestPrototype.getAllResponseHeaders = function getAllResponseHeaders() {
		return this._request.getAllResponseHeaders();
	};

	XMLHttpRequestPrototype.getResponseHeader = function getResponseHeader(header) {
		return this._request.getResponseHeader(header);
	};

	XMLHttpRequestPrototype.open = function open(method, url) {
		// method, url, async, username, password
		this._request.open(method, url, arguments[2], arguments[3], arguments[4]);
	};

	XMLHttpRequestPrototype.overrideMimeType = function overrideMimeType(mimetype) {
		this._request.overrideMimeType(mimetype);
	};

	XMLHttpRequestPrototype.send = function send() {
		this._request.send(0 in arguments ? arguments[0] : null);
	};

	XMLHttpRequestPrototype.setRequestHeader = function setRequestHeader(header, value) {
		this._request.setRequestHeader(header, value);
	};
}(this, this.XMLHttpRequest));
