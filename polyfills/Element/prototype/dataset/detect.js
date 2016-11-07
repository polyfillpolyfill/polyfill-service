(document.documentElement.dataset &&
	(
		Object.getOwnPropertyDescriptor(Element.prototype, 'dataset')  &&
		Object.getOwnPropertyDescriptor(Element.prototype, 'dataset').get
	)
)
