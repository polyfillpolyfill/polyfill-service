
// HTMLCanvasElement.prototype.toBlob
/* global CreateMethodProperty, Uint8Array */
CreateMethodProperty(HTMLCanvasElement.prototype, 'toBlob', function (callback, type, quality) {
	var dataURL = this.toDataURL(type, quality).split(',')[1];
	setTimeout(function() {
		var binStr = atob(dataURL);
		var len = binStr.length;
		var arr = new Uint8Array(len);
		for (var i = 0; i < len; i++) {
			arr[i] = binStr.charCodeAt(i);
		}
		callback(new Blob([arr], { type: type || 'image/png' }));
	});
});
