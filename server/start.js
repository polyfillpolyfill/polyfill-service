const {memoryUsage} = require('node:process')
const start = require('./index.js')

start(app => {
	setInterval(() => console.log('from inject', app.cache.memoryUsage, memoryUsage().heapTotal), 3000)
})
