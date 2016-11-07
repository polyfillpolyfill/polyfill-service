Object.defineProperty(Element.prototype, 'dataset', {
	get: function() {
		var element = this;
		var attributes = this.attributes;
		var map = {};

		for (var i = 0; i < attributes.length; i++) {
			var attribute = attributes[i];

			if (attribute && attribute.name && (/^data-\w[\w\-]*$/).test(attribute.name)) {
				var name = attribute.name;
				var value = attribute.value;

				var propName = name.substr(5).replace(/-./g, function (prop) {
					return prop.charAt(1).toUpperCase();
				});

				Object.defineProperty(map, propName, {
					enumerable: this.enumerable,
					get: function() {
						return this.value;
					}.bind({value: value || ''}),
					set: function setter(name, value) {
						if (typeof value !== 'undefined') {
							this.setAttribute(name, value);
						} else {
							this.removeAttribute(name);
						}
					}.bind(element, name)
				});
			}
		}

		return map;
	}
});
