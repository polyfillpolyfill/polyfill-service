document.getElementsByClassName = function(search) {
	return document.querySelectorAll("." + String(search).split(/\s+/).join('.'));
};
