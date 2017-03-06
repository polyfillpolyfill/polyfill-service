Object.defineProperty(Element.prototype, 'placeholder', {
	get: function() {
		return this.getAttribute('placeholder');
	},

	set: function (value) {
		if (!value || !/^(input|textarea)$/i.test(this.nodeName) || (/^(input)$/i.test(this.nodeName) && !/^(email|number|password|search|tel|text|url|)$/i.test(this.getAttribute('type')))) {
			return;
		}

		var
		element = this,
		xInput = document.createElement('ms-input'),
		xPlaceholder = xInput.appendChild(document.createElement('ms-placeholder')),
		xInputRuntimeStyle = xInput.runtimeStyle,
		xPlaceholderRuntimeStyle = xPlaceholder.runtimeStyle,
		elementCurrentStyle = element.currentStyle;

		xPlaceholder.appendChild(document.createTextNode(value));

		xInputRuntimeStyle.display = 'inline-block';
		xInputRuntimeStyle.fontSize = elementCurrentStyle.fontSize;
		xInputRuntimeStyle.margin = elementCurrentStyle.margin;
		xInputRuntimeStyle.width = elementCurrentStyle.width;

		element.parentNode.insertBefore(xInput, element).appendChild(element);

		xPlaceholderRuntimeStyle.backgroundColor = 'transparent';
		xPlaceholderRuntimeStyle.fontFamily = elementCurrentStyle.fontFamily;
		xPlaceholderRuntimeStyle.fontSize = elementCurrentStyle.fontSize;
		xPlaceholderRuntimeStyle.fontWeight = elementCurrentStyle.fontWeight;
		xPlaceholderRuntimeStyle.margin = '2px 0 0 2px';
		xPlaceholderRuntimeStyle.padding = elementCurrentStyle.padding;
		xPlaceholderRuntimeStyle.position = 'absolute';
		xPlaceholderRuntimeStyle.display = element.value ? 'none' : 'inline-block';

		element.runtimeStyle.margin = '0';

		xPlaceholder.attachEvent('onclick', function () {
			element.focus();
		});

		element.attachEvent('onkeypress', function () {
			xPlaceholderRuntimeStyle.display = 'none';
		});

		element.attachEvent('onkeyup', function () {
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

document.attachEvent('onreadystatechange', function () {
	if (document.readyState === 'complete') {
		for (var elements = document.querySelectorAll('input,textarea'), index = 0, length = elements.length; index < length; ++index) {
			if (elements[index].placeholder) {
				elements[index].placeholder = elements[index].placeholder;
			}
		}
	}
});
