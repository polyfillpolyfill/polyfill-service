const fs = require('node:fs')
const bundleAnalyzer = require('@qiwi/create-polyfill-service-url')
const multer = require('multer')

const uploadDestination = 'uploads/'
const upload = multer({dest: uploadDestination})


module.exports = async app => {
	app.post("/__analyze", upload.array('file'), async (
		{
			files,
			body: {
				omit = [], hostname = 'polyfill.qiwi.com', unknown,
				useComputeAtEdgeBackend, flags,
			},
		},
		response,
	) => {
		const bundleFileNames = files.map(({filename}) => filename)

		const result = await bundleAnalyzer({
			file: bundleFileNames, cwd: `./${uploadDestination}`,
			omit, hostname, unknown, useComputeAtEdgeBackend, flags,
		});

		files.forEach(({path}) => fs.unlink(path, error => console.error(error)))

		response.status(200);
		response.json(result);
	});
};
