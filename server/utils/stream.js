module.exports = {
	streamToString(stream, encoding) {
		let string = ''

		return new Promise(function (resolve, reject) {
			stream.on('data', data => {
				string += (typeof encoding === 'string') ? data.toString(encoding) : data.toString()
			})
			stream.on('end', () => resolve(string))
			stream.on('error', error => reject(error))
		})
	}
}
