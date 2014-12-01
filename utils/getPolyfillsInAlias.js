var fs = require('fs');
var path = require('path');

function getAllPolyfills(polyfillRootPath){
	try{
		var files = fs.readdirSync(polyfillRootPath);
		var polyfills = [];

		files.forEach(function(file){
			var basePath = path.resolve(polyfillRootPath, file);
			var fullPath = basePath + '/polyfill.js';
			var configPath = basePath + '/config.json';
			var polyfill = {};
			if(fs.existsSync(fullPath)){
				polyfill.name = file;
				polyfill.path = basePath;
			}

			if(fs.existsSync(configPath)){
				polyfill.config = require(configPath);
			}

			polyfills.push(polyfill);
		});

		return polyfills;
	}catch(e){
		fail(e);
	}
}


function getPolyfillAlisas(polyfill){
	return (polyfill.config && polyfill.config.aliases) ? polyfill.config.aliases : [];
}

function polyfillInAlias(alias, polyfill){
	return getPolyfillAlisas(polyfill).indexOf(alias) > -1;
}

function output(list, alias){
	console.log('These polyfills are in the alias ' + alias);
	list.forEach(function(l){
		console.log(l);
	});
}

function getNameFromPolyfill(polyfill){
	return polyfill.name;
}

function writeToFile(list, alias){
	fs.writeFileSync('polyfills-in-'+alias+'.txt', list.join('\n'), {encoding:'utf8'});
}

function main(alias, silent){
	if(typeof silent === 'undefined'){
		silent = true;
	}

	var polyfillRootPath = path.resolve(__dirname, '../', 'polyfills/');
	var polyfills = getAllPolyfills(polyfillRootPath);
	var filterFunc = polyfillInAlias.bind(null, alias);
	polyfills = polyfills.filter(filterFunc).map(getNameFromPolyfill);
	if(!silent){
		output(polyfills, alias);
	}

	return polyfills;
}

if(require.main === module){
	var alias = process.argv[2];
	main(alias, false);
}else{
	module.exports = main;
}
