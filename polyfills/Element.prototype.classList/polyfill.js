(function (CLASSLIST) {
	var descriptor = {
		get: function () {
			function DOMTokenList() {}

			DOMTokenList.prototype = window.DOMTokenList.prototype;

			var classList = new DOMTokenList();

			classList.element = this;

			classList.toString();

			return classList;
		}
	};

	for (var all = 'Anchor Area Audio Body BR Button Canvas Div DList FieldSet Form Head Heading HR Html IFrame Image Input Label Legend LI Menu OList Paragraph Pre Quote Script Select Span Style Table TableCaption TableCell TableRow TableSection TextArea UList Unknown Video '.split(' '), index = 0, length = all.length; index < length; ++index) {
		if ('HTML' + all[index] + 'Element' in window) {
			Object.defineProperty(window['HTML' + all[index] + 'Element'].prototype, CLASSLIST, descriptor);
		}
	}

	Object.defineProperty(HTMLElement.prototype, CLASSLIST, descriptor);
})('classList');
