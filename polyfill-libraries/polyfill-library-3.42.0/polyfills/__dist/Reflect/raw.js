
// Reflect
// 26.1 The Reflect Object
Object.defineProperty(self, "Reflect", {
    value: self.Reflect || {},
    writable: true,
    configurable: true
});
Object.defineProperty(self, "Reflect", {
    value: self.Reflect || {},
    enumerable: false
});