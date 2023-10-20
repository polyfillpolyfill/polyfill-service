
// Reflect
// 26.1 The Reflect Object
try {
	Object.defineProperty(self, "Reflect", {
		value: self.Reflect || {},
		writable: true,
		configurable: true,
		enumerable: false
	});
} catch (e) {
	self.Reflect = self.Reflect || {};
}
