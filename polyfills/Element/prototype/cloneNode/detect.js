'document' in this && "cloneNode" in document.documentElement && (function() {
	var div = document.createElement('div'), test = document.createElement('input');
	test.checked = true;
	div.appendChild(test);
	var result = test.cloneNode();
	var result2 = div.cloneNode();
	return !!result.checked && (result2.childNodes.length === 0);
})()
