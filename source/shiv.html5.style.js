// prepend html5 styles to the document
(function (element, head) {
	element.innerHTML = ".<style>"+
		"-ms-placeholder{color:#777}"+
		"article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,subline,summary{display:block}"+
		"mark{background:#FF0;color:#000}"+
		"audio,canvas,video{display:inline-block}"+
		"audio:not([controls]){display:none;height:0}"+
		"[hidden]{display:none}"+
	"</style>";

	head.insertBefore(element.lastChild, head.firstChild);
})(document.createElement("p"), document.getElementsByTagName("head")[0] || document.documentElement);