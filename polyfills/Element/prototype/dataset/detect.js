(function(){
	if (!document.documentElement.dataset) {
		return false;
	}
	var el = document.createElement('div');
	el.setAttribute("data-a-b", "c");
	return el.dataset && el.dataset.aB == "c";
}())