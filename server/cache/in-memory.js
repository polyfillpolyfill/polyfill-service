const { Blob } = require('node:buffer')
const storage = new Map()

module.exports = {
	get(key) {
		return storage.get(key)
	},

	set(key, value) {
		storage.set(key, value)
	},

	has(key) {
		return storage.has(key)
	},

	get memoryUsage() {
		return (new Blob(storage)).size;
	},

	get size() {
		return storage.size;
	}
}
