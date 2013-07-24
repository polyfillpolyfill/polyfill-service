// Window.polyfill.style
(function () {
	var p = document.createElement('p');

	p.innerHTML = ['.<style>',
		'-ms-placeholder{color:#777}',
		'article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,subline,summary{display:block}',
		'mark{background:#FF0;color:#000}',
		'audio,canvas,video{display:inline-block}',
		'audio{clip:rect(0 0 0 0);position:absolute}',
		'audio[controls]{display:none;height:0}',
		'[hidden]{display:none}',
	'</style>'].join('');

	document.head.insertBefore(p.lastChild, document.head.firstChild);
})();