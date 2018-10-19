'document' in this && "cloneNode" in document.documentElement && (function() {
	var div = document.createElement('div');
	var test = document.createElement('input');
	test.type = "radio";
	test.checked = true;
	div.appendChild(test);
	var result = test.cloneNode(false);
	var result2;
	try {
		result2 = div.cloneNode();
	} catch (e) {
		return false;
	}
	return result.checked && typeof result2 !== "undefined" && result2.childNodes.length === 0;
})()
