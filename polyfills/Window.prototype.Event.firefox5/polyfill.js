// Element.prototype.addEventListener, Element.prototype.removeEventListener
(function () {
	Window.prototype.addEventListener = function (type, listener, capture) {
		originalAddEventListener.call(this, type, listener, capture || false);
	};

	Window.prototype.removeEventListener = function (type, listener, capture) {
		originalRemoveEventListener.call(this, type, listener, capture || false);
	};

	var
	originalAddEventListener = Element.prototype.addEventListener,
	originalRemoveEventListener = Element.prototype.removeEventListener;

	for (var all = 'Anchor Area Audio Body BR Button Canvas Div DList FieldSet Form Head Heading HR Html IFrame Image Input Label Legend LI Menu OList Paragraph Pre Quote Script Select Span Style Table TableCaption TableCell TableRow TableSection TextArea UList Unknown Video '.split(' '), index = 0, length = all.length; index < length; ++index) {
		if ('HTML' + all[index] + 'Element' in window) {
			window['HTML' + all[index] + 'Element'].prototype.addEventListener = addEventListener;
			window['HTML' + all[index] + 'Element'].prototype.removeEventListener = removeEventListener;
		}
	}

	Window.prototype.addEventListener = HTMLDocument.prototype.addEventListener = addEventListener;
	Window.prototype.removeEventListener = HTMLDocument.prototype.removeEventListener = removeEventListener;
})();
