'document' in this && "cloneNode" in document.documentElement && (function() {
	var test = document.createElement('input');
	test.type = "radio";
	test.checked = true;
	var result = test.cloneNode();
	return !!result.checked;
})()
