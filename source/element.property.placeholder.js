// <input>.placeholder
Object.defineProperty(Element.prototype, 'placeholder', {
	set: function (value) {
		if (!value || !/^(input|textarea)$/i.test(this.nodeName) || !/^(email|number|password|search|tel|text|url|)$/i.test(this.getAttribute('type'))) return;

		var
		element = this,
		xInput = document.createElement('-ms-input'),
		xPlaceholder = xInput.appendChild(document.createElement('-ms-placeholder')),
		xPlaceholderText = xPlaceholder.appendChild(document.createTextNode(value)),
		xInputRuntimeStyle = xInput.runtimeStyle,
		xPlaceholderRuntimeStyle = xPlaceholder.runtimeStyle,
		elementCurrentStyle = element.currentStyle,
		style;

		element.parentNode.insertBefore(xInput, element).appendChild(element);

		xInputRuntimeStyle.display = 'inline-block';
		xPlaceholderRuntimeStyle.backgroundColor = 'transparent';
		xPlaceholderRuntimeStyle.fontFamily = elementCurrentStyle.fontFamily;
		xPlaceholderRuntimeStyle.fontSize = elementCurrentStyle.fontSize;
		xPlaceholderRuntimeStyle.margin = '2px 0 0 2px';
		xPlaceholderRuntimeStyle.padding = elementCurrentStyle.padding;
		xPlaceholderRuntimeStyle.position = 'absolute';
		xPlaceholderRuntimeStyle.display = element.value ? 'none' : 'inline-block';
		xInputRuntimeStyle.margin = elementCurrentStyle.margin;
		element.runtimeStyle.margin = '0';

		xPlaceholder.attachEvent('onclick', function (event) {
			element.focus();
		});

		element.attachEvent('onkeypress', function (event) {
			xPlaceholderRuntimeStyle.display = 'none';
		});

		element.attachEvent('onkeyup', function (event) {
			xPlaceholderRuntimeStyle.display = element.value ? 'none' : 'inline-block';
		});

		Object.defineProperty(element, 'placeholder', {
			get: function () {
				return xPlaceholder.innerHTML;
			},
			set: function (value) {
				xPlaceholder.innerHTML = value;
			}
		});
	}
});
