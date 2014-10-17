Element.polyfill.push(function () {
	var element = this, xInput, xPlaceholderTextNode;

	if (element.nodeName == 'TEXTAREA' || (element.nodeName == 'INPUT' && /^(email|number|password|search|tel|text|url|)$/i.test(element.getAttribute('type')))) {
		element.attachEvent('onpropertychange', function () {
			if (!xInput) {
				xInput = document.createElement('-ms-input');
				xPlaceholderTextNode = document.createTextNode(element.placeholder || '');

				var
				xPlaceholder = xInput.appendChild(document.createElement('-ms-placeholder')),
				xInputRuntimeStyle = xInput.runtimeStyle,
				xPlaceholderRuntimeStyle = xPlaceholder.runtimeStyle,
				elementCurrentStyle = element.currentStyle;

				xPlaceholder.appendChild(xPlaceholderTextNode);

				xInputRuntimeStyle.display = 'inline-block';
				xInputRuntimeStyle.fontSize = elementCurrentStyle.fontSize;
				xInputRuntimeStyle.margin = elementCurrentStyle.margin;
				xInputRuntimeStyle.width = elementCurrentStyle.width;

				element.parentNode.insertBefore(xInput, element).appendChild(element);

				xPlaceholderRuntimeStyle.backgroundColor = 'transparent';
				xPlaceholderRuntimeStyle.fontFamily = elementCurrentStyle.fontFamily;
				xPlaceholderRuntimeStyle.fontSize = elementCurrentStyle.fontSize;
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

				// <element>.placeholder
				element.placeholder = element.placeholder;
			}

			if (element.placeholder !== xPlaceholderTextNode.nodeValue) {
				xPlaceholderTextNode.nodeValue = element.placeholder;
			}
		});

		element.placeholder = element.placeholder;
	}
});
