// Polyfill XMLHttpRequest 
this.XMLHttpRequest = function XMLHttpRequest() {
	return new ActiveXObject("MSXML2.XMLHTTP.3.0");
};