'document' in this && "cloneNode" in document.documentElement && (function() {
	var div = document.createElement('div'), test = document.createElement('input');
	test.type = "radio";
	test.checked = true;
	div.appendChild(test);
	var result = test.cloneNode(false), result2;
	try {
		result2 = div.cloneNode();
	} catch (e) {}
	return !!result.checked && (!result2 || result2.childNodes.length === 0);
})()
