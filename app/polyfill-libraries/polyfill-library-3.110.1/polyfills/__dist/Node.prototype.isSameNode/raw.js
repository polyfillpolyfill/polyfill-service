
// Node.prototype.isSameNode
(function() {

	function isSameNode(otherNode) {
		if (!(0 in arguments)) {
			throw new TypeError('1 argument is required');
		}

		return this === otherNode;
	}

	// IE
	if ('HTMLElement' in self && 'isSameNode' in HTMLElement.prototype) {
		try {
			delete HTMLElement.prototype.isSameNode;
		// eslint-disable-next-line no-empty
		} catch (e) {}
	}

	if ('Node' in self) {
		Node.prototype.isSameNode = isSameNode;
	} else {
		document.isSameNode = Element.prototype.isSameNode = isSameNode;
	}

}());
