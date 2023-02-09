
// HTMLSelectElement.prototype.selectedOptions
(function (global) {
	Object.defineProperty(global.HTMLSelectElement.prototype, "selectedOptions", {
		get: function () {
			var selectedOptions = this.querySelectorAll("option:checked");

			// In non-multiple selects, the first option should be returned, even without a "selected" attribute
			if (!this.multiple && selectedOptions.length === 0) {
				var allOptions = this.querySelectorAll("option");

				if (allOptions.length > 0) {
					var firstOption = allOptions[0];
					// set a unique attribute to use querySelectorAll and still get a single result.
					var firstOptionAttribute = 'o' + Math.floor(Math.random() * 9000000) + 1000000;
					firstOption.setAttribute(firstOptionAttribute, '');
					selectedOptions = this.querySelectorAll("option[" + firstOptionAttribute + "]");
					// remove the fallback attribute
					firstOption.removeAttribute(firstOptionAttribute);
				}
			}

			// "A select element whose multiple attribute is not specified must not have
			// more than one descendant option element with its selected attribute set."
			// - https://html.spec.whatwg.org/multipage/forms.html#the-option-element:the-select-element-6

			// "If two or more option elements in the select element's list of options
			//  have their selectedness set to true, set the selectedness of all but
			// the last option element with its selectedness set to true in the list of
			// options in tree order to false."
			// - https://html.spec.whatwg.org/multipage/forms.html#the-select-element:the-option-element-21
			if (!this.multiple && selectedOptions.length > 1) {
				var lastOption = selectedOptions[selectedOptions.length - 1];

				// set a unique attribute to use querySelectorAll and still get a single result.
				var lastOptionAttribute = 'o' + Math.floor(Math.random() * 9000000) + 1000000;
				lastOption.setAttribute(lastOptionAttribute, '');
				selectedOptions = this.querySelectorAll("option:checked[" + lastOptionAttribute + "]");
				// remove the fallback attribute
				lastOption.removeAttribute(lastOptionAttribute);
			}

			// 4.2.10.2. Interface HTMLCollection
			// The supported property names are the values from the list returned by these steps:
			//
			// Let result be an empty list.
			//
			// For each element represented by the collection, in tree order:
			//
			// If element has an ID which is not in result, append element’s ID to result.
			//
			// If element is in the HTML namespace and has a name attribute whose value is neither the empty string nor is in result, append element’s name attribute value to result.
			//
			// Return result.
			for (var i = 0; i < selectedOptions.length; i++) {
					var el = selectedOptions[i];

					// 2.a it has an ID which is key;
					if (el.id) {
						if (!selectedOptions[el.id]) {
							selectedOptions[el.id] = el;
						}
					}
				}

			// 4.2.10.2. Interface HTMLCollection namedItem
			selectedOptions.namedItem = function namedItem(key) {
				if (typeof key !== 'string') {
					return null;
				}

				// 1. If key is the empty string, return null.
				if (key === '') {
					return null;
				}

				// 2. Return the first element in the collection for which at least one of the following is true:
				for (var i = 0; i < selectedOptions.length; i++) {
					var el = selectedOptions[i];

					// 2.a it has an ID which is key;
					if (key === el.id) {
						return el;
					}
				}

				return null;
			}

			return selectedOptions;
		},
		enumerable: true,
		configurable: true
	});
}(self));
